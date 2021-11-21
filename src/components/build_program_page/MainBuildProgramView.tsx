import * as React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import AddProjectForm from './build_program_components/AddProjectForm';
import GeneralModal from '../general_components/GeneralModal';
import { useNotifications } from '@mantine/notifications';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { findProject } from '../../redux/builder/builderActions';

//Styles:
import styled from 'styled-components';
import {
    CheckIcon,
    CancelIcon,
} from './build_program_components/AddProjectForm';

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
    const [isBuilderInfoLoaded, setIsBuilderInfoLoaded] = useState(false);
    const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
    const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);

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
            message: 'Your projects and templates have been loaded.',
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
        <MainContainer>
            {isBuilderInfoLoaded && (
                <Suspense fallback={<div>Loading Temp...</div>}>
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
                    <>
                        <ProjectPanelView>
                            <ProjectPanel
                                toggleProjectModal={toggleProjectModal}
                                isCreatingNewProject={isCreatingNewProject}
                            />
                        </ProjectPanelView>
                        <DashboardPanelView>
                            <DashboardPanel />
                        </DashboardPanelView>
                    </>
                </Suspense>
            )}
        </MainContainer>
    );
};

export default MainBuildProgramView;
