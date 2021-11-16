import * as React from 'react';
import { Suspense } from 'react';
import { deviceMin } from '../../devices/breakpoints';

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
    return (
        <MainContainer>
            <Suspense fallback={<div>Loading Temp...</div>}>
                <ProjectPanelView>
                    <ProjectPanel />
                </ProjectPanelView>
                <DashboardPanelView>
                    <DashboardPanel />
                </DashboardPanelView>
            </Suspense>
        </MainContainer>
    );
};

export default MainBuildProgramView;
