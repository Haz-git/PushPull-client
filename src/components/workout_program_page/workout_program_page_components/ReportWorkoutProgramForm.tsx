import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';
//some styles were copied over from 'AddNewProgramForm'.
import {
    MainFormContainer,
    FormDesc,
} from '../../search_page/search_page_components/AddNewProgramForm';

//Interface:

const ReportWorkoutProgramForm = () => {
    return (
        <MainFormContainer>
            <FormDesc>
                Thank you for bringing a problem to our attention. Please let us
                know the issue.
            </FormDesc>
        </MainFormContainer>
    );
};

export default ReportWorkoutProgramForm;
