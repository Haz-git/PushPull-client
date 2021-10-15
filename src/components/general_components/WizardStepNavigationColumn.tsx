import * as React from 'react';
import { useState } from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import { v4 as uuid } from 'uuid';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    @media ${deviceMin.mobileS} {
        width: 100%;
        text-align: left;
        padding: 0rem 1rem;
    }

    @media ${deviceMin.browserSm} {
        width: 25rem;
        border-right: 1px solid #e5e5e5;
        text-align: left;
        height: 100%;
        padding: 4rem 2rem;
    }
`;

const TitleHeader = styled.h2`
    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.browserSm} {
        display: block;
        font-size: 1.8rem;
        color: ${(props) => props.theme.mainText};
        font-weight: 800;
        margin-bottom: 3rem;
    }
`;

const NodeContainer = styled.div`
    margin: 2rem 0rem 0rem 0rem;

    @media ${deviceMin.mobileS} {
        display: flex;
    }

    @media ${deviceMin.browserSm} {
        display: block;
    }
`;

const NodeItem = styled.button`
    @media ${deviceMin.mobileS} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0rem 1.5rem 0rem 0rem;
        border: none;
        background: none;
        border-radius: 0.3rem;
        cursor: pointer;
    }

    @media ${deviceMin.browserSm} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 2rem 0rem 0rem 0rem;
        border: none;
        background: none;
        border-radius: 0.3rem;
        cursor: pointer;
    }
`;

const NodeCircle = styled.div<NodeCircleProps>`
    @media ${deviceMin.mobileS} {
        position: relative;
        font-size: 1rem;
        color: ${(props) =>
            props.isActive === true ? '#ffffff' : props.theme.subText};
        font-weight: 800;
        text-shadow: ${(props) =>
            props.isActive === true ? props.theme.textShadows.sm : 'none'};
        vertical-align: middle;
        line-height: 2.5rem;
        text-align: center;
        background: ${(props) =>
            props.isActive === true
                ? props.theme.accentColors.orange
                : '#e5e5e5'};
        border-radius: 2rem;
        height: 2.5rem;
        width: 2.5rem;
        margin-right: 1rem;

        &::before {
            visibility: ${(props) =>
                props.isLastNode === true ? 'hidden' : 'visible'};
            content: '';
            width: 2.5rem;
            height: 3px;
            background: ${(props) =>
                props.isActive === true
                    ? props.theme.accentColors.orange
                    : '#e5e5e5'};
            display: block;
            position: absolute;
            right: -2.5rem;
            top: 45%;
        }
    }

    @media ${deviceMin.browserSm} {
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
            props.isActive === true
                ? props.theme.accentColors.orange
                : '#e5e5e5'};
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
    }
`;

const NodeLabel = styled.p<NodeStyledProps>`
    font-size: 1.2rem;
    color: ${(props) =>
        props.isActive === true ? props.theme.mainText : props.theme.subText};
    font-weight: 700;

    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.browserSm} {
        display: block;
    }
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
    steps: any;
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
        if (currentStep !== undefined && stepOfNode <= currentStep) return true;
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
            return steps.map((stepItem: any) => (
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
            <TitleHeader>Timeline</TitleHeader>
            <NodeContainer>{renderNodeItem()}</NodeContainer>
        </MainContainer>
    );
};

export default WizardStepNavigationColumn;
