import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

export const FormDesc = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${(props) => props.theme.subText};
    opacity: 1;
    text-align: left;
    margin-bottom: 0.5rem;
`;

const AddNewProgramForm = () => {
    return (
        <>
            <FormDesc>
                Thank you for taking the time to contribute. We'd love to hear
                about your new workout program.
            </FormDesc>
        </>
    );
};

export default AddNewProgramForm;
