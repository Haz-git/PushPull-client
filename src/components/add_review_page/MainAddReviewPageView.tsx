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

    const [userImprovedStats, setUserImprovedStats] = useState<any>([]);

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
    };

    //User button handler:
    const handleUserButtonSelection = (name: string, val: string | number) => {
        setUserReviewInputDetails({
            ...userReviewInputDetails,
            [name]: val,
        });
    };

    //User improvements exercise handler:
    const handleUserImprovementsInput = (object: any) => {
        const {
            exerciseTitle,
            initialWeight,
            finalWeight,
            exerciseUnit,
            exerciseId,
        } = object;

        if (
            userImprovedStats.length < 5 &&
            exerciseTitle !== '' &&
            initialWeight >= 1 &&
            finalWeight >= 1 &&
            exerciseUnit &&
            exerciseId
        ) {
            userImprovedStats.push(object);
            setUserImprovedStats(userImprovedStats);
        }
    };

    //User improvements exercise deletion handler:

    const removeExerciseCard = (exerciseId: string) => {
        if (exerciseId) {
            let targetIdx = userImprovedStats.findIndex(
                (obj: any) => obj.exerciseId === exerciseId
            );

            if (targetIdx > -1) {
                let newArr = userImprovedStats.slice();
                newArr.splice(targetIdx, 1);
                setUserImprovedStats(newArr);
            }
        }
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

    //Helper function for checking if star ratings have been selected--to indicate via progress bar:
    const checkStarRatingsSelected = () => {
        let totalSelectedOptions = 0;

        if (repeatableRating !== 0) totalSelectedOptions += 1;
        if (effectivenessRating !== 0) totalSelectedOptions += 1;
        if (accurateDifficulty !== 0) totalSelectedOptions += 1;

        return totalSelectedOptions;
    };

    const identifyUserProgress = () => {
        let totalUserInputs = 11;

        //Check items inside userReviewInputDetails
        for (const [key, value] of Object.entries(userReviewInputDetails)) {
            if (value !== '' && value !== 0) {
                totalUserInputs -= 1;
            }
        }

        //Check star ratings:
        totalUserInputs -= checkStarRatingsSelected();

        console.log(userReviewInputDetails);
        console.log(totalUserInputs);

        return totalUserInputs;
    };
    //Not returning number correctly...
    identifyUserProgress();

    return (
        <MainContainer>
            <WizardForm progressIndicator={1}>
                <WizardSection id="Star Ratings">
                    <StarRatingsForm
                        onChangeHandler={handleStarRatings}
                        initialRepeat={repeatableRating}
                        initialDifficult={accurateDifficulty}
                        initialEffective={effectivenessRating}
                    />
                </WizardSection>
                <WizardSection id="Level Recommendations">
                    <LevelRecommendationForm
                        onSVGSelectHandler={handleUserButtonSelection}
                        currentRecommendSelection={
                            userReviewInputDetails.recommendedLevel
                        }
                        currentSelfSelection={
                            userReviewInputDetails.currentLevel
                        }
                        currentFollowLength={
                            userReviewInputDetails.followLength
                        }
                    />
                </WizardSection>
                <WizardSection id="Improvements">
                    <ImprovementsForm
                        userExerciseHandler={handleUserImprovementsInput}
                        currentUserExercises={userImprovedStats}
                        removeExerciseCard={removeExerciseCard}
                    />
                </WizardSection>
                <WizardSection id="More Details">
                    <MoreDetailsForm />
                </WizardSection>
            </WizardForm>
        </MainContainer>
    );
};

export default MainAddReviewPageView;
