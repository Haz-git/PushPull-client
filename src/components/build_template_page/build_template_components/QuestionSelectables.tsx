import * as React from 'react';

//Redux:

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div<IMainContainerProps>`
    width: 100%;
    background: #ffffff;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px, rgba(0, 0, 0, 0.23) 0px 2px 4px;
    margin-bottom: 0.5rem;
    border: ${({ isSelected }) =>
        isSelected ? '1px solid #e07133' : '1px solid transparent'};
`;

//Interfaces:

interface IMainContainerProps {
    isSelected: boolean;
}

interface IComponentProps {
    id: string;
    inputQuestion: string;
    responseType: string;
    isSelected: boolean;
    onSelectQuestion: (questionId: string) => void;
}

export const QuestionSelectables = ({
    id,
    inputQuestion,
    responseType,
    isSelected = false,
    onSelectQuestion,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer
            isSelected={isSelected}
            onClick={() => onSelectQuestion(id)}
        >
            <div>{inputQuestion}</div>
            <div>{responseType}</div>
        </MainContainer>
    );
};
