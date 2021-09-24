import * as React from 'react';

//Components:
import { TextInput } from '@mantine/core';
import { NumberInput } from '@mantine/core';

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

const AddExerciseContainerGrid = styled.div`
    display: grid;
    grid-template-columns: 40% auto;
    align-items: center;
    margin: 2rem 0;
`;

const UserExerciseInputsContainer = styled.div`
    border-right: 1px solid #e5e5e5;
`;

const UserInputContainer = styled.div`
    margin-bottom: 1.5rem;
`;

const UserExerciseCardContainer = styled.div``;

//Interfaces:

const ImprovementsForm = () => {
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
                                />
                            </UserInputContainer>
                            <UserInputContainer>
                                <NumberInput
                                    label="Initial Weight"
                                    min={1}
                                    max={180}
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
                                />
                            </UserInputContainer>
                            <UserInputContainer>
                                <NumberInput
                                    label="Final Weight"
                                    min={1}
                                    max={180}
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
                                />
                            </UserInputContainer>
                        </UserExerciseInputsContainer>
                        <UserExerciseCardContainer>
                            test
                        </UserExerciseCardContainer>
                    </AddExerciseContainerGrid>
                </FormInputContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default ImprovementsForm;
