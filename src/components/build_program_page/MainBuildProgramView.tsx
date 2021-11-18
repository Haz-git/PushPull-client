import * as React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import AddProjectForm from './build_program_components/AddProjectForm';
import GeneralModal from '../general_components/GeneralModal';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { findProject } from '../../redux/builder/builderActions';

//Styles:
import styled from 'styled-components';

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
    const [isBuilderInfoLoaded, setIsBuilderInfoLoaded] = useState(false);
    const [openAddProjectModal, setOpenAddProjectModal] = useState(false);

    const setIsLoaded = (status: boolean) => setIsBuilderInfoLoaded(status);
    const toggleProjectModal = (status: boolean) =>
        setOpenAddProjectModal(status);

    useEffect(() => {
        dispatch(findProject(setIsLoaded));
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
                        />
                    </GeneralModal>
                    <>
                        <ProjectPanelView>
                            <ProjectPanel
                                toggleProjectModal={toggleProjectModal}
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
