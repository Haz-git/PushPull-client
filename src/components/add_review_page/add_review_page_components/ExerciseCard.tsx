import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 2rem 2rem;
    border-radius: 0.3rem;
    border: none;
    background: #ffffff;
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
