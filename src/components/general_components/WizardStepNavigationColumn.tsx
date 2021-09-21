import * as React from 'react';

//Components:
import { v4 as uuid } from 'uuid';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    width: 25rem;
    border-right: 1px solid #e5e5e5;
    text-align: left;
    height: 100%;
    padding: 2rem 2rem;
`;

const NodeContainer = styled.div`
    margin: 2rem 0;
`;

const NodeItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem 0;
`;

const NodeCircle = styled.div`
    font-size: 1.2rem;
    color: white;
    font-weight: 800;
    text-shadow: ${(props) => props.theme.textShadows.sm};
    vertical-align: middle;
    line-height: 2rem;
    text-align: center;
    background: ${(props) => props.theme.accentColors.orange};
    border-radius: 2rem;
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
`;

const NodeLabel = styled.p`
    font-size: 1.2rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

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
    const renderNodeItem = () => {
        if (steps && currentStep) {
            return steps.map((stepItem) => (
                <NodeItem key={uuid()}>
                    <NodeCircle>{stepItem.stepNum}</NodeCircle>
                    <NodeLabel>{stepItem.stepTitle}</NodeLabel>
                </NodeItem>
            ));
        }
    };

    return (
        <MainContainer>
            Step navigation Crumbs {numSteps} STEPS
            <NodeContainer>{renderNodeItem()}</NodeContainer>
        </MainContainer>
    );
};

export default WizardStepNavigationColumn;
