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
    margin: 4rem 0rem 0rem 0rem;
`;

const NodeItem = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 2rem 0;
    border: none;
    background: none;
    border-radius: 0.3rem;
    cursor: pointer;
`;

const NodeCircle = styled.div<NodeCircleProps>`
    position: relative;
    font-size: 1.2rem;
    color: ${(props) =>
        props.isActive === true ? '#ffffff' : props.theme.subText};
    font-weight: 800;
    text-shadow: ${(props) =>
        props.isActive === true ? props.theme.textShadows.sm : 'none'};
    vertical-align: middle;
    line-height: 3rem;
    text-align: center;
    background: ${(props) =>
        props.isActive === true ? props.theme.accentColors.orange : '#e5e5e5'};
    border-radius: 1.5rem;
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;

    &::before {
        visibility: ${(props) =>
            props.isLastNode === true ? 'hidden' : 'visible'};
        content: '';
        width: 3px;
        height: 100%;
        background: ${(props) =>
            props.isActive === true
                ? props.theme.accentColors.orange
                : '#e5e5e5'};
        display: block;
        position: absolute;
        left: 1.45rem;
        top: 100%;
    }
`;

const NodeLabel = styled.p<NodeStyledProps>`
    font-size: 1.2rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

//Interfaces:

interface NodeCircleProps {
    isActive: boolean;
    isLastNode: boolean;
}
interface NodeStyledProps {
    isActive: boolean;
}

interface IComponentProps {
    numSteps: number;
    currentStep: number;
    steps: any[];
    requestView: (viewNum: number) => void;
}

const WizardStepNavigationColumn = ({
    numSteps,
    currentStep,
    steps,
    requestView,
}: IComponentProps): JSX.Element => {
    //Determines any node that's active:
    const determineActiveNodeStep = (stepOfNode: number) => {
        if (currentStep !== undefined && stepOfNode === currentStep)
            return true;
        return false;
    };

    //Identifies the last node to remove pseudo-element:
    const identifyLastNode = (currNodeStep: number) => {
        if (currNodeStep === steps.length - 1) return true;
        return false;
    };

    //Renders all node items:
    const renderNodeItem = () => {
        if (steps) {
            return steps.map((stepItem) => (
                <NodeItem
                    key={uuid()}
                    onClick={() => requestView(stepItem.stepNum)}
                >
                    <NodeCircle
                        isLastNode={identifyLastNode(stepItem.stepNum)}
                        isActive={determineActiveNodeStep(stepItem.stepNum)}
                    >
                        {stepItem.stepNum + 1}
                    </NodeCircle>
                    <NodeLabel
                        isActive={determineActiveNodeStep(stepItem.stepNum)}
                    >
                        {stepItem.stepTitle}
                    </NodeLabel>
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
