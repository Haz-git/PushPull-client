import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    width: 25rem;
    border-right: 1px solid #e5e5e5;
    text-align: left;
    height: 100%;
    padding: 2rem 2rem;
`;

const NodeContainer = styled.div``;

const Nodes = styled.div``;

//Interfaces:

interface IComponentProps {
    numSteps: number;
    currentStep: number;
    steps: any[];
}

const WizardStepNavigationColumn = ({
    numSteps,
    currentStep,
    steps,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            Step navigation Crumbs {numSteps} STEPS
            <NodeContainer></NodeContainer>
        </MainContainer>
    );
};

export default WizardStepNavigationColumn;
