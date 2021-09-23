import * as React from 'react';

//Components:

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

const ImprovementsForm = () => {
    return (
        <MainContainer>
            <FormTitleContainer>
                <FormTitle>Improvements</FormTitle>
            </FormTitleContainer>
            <FormContainer>
                <FormSubtitle>
                    What exercises did this program help you develop?
                </FormSubtitle>
                <FormDescContainer>
                    <FormDesc>
                        Let people know how much you've improved! Our favorites
                        are Bench Press, Barbell Squat, and Deadlift.
                    </FormDesc>
                </FormDescContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default ImprovementsForm;
