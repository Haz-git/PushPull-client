import * as React from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import { Textarea } from '@mantine/core';
import GeneralButton from './GeneralButton';
import { Select } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import {
    MainFormContainer,
    FormDesc,
    ButtonContainer,
} from '../search_page/search_page_components/AddNewProgramForm';

const SelectContainer = styled.div`
    margin: 1rem 0;
`;

const TextAreaContainer = styled.div``;

const FeedbackForm = () => {
    const selectData = [
        { value: 'generalFeedback', label: 'General Feedback' },
        { value: 'issue', label: 'Non-code Issue' },
        { value: 'bug', label: 'Code-related Bug' },
        { value: 'featureRequest', label: 'Feature Request' },
    ];

    return (
        <MainFormContainer>
            <FormDesc>
                Thank you for sending your feedback. With your help, we can
                actively improve PushPull.
            </FormDesc>
            <SelectContainer>
                <Select
                    label="What are you sending us?"
                    placeholder="Select one"
                    data={selectData}
                    required
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                    }}
                />
            </SelectContainer>
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
                    label="Describe your feedback below."
                    placeholder={`For a code-related bug--please describe how you encountered the bug, and steps to repeat the bug.`}
                    required
                />
            </TextAreaContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Send my feedback"
                    onClick={() =>
                        alert(
                            'Our apologies, this feature is currently in-the-works!'
                        )
                    }
                />
            </ButtonContainer>
        </MainFormContainer>
    );
};

export default FeedbackForm;
