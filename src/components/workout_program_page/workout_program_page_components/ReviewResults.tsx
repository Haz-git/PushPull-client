import * as React from 'react';
import { useState, useEffect } from 'react';

//Utils/Hooks:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Redux:
import { getReviews } from '../../../redux/reviews/reviewActions';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import { deviceMin } from '../../../devices/breakpoints';
import { Accordion, AccordionItem } from '@mantine/core';
import ReviewComponent from './ReviewComponent';
import { ReactComponent as SurveySVG } from '../../../assets/survey_review.svg';
import { StatOptionButton } from '../../search_page/search_page_components/SortByWheel';
import ReviewResultsSkeletonLoader from './ReviewResultsSkeletonLoader';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 2rem 2rem;
    background: #ffffff;
`;

const ProgramHeaderContainer = styled.div``;

const ProgramTitle = styled.h1`
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;

    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.tabletp} {
        display: block;
    }
`;

const ProgramDescAccContainer = styled.div`
    margin: 1rem 0;
`;

const ProgramReviewsContainer = styled.div`
    margin-top: 2rem;
`;

const ProgramReviewsHeaderContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: block;
        text-align: left;
    }

    @media ${deviceMin.tablet} {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const SortOptionsContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: block;
        text-align: left;
        margin-top: 1rem;
    }

    @media ${deviceMin.tablet} {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 0rem;
        padding: 0rem 1rem;
        margin-top: 0rem;
    }
`;

const ReviewCountLabel = styled.h2`
    font-size: 1.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

const ReviewContainer = styled.div<ReviewContainerProps>`
    margin: 1rem -1rem 0rem -1rem;
    // height: ${(props) => `${props.containerHeight - 290}px`};
    height: 100%;
    overflow-y: scroll;

    @media ${deviceMin.browserSm} {
        padding: 1rem 1rem;
    }
`;

//Styles: survey_review SVG

const SvgContainer = styled.div`
    @media ${deviceMin.mobileS} {
        margin: 4rem auto;
        height: 17rem;
        width: 17rem;
        text-align: center;
    }

    @media ${deviceMin.mobileM} {
        height: 20rem;
        width: 20rem;
    }

    @media ${deviceMin.mobileL} {
        height: 23rem;
        width: 23rem;
    }

    @media ${deviceMin.browserSm} {
        height: 28rem;
        width: 28rem;
    }

    @media ${deviceMin.tabletp} {
        height: 50rem;
        width: 50rem;
    }
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
    openReviewReportDrawer: () => void;
    handleReviewSort: (sort: string) => void;
    currReviewSort: string;
    handleReviewsSortedStatus: (status: boolean) => void;
    areReviewsSorted: boolean;
}

const ReviewResults = ({
    programTitle,
    programDesc,
    programId,
    openReviewReportDrawer,
    handleReviewSort,
    currReviewSort,
    handleReviewsSortedStatus,
    areReviewsSorted,
}: IComponentProps): JSX.Element => {
    //useWindowDimensions Hook:
    const { height } = useWindowDimensions();

    //Selector Hook:

    const { currentPage, totalPages, totalItems } = useSelector(
        (state: RootStateOrAny) => state?.reviews?.reviews
    );

    const { reviews } = useSelector(
        (state: RootStateOrAny) => state?.reviews?.reviews
    );

    const checkSortOptionActive = (option: string) => {
        if (option === currReviewSort) return true;
        return false;
    };

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
                        openReviewReportDrawer={openReviewReportDrawer}
                        usefulScore={review.usefulScore}
                        notUsefulScore={review.notUsefulScore}
                        reviewAuthorId={review.reviewAuthorId}
                        reviewAuthorName={review.reviewAuthorName}
                        reviewAuthorImg={review.reviewAuthorImg}
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
                <ProgramReviewsHeaderContainer>
                    <ReviewCountLabel>{`${totalItems} Total Review(s)`}</ReviewCountLabel>
                    <SortOptionsContainer>
                        <StatOptionButton
                            isActive={checkSortOptionActive('updatedAt')}
                            onClick={() => {
                                handleReviewsSortedStatus(false);
                                handleReviewSort('updatedAt');
                            }}
                        >
                            Newest
                        </StatOptionButton>
                        <StatOptionButton
                            isActive={checkSortOptionActive('usefulScore')}
                            onClick={() => {
                                handleReviewsSortedStatus(false);
                                handleReviewSort('usefulScore');
                            }}
                        >
                            Most Useful
                        </StatOptionButton>
                    </SortOptionsContainer>
                </ProgramReviewsHeaderContainer>
                <ReviewContainer containerHeight={height}>
                    {areReviewsSorted === true ? (
                        <>{renderReviews()}</>
                    ) : (
                        <ReviewResultsSkeletonLoader />
                    )}
                </ReviewContainer>
            </ProgramReviewsContainer>
        </MainContainer>
    );
};

export default ReviewResults;
