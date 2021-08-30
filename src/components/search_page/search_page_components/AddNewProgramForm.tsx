import * as React from 'react';

//Components:
import { Select } from '@mantine/core';

//Styles:
import styled from 'styled-components';

const MainFormContainer = styled.div``;

export const FormDesc = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.mainText};
    text-align: left;
    margin-bottom: 0.5rem;
`;

const FormInputContainer = styled.div``;

const SelectWrapper = styled.div`
    margin-bottom: 1rem;
`;

const AddNewProgramForm = () => {
    return (
        <MainFormContainer>
            <FormDesc>
                Thank you for taking the time to contribute. We're always
                looking for popular workout programs.
            </FormDesc>
            <FormInputContainer>
                <SelectWrapper>
                    <Select
                        clearable
                        styles={{
                            label: {
                                color: 'rgba(0, 0, 34, .7)',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 700,
                                marginBottom: '.25rem',
                            },
                        }}
                        label="Program Category"
                        placeholder="Choose a Category"
                        data={[
                            { value: 'any', label: 'Any Category' },
                            { value: 'weightlifting', label: 'Weightlifting' },
                            { value: 'powerlifting', label: 'Powerlifting' },
                            { value: 'bodybuilding', label: 'Bodybuilding' },
                            { value: 'crossfit', label: 'Crossfit' },
                        ]}
                    />
                </SelectWrapper>
                <SelectWrapper>
                    <Select
                        clearable
                        styles={{
                            label: {
                                color: 'rgba(0, 0, 34, .7)',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 700,
                                marginBottom: '.25rem',
                            },
                        }}
                        label="Program Equipment"
                        placeholder="Choose Equipment Required"
                        data={[
                            { value: 'any', label: 'Any Equipment' },
                            { value: 'no Equipment', label: 'No Equipment' },
                            { value: 'gym Required', label: 'Gym Required' },
                            { value: 'outdoors', label: 'Outdoors' },
                        ]}
                    />
                </SelectWrapper>
                <SelectWrapper>
                    <Select
                        clearable
                        styles={{
                            label: {
                                color: 'rgba(0, 0, 34, .7)',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 700,
                                marginBottom: '.25rem',
                            },
                        }}
                        label="Estimated Difficulty"
                        placeholder="Choose Difficulty"
                        data={[
                            { value: 'any', label: 'Any or Varied Difficulty' },
                            { value: 'beginner', label: 'Beginner' },
                            { value: 'intermediate', label: 'Intermediate' },
                            { value: 'advanced', label: 'Advanced' },
                        ]}
                    />
                </SelectWrapper>
            </FormInputContainer>
        </MainFormContainer>
    );
};

export default AddNewProgramForm;
