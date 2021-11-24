import * as React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import AddProjectForm from './build_program_components/AddProjectForm';
import RenameProjectForm from './build_program_components/RenameProjectForm';
import RecolorProjectForm from './build_program_components/RecolorProjectForm';
import DeleteProjectForm from './build_program_components/DeleteProjectForm';
import GeneralModal from '../general_components/GeneralModal';
import { useNotifications } from '@mantine/notifications';
import LoadProgress from '../nprogress/LoadProgress';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { findProject } from '../../redux/builder/builderActions';

//Styles:
import styled from 'styled-components';
import {
    CheckIcon,
    CancelIcon,
} from './build_program_components/AddProjectForm';

const SuspenseWrapper = styled.section``;

const MainContainer = styled.section`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 8fr;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
        overflow: hidden;
    }

    @media ${deviceMin.tabletp} {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 8fr;
        overflow: visible;
        padding: 0rem 0rem 2rem 0rem;
    }
`;

const ProjectPanelView = styled.section`
    width: 20rem;
    max-width: 20rem;
`;

const DashboardPanelView = styled.section``;

//Lazy Components:
const ProjectPanel = React.lazy(
    () => import('./build_program_components/ProjectPanel')
);
const DashboardPanel = React.lazy(
    () => import('./build_program_components/DashboardPanel')
);

// const ProjectPanel = React.lazy(async () => {
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//     return import('./build_program_components/ProjectPanel');
// });

// const DashboardPanel = React.lazy(async () => {
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//     return import('./build_program_components/DashboardPanel');
// });

//Interfaces:

interface IComponentProps {
    match: {
        params: {
            id: any;
        };
    };
}

const MainBuildProgramView = ({
    match: {
        params: { id },
    },
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const notifications = useNotifications();

    //Loading State:

    const [isBuilderInfoLoaded, setIsBuilderInfoLoaded] = useState(false);

    //Modal States:

    const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
    const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false);
    const [openRenameProjectModal, setOpenRenameProjectModal] = useState(false);
    const [openRecolorProjectModal, setOpenRecolorProjectModal] =
        useState(false);
    const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);

    //Project Id states:
    const [selectedProject, setSelectedProject] = useState('');

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
        if (status !== true)
            return notifications.updateNotification(id, {
                id,
                color: 'red',
                title: 'Your Builder Details Failed To Be Loaded',
                message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                autoClose: 3000,
                icon: <CancelIcon />,
            });
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
        dispatch(
            findProject(setIsLoaded, toggleLoadingNotif, updateLoadingNotif)
        );
    }, []);

    return (
        <SuspenseWrapper>
            <Suspense
                fallback={
                    <LoadProgress
                        isLoadBuilderMode={true}
                        isAnimating={true}
                        minimum={0.9}
                        incrementDuration={100}
                    />
                }
            >
                {isBuilderInfoLoaded ? (
                    <MainContainer>
                        <GeneralModal
                            openBoolean={openAddProjectModal}
                            closeFunc={() => setOpenAddProjectModal(false)}
                            title="Create Project"
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
                        <>
                            <ProjectPanelView>
                                <ProjectPanel
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
                                />
                            </ProjectPanelView>
                            <DashboardPanelView>
                                <DashboardPanel />
                            </DashboardPanelView>
                        </>
                    </MainContainer>
                ) : (
                    <LoadProgress
                        isLoadBuilderMode={true}
                        isAnimating={true}
                        minimum={0.6}
                        incrementDuration={100}
                    />
                )}
            </Suspense>
        </SuspenseWrapper>
    );
};

export default MainBuildProgramView;
