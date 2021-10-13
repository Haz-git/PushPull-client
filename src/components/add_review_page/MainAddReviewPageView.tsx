import * as React from 'react';
import { useEffect } from 'react';

//Components:
import historyObject from '../../utils/historyObject';
import { deviceMin } from '../../devices/breakpoints';
import WizardForm from '../general_components/WizardForm';
import StarRatingsForm from './add_review_page_components/StarRatingsForm';
import LevelRecommendationForm from './add_review_page_components/LevelRecommendationForm';
import ImprovementsForm from './add_review_page_components/ImprovementsForm';
import MoreDetailsForm from './add_review_page_components/MoreDetailsForm';

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
    useEffect(() => {
        window.addEventListener('beforeunload', alertUser);

        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);

        return () => {
            window.removeEventListener('beforeunload', alertUser);
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);

    const alertUser = (e: any) => {
        e.preventDefault();
        e.returnValue = '';
    };

    const onBackButtonEvent = (e: any) => {
        e.preventDefault();

        if (
            window.confirm(
                'Are you sure you want to leave? Your changes will not be saved.'
            )
        ) {
            historyObject.goBack();
        } else {
            window.history.pushState(null, '', window.location.pathname);
        }
    };

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
                <WizardSection id="More Details">
                    <MoreDetailsForm />
                </WizardSection>
            </WizardForm>
        </MainContainer>
    );
};

export default MainAddReviewPageView;
