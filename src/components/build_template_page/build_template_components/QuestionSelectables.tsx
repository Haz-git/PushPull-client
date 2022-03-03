import * as React from 'react';

//Redux:

//Components:
import Text from '../../general_components/Text';

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

const ResponseTypeContainer = styled.div`
    padding: 0.5rem 0.5rem;
    width: 5.5rem;
    margin-right: 0.5rem;
    background: #d6d6d6;
    border-radius: 0.3rem;
`;

const LabelContainer = styled.div`
    height: 100%;
    max-height: 5rem;
    padding: 1rem 1rem;
    overflow-y: scroll;
    width: 100%;
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
            <LabelContainer>
                <Text text={inputQuestion} subText={true} />
            </LabelContainer>
            <ResponseTypeContainer>
                <Text text={responseType} subText={true} />
            </ResponseTypeContainer>
        </MainContainer>
    );
};
