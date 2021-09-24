import * as React from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import WizardForm from '../general_components/WizardForm';
import StarRatingsForm from './add_review_page_components/StarRatingsForm';
import LevelRecommendationForm from './add_review_page_components/LevelRecommendationForm';
import ImprovementsForm from './add_review_page_components/ImprovementsForm';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    // @media ${deviceMin.mobileS} {
    //     height: 100%;
    //     overflow: hidden;
    // }

    @media ${deviceMin.browserSm} {
        height: 100vh;
    }
`;

const WizardSection = styled.div``;

//Interfaces:

const MainAddReviewPageView = () => {
    return (
        <MainContainer>
            <WizardForm>
                <WizardSection id="Star Ratings">
                    <StarRatingsForm />
                </WizardSection>
                <WizardSection id="Level Recommendations">
                    <LevelRecommendationForm></LevelRecommendationForm>
                </WizardSection>
                <WizardSection id="Improvements">
                    <ImprovementsForm />
                </WizardSection>
                <div id="More Details">HERE</div>
            </WizardForm>
        </MainContainer>
    );
};

export default MainAddReviewPageView;
