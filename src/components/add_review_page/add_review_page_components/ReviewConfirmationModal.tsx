import * as React from 'react';

//Components:
import parse from 'html-react-parser';
import { deviceMin } from '../../../devices/breakpoints';
import Rating from 'react-rating';

//Styles:
import styled from 'styled-components';
import RichTextEditor from '@mantine/rte';
import {
    MainFormContainer,
    FormDesc,
    ButtonContainer,
} from '../../search_page/search_page_components/AddNewProgramForm';
import { Star } from '@styled-icons/evaicons-solid/Star';

const EmptyStar = styled(Star)`
    @media ${deviceMin.mobileS} {
        height: 2.5rem;
        width: 2.5rem;
        color: #c2c2c2;
    }

    @media ${deviceMin.browserSm} {
        height: 2.5rem;
        width: 2.5rem;
    }
`;

const FullStar = styled(Star)`
    @media ${deviceMin.mobileS} {
        height: 2.5rem;
        width: 2.5rem;
        color: rgba(224, 113, 51, 1);
    }

    @media ${deviceMin.browserSm} {
        height: 2.5rem;
        width: 2.5rem;
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

const ReviewRTEContainer = styled.div``;

const ReviewDetailInput = styled.h2`
    font-size: 1.3rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
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
            <CardContainer>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Review Title</ReviewDetailTitle>
                    <ReviewDetailInput>{reviewTitle}</ReviewDetailInput>
                </ReviewDetailCard>
                <ReviewDetailCard>
                    <ReviewDetailTitle>Review Description</ReviewDetailTitle>
                    <ReviewRTEContainer>{parse(reviewDesc)}</ReviewRTEContainer>
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
            </CardContainer>
        </MainFormContainer>
    );
};

export default ReviewConfirmationModal;
