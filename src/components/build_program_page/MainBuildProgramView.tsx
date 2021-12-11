import * as React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import AddProjectForm from './build_program_components/AddProjectForm';
import RenameProjectForm from './build_program_components/RenameProjectForm';
import RecolorProjectForm from './build_program_components/RecolorProjectForm';
import DeleteProjectForm from './build_program_components/DeleteProjectForm';
import DescProjectForm from './build_program_components/DescProjectForm';
import GeneralModal from '../general_components/GeneralModal';
import { useNotifications } from '@mantine/notifications';
import LoadProgress from '../nprogress/LoadProgress';
import TemplateDeleteForm from './build_program_components/TemplateDeleteForm';

//utils:
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { findProject } from '../../redux/builder/builderActions';

//Styles:
import styled from 'styled-components';
import {
    CheckIcon,
    CancelIcon,
} from './build_program_components/AddProjectForm';
import historyObject from '../../utils/historyObject';

const SuspenseWrapper = styled.section``;

const MainContainer = styled.section`
    background: #ffffff;
    width: 100%;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
    }

    @media ${deviceMin.laptop} {
        height: 100%;
        display: grid;
        grid-template-columns: 12rem auto;
        overflow: visible;
        padding: 0rem 0rem 2rem 0rem;
    }

    @media ${deviceMin.laptopL} {
        grid-template-columns: 16rem auto;
    }
`;

const ProjectPanelView = styled.section`
    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.laptop} {
        display: block;
    }
`;

const DashboardPanelView = styled.section``;

//Lazy Components:
const ProjectPanel = React.lazy(
    () => import('./build_program_components/ProjectPanel')
);
const DashboardPanel = React.lazy(
    () => import('./build_program_components/DashboardPanel')
);

//Interfaces:

interface IComponentProps {
    match: {
        params: {
            dashboardView: string;
        };
    };
}

