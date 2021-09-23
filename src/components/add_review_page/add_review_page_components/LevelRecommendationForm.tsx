import * as React from 'react';
import { useState } from 'react';

//Components

//Styles
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
import { Select } from '@mantine/core';

const SelectContainer = styled.div`
    margin: 2.5rem 0 1rem 0;
`;

const InfoContainer = styled.div``;

const InfoText = styled.p`
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.mainText};
`;

//Interfaces

const LevelRecommendationForm = () => {
    const [userLevel, setUserLevel] = useState('');

    const handleUserLevelSelection = (val: string) => {
        setUserLevel(val);
    };

    const selectionDesc = {
        beginner:
            'Example: I have been training for a few months. Linear Progression works well for me.',
        intermediate:
            'Example: I have been training for a few years. Short-term Periodization works well for me.',
        advanced:
            'Example: I have been training for many years. Long-term Periodization works well for me.',
    };

    const parseInfoText = () => {
        if (userLevel !== '') {
            switch (userLevel) {
                case 'beginner':
                    return <InfoText>{selectionDesc.beginner}</InfoText>;
                case 'intermediate':
                    return <InfoText>{selectionDesc.intermediate}</InfoText>;
                case 'advanced':
                    return <InfoText>{selectionDesc.advanced}</InfoText>;
            }
        }
    };

    return (
        <MainContainer>
            <FormTitleContainer>
                <FormTitle>Level Recommendations</FormTitle>
            </FormTitleContainer>
            <FormContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        What level would you consider yourself to be?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>
                            There's no formal classification on this subject,
                            however a good judgement combines both the length of
                            time you've been training and response to training
                            stimulus.
                        </FormDesc>
                    </FormDescContainer>
                    <SelectContainer>
                        <Select
                            clearable
                            styles={{
                                root: {
                                    maxWidth: '40rem',
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
                            label="Estimated User Level"
                            placeholder="Choose a Level"
                            data={[
                                {
                                    value: 'beginner',
                                    label: 'Beginner',
                                },
                                {
                                    value: 'intermediate',
                                    label: 'Intermediate',
                                },
                                {
                                    value: 'advanced',
                                    label: 'Advanced',
                                },
                            ]}
                            required
                            onChange={handleUserLevelSelection}
                        />
                    </SelectContainer>
                    <InfoContainer>{parseInfoText()}</InfoContainer>
                </FormInputContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        Who would you recommend this program to?
                    </FormSubtitle>
                    <SelectContainer>
                        <Select
                            clearable
                            styles={{
                                root: {
                                    maxWidth: '40rem',
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
                            label="Estimated User Level"
                            placeholder="Choose a Level"
                            data={[
                                {
                                    value: 'beginner',
                                    label: 'Beginner PushPullers',
                                },
                                {
                                    value: 'intermediate',
                                    label: 'Intermediate PushPullers',
                                },
                                {
                                    value: 'advanced',
                                    label: 'Advanced PushPullers',
                                },
                            ]}
                            required
                        />
                    </SelectContainer>
                </FormInputContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default LevelRecommendationForm;
