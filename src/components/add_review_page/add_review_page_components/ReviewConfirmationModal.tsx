import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';
import {
    MainFormContainer,
    FormDesc,
    ButtonContainer,
} from '../../search_page/search_page_components/AddNewProgramForm';

//Interfaces:

interface IComponentProps {
    reviewTitle: string;
    reviewDesc: string;
    currentLevel: string;
    recommendedLevel: string;
    followLength: number;
    repeatableRating: number;
    effectivenessRating: number;
    accurateDifficulty: number;
    userImprovedStats: any[];
}

const ReviewConfirmationModal = ({
    reviewTitle,
    reviewDesc,
    currentLevel,
    recommendedLevel,
    followLength,
    repeatableRating,
    effectivenessRating,
    accurateDifficulty,
    userImprovedStats,
}: IComponentProps): JSX.Element => {
    return (
        <MainFormContainer>
            <FormDesc>Please confirm your entries before submission.</FormDesc>
        </MainFormContainer>
    );
};

export default ReviewConfirmationModal;
