import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

export const MainContainer = styled.section`
    padding: 3.5rem 2rem;
`;

export const FormTitleContainer = styled.div``;

export const FormTitle = styled.h1`
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

export const FormContainer = styled.div`
    margin-top: 2rem;
`;

export const FormInputContainer = styled.div`
    margin: 1rem 0;
`;

export const FormSubtitle = styled.h2`
    font-size: 1.6rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

export const FormDescContainer = styled.div`
    margin: 0.5rem 0;
`;

export const FormDesc = styled.h3`
    font-size: 1.2rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
`;

/* 
    Since this StarRatingsForm will be the first form of the series for adding a review, this form will be the standardization for all forms under adding a review. In essence, we'll be exporting styles from this form frequently.

*/

const StarRatingsForm = () => {
    return (
        <MainContainer>
            <FormTitleContainer>
                <FormTitle>Star Ratings</FormTitle>
            </FormTitleContainer>
            <FormContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        How would you rate the efficiency of this workout
                        program?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>blahhhh</FormDesc>
                    </FormDescContainer>
                </FormInputContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default StarRatingsForm;
