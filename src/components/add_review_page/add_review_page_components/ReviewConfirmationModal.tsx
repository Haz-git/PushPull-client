import * as React from 'react';

//Components:
import { deviceMin } from '../../../devices/breakpoints';
import Rating from 'react-rating';

//Styles:
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import {
    MainFormContainer,
    FormDesc,
} from '../../search_page/search_page_components/AddNewProgramForm';
import GeneralButton from '../../general_components/GeneralButton';
import ExerciseCard from './ExerciseCard';
import { Star } from '@styled-icons/evaicons-solid/Star';

const EmptyStar = styled(Star)`
    margin-bottom: 0.5rem;
    @media ${deviceMin.mobileS} {
        height: 2rem;
        width: 2rem;
        color: #c2c2c2;
    }

    @media ${deviceMin.browserSm} {
        height: 2rem;
        width: 2rem;
    }
`;

const FullStar = styled(Star)`
    margin-bottom: 0.5rem;
    @media ${deviceMin.mobileS} {
        height: 2rem;
        width: 2rem;
        color: rgba(224, 113, 51, 1);
    }

    @media ${deviceMin.browserSm} {
        height: 2rem;
        width: 2rem;
    }
`;

const CardContainer = styled.div`
    padding: 1rem 0rem;
`;

const ReviewDetailCard = styled.div`
    margin-bottom: 1rem;
    background: #ececec;
    padding: 1rem 1rem;
    border-radius: 0.3rem;
`;

const ReviewDetailTitle = styled.h3`
    font-size: 1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const ReviewRTEContainer = styled.div`
    border: 1px solid #c6c6c6;
    border-radius: 0.3rem;
    background: #ffffff;
`;

const ReviewDetailInput = styled.h2`
    font-size: 1.3rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    margin: 1rem 0;
`;

const ButtonSpacer = styled.div`
    width: 1rem;
`;

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
    closeFunc: () => void;
    submitFunc: () => void;
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
    closeFunc,
    submitFunc,
}: IComponentProps): JSX.Element => {
    const renderUserStoredImprovedStats = () => {
        if (userImprovedStats.length >= 1) {
            return userImprovedStats.map((exercise: any) => (
                <ExerciseCard
                    exerciseId={exercise.exerciseId}
                    key={exercise.exerciseId}
                    exerciseTitle={exercise.exerciseTitle}
                    initialWeight={exercise.initialWeight}
                    finalWeight={exercise.finalWeight}
                    weightUnit={exercise.exerciseUnit}
                    removeExerciseCard={() =>
                        console.log('This option should not be available')
                    }
                    hasDelete={false}
                />
            ));
        }
    };

    return (
        <MainFormContainer>
            <FormDesc>Please confirm your entries before submission.</FormDesc>
            <CardContainer>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Review Title</ReviewDetailTitle>
                    <ReviewDetailInput>{reviewTitle}</ReviewDetailInput>
                </ReviewDetailCard>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Review Description</ReviewDetailTitle>
                    <ReviewRTEContainer>
                        <ReactQuill
                            theme="bubble"
                            value={reviewDesc}
                            readOnly={true}
                        />
                    </ReviewRTEContainer>
                </ReviewDetailCard>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Current Level</ReviewDetailTitle>
                    <ReviewDetailInput>{currentLevel}</ReviewDetailInput>
                </ReviewDetailCard>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Recommended Level</ReviewDetailTitle>
                    <ReviewDetailInput>{recommendedLevel}</ReviewDetailInput>
                </ReviewDetailCard>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Days Followed</ReviewDetailTitle>
                    <ReviewDetailInput>{followLength}</ReviewDetailInput>
                </ReviewDetailCard>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Reliability</ReviewDetailTitle>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={2}
                        readonly={true}
                        initialRating={repeatableRating}
                        emptySymbol={<EmptyStar />}
                        fullSymbol={<FullStar />}
                    />
                    <ReviewDetailTitle>Effectiveness</ReviewDetailTitle>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={2}
                        readonly={true}
                        initialRating={effectivenessRating}
                        emptySymbol={<EmptyStar />}
                        fullSymbol={<FullStar />}
                    />
                    <ReviewDetailTitle>Accuracy</ReviewDetailTitle>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={2}
                        readonly={true}
                        initialRating={accurateDifficulty}
                        emptySymbol={<EmptyStar />}
                        fullSymbol={<FullStar />}
                    />
                </ReviewDetailCard>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Improvements</ReviewDetailTitle>
                    {renderUserStoredImprovedStats()}
                </ReviewDetailCard>
            </CardContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Cancel"
                    buttonBackground="#ececec"
                    buttonTextColor="rgba(0, 0, 34, 1)"
                    textShadow="none"
                    width="7rem"
                    disableShadow={true}
                    hoverShadow="none"
                    onClick={() => closeFunc()}
                />
                <ButtonSpacer />
                <GeneralButton
                    buttonLabel="Confirm"
                    width="9rem"
                    onClick={() => submitFunc()}
                />
            </ButtonContainer>
        </MainFormContainer>
    );
};

export default ReviewConfirmationModal;
