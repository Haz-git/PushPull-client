import * as React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';

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

//Interfaces:

const MoreDetailsForm = () => {
    return (
        <MainContainer>
            <FormTitleContainer>
                <FormTitle>More Details</FormTitle>
            </FormTitleContainer>
            <FormContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        How was this workout program in general?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>
                            Now's the time to let people know of the specific
                            details!
                        </FormDesc>
                    </FormDescContainer>
                </FormInputContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default MoreDetailsForm;
