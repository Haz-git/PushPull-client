import * as React from 'react';
import { useState } from 'react';

//Components:
import { TextInput } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import { Select } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import ExerciseCard from './ExerciseCard';
import { v4 as uuid } from 'uuid';

//Styles:
import styled from 'styled-components';
import {
    MainContainer,
    FormTitleContainer,
    FormTitle,
    FormContainer,
    FormInputContainer,
    FormSubtitle,
    FormDescContainer,
    FormDesc,
} from './StarRatingsForm';
import { PostAdd } from '@styled-icons/material/PostAdd';

const PostIcon = styled(PostAdd)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

const AddExerciseContainerGrid = styled.div`
    display: grid;
    grid-template-columns: 40% auto;
    align-items: flex-start;
    margin: 2rem 0;
    column-gap: 2rem;
    max-width: 60rem;
`;

const UserExerciseInputsContainer = styled.div``;

const UserInputContainer = styled.div`
    margin-bottom: 1.5rem;
`;

const UserExerciseCardContainer = styled.div``;

const ButtonContainer = styled.div`
    max-width: 30rem;
`;

//Interfaces:

const ImprovementsForm = () => {
    //State handler for all exercises:
    const [userExercises, setUserExercises] = useState<any>([]);

    //State handlers for all user inputs:
    const [exerciseTitle, setExerciseTitle] = useState<any>('');
    const [initialWeight, setInitialWeight] = useState(1);
    const [finalWeight, setFinalWeight] = useState(1);
    const [exerciseUnit, setExerciseUnit] = useState('lbs');

    const handleUserExerciseInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setExerciseTitle(e.target.value);
    };

    const handleUserIWeight = (value: number) => {
        setInitialWeight(value);
    };

    const handleUserFWeight = (value: number) => {
        setFinalWeight(value);
    };

    const handleUserExerciseUnitInput = (value: string) => {
        setExerciseUnit(value);
    };

    //Reset Inputs:
    const resetAllInputs = () => {
        setExerciseTitle('');
        setInitialWeight(1);
        setFinalWeight(1);
        setExerciseUnit('lbs');
    };

    //Submission Handler:

    const handleUserSubmission = () => {
        if (
            exerciseTitle !== '' &&
            initialWeight >= 1 &&
            finalWeight >= 1 &&
            exerciseUnit
        ) {
            let tempObj = {
                exerciseTitle,
                initialWeight,
                finalWeight,
                exerciseUnit,
            };

            userExercises.push(tempObj);
            setUserExercises(userExercises);
            resetAllInputs();
        }
    };

    //Renders all ExerciseCards:

    const renderAllExerciseCards = () => {
        if (userExercises.length >= 1) {
            console.log(userExercises);
            console.log('should be rendered');
            return userExercises.map((exercise: any) => (
                <ExerciseCard
                    key={uuid()}
                    exerciseTitle={exercise.exerciseTitle}
                    initialWeight={exercise.initialWeight}
                    finalWeight={exercise.finalWeight}
                    weightUnit={exercise.exerciseUnit}
                />
            ));
        }
    };

    return (
        <MainContainer>
            <FormTitleContainer>
                <FormTitle>Improvements</FormTitle>
            </FormTitleContainer>
            <FormContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        What exercises did this program help you develop?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>
                            Let people know how much you've improved! Our
                            favorites are Bench Press, Barbell Squat, and
                            Deadlift.
                        </FormDesc>
                    </FormDescContainer>
                    <AddExerciseContainerGrid>
                        <UserExerciseInputsContainer>
                            <UserInputContainer>
                                <TextInput
                                    name="exerciseTitle"
                                    styles={{
                                        root: {
                                            maxWidth: '30rem',
                                        },
                                        label: {
                                            color: 'rgba(0, 0, 34, .7)',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                            marginBottom: '.25rem',
                                        },
                                        input: {
                                            color: 'rgba(0, 0, 34, 1)',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                        },
                                    }}
                                    required
                                    label="Exercise Name"
                                    placeholder="Write your exercise name"
                                    onChange={handleUserExerciseInput}
                                    value={exerciseTitle}
                                />
                            </UserInputContainer>
                            <UserInputContainer>
                                <NumberInput
                                    name="initialWeight"
                                    label="Initial Weight"
                                    min={1}
                                    max={9999}
                                    required
                                    styles={{
                                        root: {
                                            maxWidth: '30rem',
                                        },
                                        label: {
                                            color: 'rgba(0, 0, 34, .7)',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                            marginBottom: '.25rem',
                                        },
                                        input: {
                                            color: 'rgba(0, 0, 34, 1)',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                        },
                                    }}
                                    onChange={handleUserIWeight}
                                    value={initialWeight}
                                />
                            </UserInputContainer>
                            <UserInputContainer>
                                <NumberInput
                                    name="finalWeight"
                                    label="Final Weight"
                                    min={1}
                                    max={9999}
                                    required
                                    styles={{
                                        root: {
                                            maxWidth: '30rem',
                                        },
                                        label: {
                                            color: 'rgba(0, 0, 34, .7)',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                            marginBottom: '.25rem',
                                        },
                                        input: {
                                            color: 'rgba(0, 0, 34, 1)',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                        },
                                    }}
                                    onChange={handleUserFWeight}
                                    value={finalWeight}
                                />
                            </UserInputContainer>
                            <UserInputContainer>
                                <Select
                                    name="weightUnit"
                                    clearable
                                    styles={{
                                        root: {
                                            maxWidth: '30rem',
                                        },
                                        label: {
                                            color: 'rgba(0, 0, 34, .7)',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                            marginBottom: '.25rem',
                                        },
                                        input: {
                                            color: 'rgba(0, 0, 34, 1)',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                        },
                                    }}
                                    label="Weight Measurement"
                                    placeholder="Choose a unit"
                                    data={[
                                        {
                                            value: 'kg',
                                            label: 'Kg',
                                        },
                                        {
                                            value: 'lbs',
                                            label: 'Lbs',
                                        },
                                    ]}
                                    required
                                    onChange={handleUserExerciseUnitInput}
                                    value={exerciseUnit}
                                />
                            </UserInputContainer>
                            <ButtonContainer>
                                <GeneralButton
                                    buttonBackground="rgba(224, 113, 51, 1)"
                                    border="none"
                                    disableShadow={true}
                                    hoverShadow="none"
                                    buttonLabel="Add My Exercise"
                                    buttonIcon={<PostIcon />}
                                    buttonTextColor="#ffffff"
                                    padding=".6rem .5rem"
                                    fontSize="1.05rem"
                                    onClick={handleUserSubmission}
                                />
                            </ButtonContainer>
                        </UserExerciseInputsContainer>
                        <UserExerciseCardContainer>
                            {renderAllExerciseCards()}
                        </UserExerciseCardContainer>
                    </AddExerciseContainerGrid>
                </FormInputContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default ImprovementsForm;
