import * as React from 'react';

//Components:
import { deviceMin } from '../../../devices/breakpoints';
import { TextInput } from '@mantine/core';
import { Select } from '@mantine/core';
import { Textarea } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';

const MainFormContainer = styled.div``;

export const FormDesc = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.mainText};
    text-align: left;
`;

const StyledTextInput = styled(TextInput)`
    &:focus {
        border: 1px solid red;
    }
`;

const FormInputContainer = styled.div`
    @media ${deviceMin.mobileS} {
        margin-top: 1rem;
        display: block;
    }

    @media ${deviceMin.browserSm} {
        margin-left: -2rem;
        padding: 1rem 2rem;
        display: grid;
        grid-template-columns: 50% 50%;
        column-gap: 1rem;
    }
`;

const InputWrapper = styled.div``;

const SelectWrapper = styled.div`
    margin-bottom: 1rem;
`;

const TextAreaContainer = styled.div`
    @media ${deviceMin.mobileS} {
        padding: 0;
    }

    @media ${deviceMin.browserSm} {
        margin-right: 1rem;
    }
`;

const ButtonContainer = styled.div`
    @media ${deviceMin.mobileS} {
        margin: 1rem 0;
        width: 100%;
    }

    @media ${deviceMin.browserSm} {
        margin: 2rem 1rem;
        width: 11rem;
        float: right;
    }
`;

const AddNewProgramForm = () => {
    return (
        <MainFormContainer>
            <FormDesc>
                Thank you for taking the time to contribute. We're always
                looking for popular workout programs.
            </FormDesc>
            <FormInputContainer>
                <InputWrapper>
                    <SelectWrapper>
                        <StyledTextInput
                            styles={{
                                label: {
                                    color: 'rgba(0, 0, 34, .7)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    marginBottom: '.25rem',
                                },
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            required
                            label="Program Title"
                            placeholder="Name your Program"
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
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            label="Program Category"
                            placeholder="Choose a Category"
                            data={[
                                { value: 'any', label: 'Any Category' },
                                {
                                    value: 'weightlifting',
                                    label: 'Weightlifting',
                                },
                                {
                                    value: 'powerlifting',
                                    label: 'Powerlifting',
                                },
                                {
                                    value: 'bodybuilding',
                                    label: 'Bodybuilding',
                                },
                                { value: 'crossfit', label: 'Crossfit' },
                            ]}
                            required
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
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            label="Program Equipment"
                            placeholder="Choose Equipment Required"
                            data={[
                                { value: 'any', label: 'Any Equipment' },
                                {
                                    value: 'no Equipment',
                                    label: 'No Equipment',
                                },
                                {
                                    value: 'gym Required',
                                    label: 'Gym Required',
                                },
                                { value: 'outdoors', label: 'Outdoors' },
                            ]}
                            required
                        />
                    </SelectWrapper>
                </InputWrapper>
                <InputWrapper>
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
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            label="Estimated Difficulty"
                            placeholder="Choose Difficulty"
                            data={[
                                {
                                    value: 'any',
                                    label: 'Any or Varied Difficulty',
                                },
                                { value: 'beginner', label: 'Beginner' },
                                {
                                    value: 'intermediate',
                                    label: 'Intermediate',
                                },
                                { value: 'advanced', label: 'Advanced' },
                            ]}
                            required
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
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            label="Workout Schedule"
                            placeholder="Choose Workout Schedule"
                            data={[
                                { value: 'any', label: 'Any # of Days' },
                                {
                                    value: '1-2 Days/Week',
                                    label: '1-2 Days/Week',
                                },
                                {
                                    value: '3-4 Days/Week',
                                    label: '3-4 Days/Week',
                                },
                                {
                                    value: '5-7 Days/Week',
                                    label: '5-7 Days/Week',
                                },
                            ]}
                            required
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
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            label="Workout Length"
                            placeholder="Choose Workout Length"
                            data={[
                                { value: 'any', label: 'Any Amount of Time' },
                                {
                                    value: '< 45 Minutes',
                                    label: '< 45 Minutes',
                                },
                                { value: '1-2 Hours', label: '1-2 Hours' },
                                { value: '2-3 Hours', label: '2-3 Hours' },
                                { value: '3+ Hours', label: '3+ Hours' },
                            ]}
                            required
                        />
                    </SelectWrapper>
                </InputWrapper>
            </FormInputContainer>
            <TextAreaContainer>
                <Textarea
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 500,
                            height: '15rem',
                        },
                    }}
                    label="Program Description"
                    placeholder="Writing a more detailed description will increase the acceptance rate of your program."
                    required
                />
            </TextAreaContainer>
            <ButtonContainer>
                <GeneralButton buttonLabel="Submit for Review" />
            </ButtonContainer>
        </MainFormContainer>
    );
};

export default AddNewProgramForm;
