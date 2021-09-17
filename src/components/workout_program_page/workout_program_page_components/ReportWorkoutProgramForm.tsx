import * as React from 'react';

//Components:
import { deviceMin } from '../../../devices/breakpoints';

//Styles:
import styled from 'styled-components';
//some styles were copied over from 'AddNewProgramForm'.
import {
    MainFormContainer,
    FormDesc,
} from '../../search_page/search_page_components/AddNewProgramForm';
import { Textarea } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';

const TextAreaContainer = styled.div`
    margin-top: 1rem;
`;

const ButtonContainer = styled.div`
    @media ${deviceMin.mobileS} {
        margin: 1rem 0;
        width: 100%;
    }

    @media ${deviceMin.browserSm} {
        margin: 2rem 0rem;
        width: 11rem;
        float: right;
    }
`;

//Interface:

const ReportWorkoutProgramForm = () => {
    return (
        <MainFormContainer>
            <FormDesc>
                Thank you for bringing a problem to our attention.
            </FormDesc>
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
                    label="Please describe the issue below"
                    placeholder="Please be as detailed as possible so we can review your request thoroughly."
                    required
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

export default ReportWorkoutProgramForm;