const MainBuildProgramView = ({
    match: {
        params: { dashboardView },
    },
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const notifications = useNotifications();
    const { width } = useWindowDimensions();

    //Loading State:

    const [isBuilderInfoLoaded, setIsBuilderInfoLoaded] = useState(false);
    const [isProgressLoading, setIsProgressLoading] = useState(true);

    //Modal States:

    const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
    const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false);
    const [openRenameProjectModal, setOpenRenameProjectModal] = useState(false);
    const [openRecolorProjectModal, setOpenRecolorProjectModal] =
        useState(false);
    const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
    const [openDescProjectModal, setOpenDescProjectModal] = useState(false);
    const [openDeleteTemplateModal, setOpenDeleteTemplateModal] =
        useState(false);

    //Curr project Desc:
    const [currTargetProjectDesc, setCurrTargetProjectDesc] = useState('');

    //Project Id states:
    const [selectedProject, setSelectedProject] = useState('');

    //Selected template states:
    const [selectedTemplate, setSelectedTemplate] = useState('');

    //Modal state handlers:
    const toggleRenameProjectModal = (
        status: boolean,
        projectUuid?: string
    ) => {
        if (projectUuid) setSelectedProject(projectUuid);
        setOpenRenameProjectModal(status);
    };
    const toggleDeleteProjectModal = (
        status: boolean,
        projectUuid?: string
    ) => {
        if (projectUuid) setSelectedProject(projectUuid);
        setOpenDeleteProjectModal(status);
    };
    const toggleRecolorProjectModal = (
        status: boolean,
        projectUuid?: string
    ) => {
        if (projectUuid) setSelectedProject(projectUuid);
        setOpenRecolorProjectModal(status);
    };

    const toggleDescProjectModal = (
        status: boolean,
        projectUuid?: string,
        currProjectDesc?: string
    ) => {
        if (projectUuid) setSelectedProject(projectUuid);
        if (currProjectDesc) setCurrTargetProjectDesc(currProjectDesc);
        setOpenDescProjectModal(status);
    };

    const toggleDeleteTemplateModal = (
        status: boolean,
        templateId: string,
        projectUuid?: string | null
    ) => {
        if (projectUuid) setSelectedProject(projectUuid);
        if (templateId) setSelectedTemplate(templateId);
        setOpenDeleteTemplateModal(status);
    };

    const setIsLoaded = (status: boolean) => setIsBuilderInfoLoaded(status);
    const toggleProjectModal = (status: boolean) =>
        setOpenAddProjectModal(status);

    const toggleIsCreatingProjectLoader = (status: boolean) =>
        setIsCreatingNewProject(status);

    const toggleLoadingNotif = () => {
        let id = notifications.showNotification({
            title: 'Pulling Builder Details',
            message: 'Please be patient as we pull your information.',
            color: 'orange',
            autoClose: false,
            disallowClose: true,
            loading: true,
        });

        return id;
    };

    const updateLoadingNotif = (id: string, status: boolean) => {
        if (status !== true) {
            setIsProgressLoading(false);
            historyObject.push('/');
            return notifications.updateNotification(id, {
                id,
                color: 'red',
                title: 'Your Builder Details Failed To Be Loaded',
                message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                autoClose: 10000,
                icon: <CancelIcon />,
            });
        }
        return notifications.updateNotification(id, {
            id,
            color: 'teal',
            title: 'Welcome To Builder Mode.',
            message:
                'Your projects and templates have been loaded successfully.',
            autoClose: 3000,
            icon: <CheckIcon />,
        });
    };

    useEffect(() => {
        const validViews = ['recents', 'published', 'drafts', 'project'];
        if (!validViews.includes(dashboardView)) {
            historyObject.push('/builder/dashboard/recents');
        }
        dispatch(
            findProject(setIsLoaded, toggleLoadingNotif, updateLoadingNotif)
        );
    }, []);

    const renderProjectsPanelIfWidthAllows = () => {
        if (width >= 1024)
            return (
                <ProjectPanelView>
                    <ProjectPanel
                        toggleProjectModal={toggleProjectModal}
                        isCreatingNewProject={isCreatingNewProject}
                        toggleDeleteProjectModal={toggleDeleteProjectModal}
                        toggleRecolorProjectModal={toggleRecolorProjectModal}
                        toggleRenameProjectModal={toggleRenameProjectModal}
                    />
                </ProjectPanelView>
            );

        return null;
    };

    return (
        <SuspenseWrapper>
            <Suspense
                fallback={
                    <LoadProgress
                        isLoadBuilderMode={true}
                        isAnimating={isProgressLoading}
                        minimum={0.9}
                        incrementDuration={100}
                    />
                }
            >
                {isBuilderInfoLoaded ? (
                    <>
                        <GeneralModal
                            openBoolean={openAddProjectModal}
                            closeFunc={() => setOpenAddProjectModal(false)}
                            title="Create Project"
                            closeOnClickOutside={false}
                            hideCloseButton={true}
                        >
                            <AddProjectForm
                                toggleProjectModal={toggleProjectModal}
                                isCreatingNewProject={isCreatingNewProject}
                                toggleIsCreatingNewProjectLoader={
                                    toggleIsCreatingProjectLoader
                                }
                            />
                        </GeneralModal>
                        <GeneralModal
                            openBoolean={openDescProjectModal}
                            closeFunc={() => setOpenDescProjectModal(false)}
                            title="Edit Description"
                        >
                            <DescProjectForm
                                projectUuid={selectedProject}
                                toggleDescProjectModal={toggleDescProjectModal}
                                currProjectDesc={currTargetProjectDesc}
                            />
                        </GeneralModal>
                        <GeneralModal
                            openBoolean={openDeleteProjectModal}
                            closeFunc={() => setOpenDeleteProjectModal(false)}
                            title="Confirm Project Deletion"
                        >
                            <DeleteProjectForm
                                projectUuid={selectedProject}
                                toggleDeleteProjectModal={
                                    toggleDeleteProjectModal
                                }
                            />
                        </GeneralModal>
                        <GeneralModal
                            openBoolean={openRenameProjectModal}
                            closeFunc={() => setOpenRenameProjectModal(false)}
                            title="Rename Project"
                        >
                            <RenameProjectForm
                                projectUuid={selectedProject}
                                toggleRenameProjectModal={
                                    toggleRenameProjectModal
                                }
                            />
                        </GeneralModal>
                        <GeneralModal
                            openBoolean={openRecolorProjectModal}
                            closeFunc={() => setOpenRecolorProjectModal(false)}
                            title="Recolor Project"
                        >
                            <RecolorProjectForm
                                projectUuid={selectedProject}
                                toggleRecolorProjectModal={
                                    toggleRecolorProjectModal
                                }
                            />
                        </GeneralModal>
                        <GeneralModal
                            openBoolean={openDeleteTemplateModal}
                            closeFunc={() => setOpenDeleteTemplateModal(false)}
                            title="Confirm Template Deletion"
                        >
                            <TemplateDeleteForm
                                projectUuid={selectedProject}
                                templateId={selectedTemplate}
                                toggleDeleteTemplateModal={
                                    toggleDeleteTemplateModal
                                }
                            />
                        </GeneralModal>
                        <MainContainer>
                            {renderProjectsPanelIfWidthAllows()}
                            <DashboardPanelView>
                                <DashboardPanel
                                    toggleProjectModal={toggleProjectModal}
                                    isCreatingNewProject={isCreatingNewProject}
                                    toggleDeleteProjectModal={
                                        toggleDeleteProjectModal
                                    }
                                    toggleRecolorProjectModal={
                                        toggleRecolorProjectModal
                                    }
                                    toggleRenameProjectModal={
                                        toggleRenameProjectModal
                                    }
                                    toggleNewDescModal={toggleDescProjectModal}
                                    toggleDeleteTemplateModal={
                                        toggleDeleteTemplateModal
                                    }
                                />
                            </DashboardPanelView>
                        </MainContainer>
                    </>
                ) : (
                    <LoadProgress
                        isLoadBuilderMode={true}
                        isAnimating={isProgressLoading}
                        minimum={0.6}
                        incrementDuration={100}
                    />
                )}
            </Suspense>
        </SuspenseWrapper>
    );
};

export default MainBuildProgramView;
