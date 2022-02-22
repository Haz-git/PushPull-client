import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
//Styles:
import styled from 'styled-components';

export const BlockExerciseLengthContainer = styled.div`
    padding: 0.5rem 0.25rem 0.5rem 0.25rem;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 0.8fr 0.8fr 1.2fr;
`;

const ExerciseDetails = styled.div`
    text-align: center;
    padding: 0.2rem 0.2rem;
    background: #ececec;
    margin: 0 0.1rem;
    border-radius: 0.3rem;
`;

const ExerciseDetailSpacer = styled.div`
    height: 0.2rem;
`;

//Interfaces:

interface IComponentProps {
    shouldShowGridLayout: boolean;
    sets: string;
    reps: string;
    weightUnit: string | undefined;
    weight: string | undefined;
}

export const BlockTypeExerciseDataGrid = ({
    shouldShowGridLayout,
    sets,
    reps,
    weightUnit,
    weight,
}: IComponentProps): JSX.Element => {
    //This component is the triple-column grid layout underneath block exercise name.
    return (
        <>
            {shouldShowGridLayout ? (
                <BlockExerciseLengthContainer>
                    <ExerciseDetails>
                        <Text
                            text={`Sets`}
                            fontSize=".75rem"
                            fontWeight="800"
                            subText={true}
                        />
                        <ExerciseDetailSpacer />
                        <Text
                            text={sets}
                            fontSize="1rem"
                            fontWeight="800"
                            mainText={true}
                        />
                    </ExerciseDetails>
                    <ExerciseDetails>
                        <Text
                            text={`Reps`}
                            fontSize=".75rem"
                            fontWeight="800"
                            subText={true}
                        />
                        <ExerciseDetailSpacer />
                        <Text
                            text={reps}
                            fontSize="1rem"
                            fontWeight="800"
                            mainText={true}
                        />
                    </ExerciseDetails>
                    <ExerciseDetails>
                        <Text
                            text={weightUnit}
                            fontSize=".75rem"
                            fontWeight="800"
                            subText={true}
                        />
                        <ExerciseDetailSpacer />
                        <Text
                            text={weight}
                            fontSize="1rem"
                            fontWeight="800"
                            mainText={true}
                        />
                    </ExerciseDetails>
                </BlockExerciseLengthContainer>
            ) : null}
        </>
    );
};
