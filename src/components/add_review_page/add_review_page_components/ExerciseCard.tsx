import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 2rem 2rem;
    border-radius: 0.3rem;
    border: none;
    background: #ffffff;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 1px 5px 0px,
        rgba(14, 30, 37, 0.32) 0px 1px 3px 0px;
    margin-bottom: 1rem;
`;

//Interfaces:

interface IComponentProps {
    exerciseTitle: string;
    initialWeight: number;
    finalWeight: number;
    weightUnit: string;
}

const ExerciseCard = ({
    exerciseTitle,
    initialWeight,
    finalWeight,
    weightUnit,
}: IComponentProps): JSX.Element => {
    return <MainContainer>{exerciseTitle}</MainContainer>;
};

export default ExerciseCard;
