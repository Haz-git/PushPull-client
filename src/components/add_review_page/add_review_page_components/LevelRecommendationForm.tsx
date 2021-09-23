import * as React from 'react';

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
    margin: 1rem 0;
`;

//Interfaces

const LevelRecommendationForm = () => {
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
                            stimulus. For example, someone who has been training
                            for only a few months and responds well to linear
                            progression would be (probably) classified as a
                            beginner. A more experienced and advanced PushPuller
                            will have probably trained more than a few years and
                            needs to implement some sort of long-term
                            periodization.
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
                        />
                    </SelectContainer>
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
