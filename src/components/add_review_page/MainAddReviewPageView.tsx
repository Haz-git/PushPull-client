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

//Default 'Placeholder' for RTE:

const initialRTEValue = `
        <div>
            <h1>My Engaging Review</h1>
            <div>
                <b>Some items to perhaps consider when writing...</b>
            </div>
            <div>
                <ol>
                    <li>Were you consuming a calorie deficit or surplus on this program?</li>
                    <li>Did you have ample time for recovery (did you sleep well)?</li>
                    <li>Any challenges? Sticking points?</li>
                </ol>
            </div>
        </div> 
    `;

//Interfaces:

const MainAddReviewPageView = () => {
    const [reviewProgressIndicator, setReviewProgressIndicator] = useState(0);

    const [userReviewInputDetails, setUserReviewInputDetails] = useState({
        reviewTitle: '',
        reviewDesc: initialRTEValue,
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

    const handleUserInput = (name: string, val: string | number) => {
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
            let newArr = userImprovedStats.slice();
            newArr.push(object);
            setUserImprovedStats(newArr);
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

    //Helper function for checking valid improvements length:
    const checkImprovementExerciseLength = () => {
        console.log(userImprovedStats.length);
        if (userImprovedStats.length >= 3) return 3;
        return userImprovedStats.length;
    };

    const identifyUserProgress = () => {
        //11 is required
        let totalUserInputsRequired = 0;

        //Check items inside userReviewInputDetails
        for (const [key, value] of Object.entries(userReviewInputDetails)) {
            if (value !== '' && value !== 0 && value !== initialRTEValue) {
                totalUserInputsRequired += 1;
            }
        }

        //Check star ratings:
        totalUserInputsRequired += checkStarRatingsSelected();

        //Check improvements for atleast 3 entries:
        totalUserInputsRequired += checkImprovementExerciseLength(); //I think there's something weird going on here..

        return totalUserInputsRequired;
    };

    return (
        <MainContainer>
            <WizardForm progressIndicator={identifyUserProgress()}>
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
                        onSVGSelectHandler={handleUserInput}
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
                    <MoreDetailsForm
                        handleUserInput={handleUserInput}
                        currentEditorVal={userReviewInputDetails.reviewDesc}
                        currentHeaderVal={userReviewInputDetails.reviewTitle}
                    />
                </WizardSection>
            </WizardForm>
        </MainContainer>
    );
};

export default MainAddReviewPageView;
