import * as React from 'react';
import { useState } from 'react';

//Components:
import { deviceMin } from '../../../devices/breakpoints';
import { Textarea } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import { MultiSelect } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import {
    MainFormContainer,
    FormDesc,
    ButtonContainer,
} from '../../search_page/search_page_components/AddNewProgramForm';

const MultiSelectContainer = styled.div`
    margin-top: 1rem;
`;

const TextAreaContainer = styled.div`
    margin-top: 1rem;
`;

//Interfaces:

const ReportReviewForm = () => {
    //Handles offense selection change:
    const [selectedOffense, setSelectedOffense] = useState<string[]>([]);

    const handleMultiSelectOffense = (value: string[]) => {
        console.log(value);
        setSelectedOffense(value);
    };

    //Parses user offense selection, returns true if 'other' is selected:

    const checkIfTextRequired = () => {
        return selectedOffense.includes('other');
    };

    const reportMultiSelectChoices = [
        { value: 'spam', label: 'Spam' },
        { value: 'advertising', label: 'Advertising' },
        { value: 'unrelated', label: 'Unrelated to workout program' },
        { value: 'offensiveLanguage', label: 'Offensive Language' },
        { value: 'falseInformation', label: 'False Information' },
        { value: 'hateSpeech', label: 'Hate Speech' },
        { value: 'other', label: 'Other Reasons (Describe below)' },
    ];
    return (
        <MainFormContainer>
            <FormDesc>
                Thank you for bringing a problem to our attention.
            </FormDesc>
            <MultiSelectContainer>
                <MultiSelect
                    data={reportMultiSelectChoices}
                    label="Please select from the following options"
                    placeholder="Select one or many offenses"
                    clearable
                    required
                    styles={{
                        value: {
                            background: '#FFBE80',
                            color: '#E07133',
                        },
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                    }}
                    onChange={handleMultiSelectOffense}
                />
            </MultiSelectContainer>
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
                    label={`If you've chosen 'other', please describe the offense below.`}
                    placeholder="Please be as detailed as possible so we can review your request thoroughly."
                    required={checkIfTextRequired()}
                />
            </TextAreaContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Submit for Review"
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

export default ReportReviewForm;
