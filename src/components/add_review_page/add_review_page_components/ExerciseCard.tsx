import * as React from 'react';

//Components:

//Styles:

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
    return <div>{exerciseTitle}</div>;
};

export default ExerciseCard;
