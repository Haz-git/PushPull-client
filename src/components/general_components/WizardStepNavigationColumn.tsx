import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    width: 25rem;
    border-right: 1px solid #e5e5e5;
    text-align: left;
    height: 100%;
`;

//Interfaces:

const WizardStepNavigationColumn = () => {
    return <MainContainer>Step navigation Crumbs</MainContainer>;
};

export default WizardStepNavigationColumn;
