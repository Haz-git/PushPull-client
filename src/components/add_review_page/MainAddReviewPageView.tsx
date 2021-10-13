import * as React from 'react';
import { useEffect, useState } from 'react';

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
    const [reviewProgressIndicator, setReviewProgressIndicator] = useState(0);

    const [userReviewInputDetails, setUserReviewInputDetails] = useState({
        reviewTitle: '',
        reviewDesc: '',
        currentLevel: '',
        recommendedLevel: '',
        followLength: 0,
    });

    const [repeatableRating, setRepeatableRating] = useState(0);
    const [effectivenessRating, setEffectivenessRating] = useState(0);
    const [accurateDifficulty, setAccurateDifficulty] = useState(0);

    const [userImprovedStats, setUserImprovedStats] = useState({});

    useEffect(() => {
        //Alert based event listeners
        window.addEventListener('beforeunload', alertUser);

        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);

        return () => {
            window.removeEventListener('beforeunload', alertUser);
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);

    //Navigation indication handlers:

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

    //User input master handler:

    const handleUserInput = (e: any) => {
        const val = e.target.value;

        setUserReviewInputDetails({
            ...userReviewInputDetails,
            [e.target.name]: val,
        });

        console.log(userReviewInputDetails);
    };

    //User star ratings handlers:
    const handleStarRatings = (val: number, type: string) => {
        switch (type) {
            case 'REPEAT':
                setRepeatableRating(val);
                break;
            case 'EFFECTIVE':
                setEffectivenessRating(val);
                break;
            case 'DIFFICULT':
                setAccurateDifficulty(val);
                break;
            default:
                throw new Error('No valid type');
        }
    };

    return (
        <MainContainer>
            <WizardForm>
                <WizardSection id="Star Ratings">
                    <StarRatingsForm
                        onChangeHandler={handleStarRatings}
                        initialRepeat={repeatableRating}
                        initialDifficult={accurateDifficulty}
                        initialEffective={effectivenessRating}
                    />
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
