import * as React from 'react';
import { useState, useEffect } from 'react';

//Utils/Hooks:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Redux:
import { getReviews } from '../../../redux/reviews/reviewActions';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import { Accordion, AccordionItem } from '@mantine/core';
import ReviewComponent from './ReviewComponent';
import { ReactComponent as SurveySVG } from '../../../assets/survey_review.svg';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 2rem 2rem;
`;

const ProgramHeaderContainer = styled.div``;

const ProgramTitle = styled.h1`
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

const ProgramDescAccContainer = styled.div`
    margin: 1rem 0;
`;

const ProgramReviewsContainer = styled.div`
    margin-top: 2rem;
`;

const ReviewCountLabel = styled.h2`
    font-size: 1.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

const ReviewContainer = styled.div<ReviewContainerProps>`
    margin-top: 2rem;
    height: ${(props) => `${props.containerHeight - 290}px`};
`;

//Styles: survey_review SVG

const SvgContainer = styled.div`
    height: 50rem;
    width: 50rem;
    margin: 4rem auto;
    text-align: center;
`;

const SvgText = styled.h3`
    font-size: 1.5rem;
    color: ${(props) => props.theme.subText};
    font-weight: 900;
`;

//Interfaces:
interface ReviewContainerProps {
    containerHeight: number;
}

interface IComponentProps {
    programTitle: string;
    programDesc: string;
    programId: string;
}

const ReviewResults = ({
    programTitle,
    programDesc,
    programId,
}: IComponentProps): JSX.Element => {
    //useWindowDimensions Hook:
    const { height } = useWindowDimensions();

    //Selector Hook:

    const { currentPage, totalPages, totalItems } = useSelector(
        (state: RootStateOrAny) => state.reviews.reviews
    );

    const { reviews } = useSelector(
        (state: RootStateOrAny) => state.reviews.reviews
    );

    // Mapping Review Components:
    const renderReviews = () => {
        if (reviews !== undefined && reviews !== null) {
            if (reviews.length === 0) {
                return (
                    <SvgContainer>
                        <SvgText>
                            Sorry, no reviews here yet. You can be the first!
                        </SvgText>
                        <SurveySVG />
                    </SvgContainer>
                );
            } else {
                return reviews.map((review: any) => (
                    <ReviewComponent
                        key={review.id}
                        reviewId={review.id}
                        reviewerLevel={review.currentLevel}
                        reviewTitle={review.reviewTitle}
                        reviewDesc={review.reviewDesc}
                        recommendedLevel={review.recommendedLevel}
                        effectivenessRating={review.effectivenessRating}
                        repeatableRating={review.repeatableRating}
                        accurateDifficulty={review.accurateDifficulty}
                        followLength={review.followLength}
                        improvedStats={review.improvedStats}
                        createdAt={review.createdAt}
                    />
                ));
            }
        }
    };

    return (
        <MainContainer>
            <ProgramHeaderContainer>
                <ProgramTitle>{programTitle}</ProgramTitle>
                <ProgramDescAccContainer>
                    <Accordion
                        initialItem={-1}
                        transitionDuration={400}
                        styles={{
                            label: {
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                color: 'rgba(0, 0, 34, .7)',
                            },
                            item: {
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: 500,
                                fontSize: '1.1rem',
                                color: 'rgba(0, 0, 34, .7)',
                                marginLeft: '-.85rem',
                                borderTop: '2px solid #e5e5e5',
                                borderBottom: '2px solid #e5e5e5',
                            },
                        }}
                    >
                        <AccordionItem label={`What's ${programTitle} about?`}>
                            {programDesc}
                        </AccordionItem>
                    </Accordion>
                </ProgramDescAccContainer>
            </ProgramHeaderContainer>
            <ProgramReviewsContainer>
                <ReviewCountLabel>{`${totalItems} Total Review(s)`}</ReviewCountLabel>
                <ReviewContainer containerHeight={height}>
                    {renderReviews()}
                </ReviewContainer>
            </ProgramReviewsContainer>
        </MainContainer>
    );
};

export default ReviewResults;
