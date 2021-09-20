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

const FeedbackForm = () => {
    const selectData = [
        { value: 'generalFeedback', label: 'General Feedback' },
        { value: 'issue', label: 'Non-code Issue' },
        { value: 'bug', label: 'Code-related Bug' },
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
        </MainFormContainer>
    );
};

export default FeedbackForm;
