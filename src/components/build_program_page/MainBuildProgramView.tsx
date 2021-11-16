import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:

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

const ProjectPanelView = styled.section``;

const DashboardPanelView = styled.section``;

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
            <ProjectPanelView>Test</ProjectPanelView>
            <DashboardPanelView>Test dashboard</DashboardPanelView>
        </MainContainer>
    );
};

export default MainBuildProgramView;
