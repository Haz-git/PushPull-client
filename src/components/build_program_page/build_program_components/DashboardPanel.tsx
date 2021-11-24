import * as React from 'react';

//Components:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Router:
import { useParams } from 'react-router-dom';
//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    background: #ffffff;
    height: 100%;
    width: 100%;
`;

const ViewLabelContainer = styled.div``;

//Interfaces:

const DashboardPanel = () => {
    let { dashboardView } = useParams<{ dashboardView: string }>();
    console.log(dashboardView);
    return <MainContainer>{dashboardView || 'dashboard'}</MainContainer>;
};

export default DashboardPanel;
