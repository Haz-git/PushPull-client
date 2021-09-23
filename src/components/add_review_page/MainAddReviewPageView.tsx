import * as React from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import WizardForm from '../general_components/WizardForm';
import StarRatingsForm from './add_review_page_components/StarRatingsForm';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    // @media ${deviceMin.mobileS} {
    //     height: 100%;
    //     overflow: hidden;
    // }

    // @media ${deviceMin.browserSm} {
    //     height: 100vh;
    // }
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
                <div id="Level Recommendations">MULTIPLE</div>
                <div id="Improvements">CHILDREN</div>
                <div id="More Details">HERE</div>
            </WizardForm>
        </MainContainer>
    );
};

export default MainAddReviewPageView;
