import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import { deviceMin } from '../../../devices/breakpoints';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';
import scrollToTop from '../../../utils/scrollToTop';
import Rating from 'react-rating';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';

//Styles:
import styled from 'styled-components';
import { Star } from '@styled-icons/evaicons-solid/Star';
import { CaretLeft } from '@styled-icons/boxicons-regular/CaretLeft';
import { Pencil } from '@styled-icons/boxicons-solid/Pencil';
import { FlagPride } from '@styled-icons/fluentui-system-filled/FlagPride';

const FlagIcon = styled(FlagPride)`
    height: 1.2rem;
    width: 1.2rem;
    color: red;
`;

const PencilIcon = styled(Pencil)`
    height: 1.25rem;
    width: 1.25rem;
    color: #ffffff;
`;

const CaretLeftIcon = styled(CaretLeft)`
    height: 1.2rem;
    width: 1.2rem;
    color: ${(props) => props.theme.mainText};
`;

const EmptyStar = styled(Star)<StyledProps>`
    height: ${(props) => props.starHeight};
    width: ${(props) => props.starWidth};
    color: #c2c2c2;
`;

const FullStar = styled(Star)<StyledProps>`
    height: ${(props) => props.starHeight};
    width: ${(props) => props.starWidth};
    color: rgba(224, 113, 51, 1);
`;

const MainContainer = styled.section`
    width: 25rem;
    border-right: 1px solid #e5e5e5;
    text-align: left;
    height: 100%;

    @media ${deviceMin.mobileS} {
        width: 100%;
    }

    @media ${deviceMin.tabletp} {
        width: 25rem;
    }
`;

const ReturnButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    margin: 1rem 1rem 0rem 1.5rem;
`;

const GeneralRatingText = styled.h1`
    font-size: 2.1rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
    margin: 2rem 1.5rem 0rem 1.5rem;
`;

const GeneralScoreText = styled.h1`
    padding: 0rem 0rem 0.5rem 0rem;
    font-size: 2.1rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 900;
    margin-bottom: -0.5rem;
    margin-right: 1rem;
`;

const RatingStarsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 1.5rem;
`;

const SubmitReviewButtonContainer = styled.div`
    padding: 0.5rem 0rem 2rem 1.5rem;
    border-bottom: 1px solid #e5e5e5;
`;

const RatingBreakdownContainer = styled.div`
    padding: 2rem 1.5rem;
    border-bottom: 1px solid #e5e5e5;
`;

const SubcategoryHeader = styled.h2`
    font-size: 1.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
    margin-bottom: 1rem;
`;

const SubcategoryText = styled.p`
    font-size: 1.1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
`;

const SubcategoryRating = styled.span`
    font-size: 1.1rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 900;
    margin-right: 0.75rem;
`;

const RatingCategoryContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: block;
        padding: 0.5rem 0;
    }

    @media ${deviceMin.mobileM} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 0.75rem;
        padding: 0;
    }
`;

const ReviewerLevelContainer = styled.div`
    padding: 2rem 1.5rem;
    border-bottom: 1px solid #e5e5e5;
`;

const ReviewerLevelChartContainer = styled.div`
    @media ${deviceMin.mobileS} {
        margin-top: 1rem;
        height: 15rem;
        width: 19rem;
    }

    @media ${deviceMin.mobileM} {
        margin-top: 1rem;
        height: 18rem;
        width: 22rem;
    }

    @media ${deviceMin.mobileL} {
        height: 20rem;
        width: 23rem;
    }

    @media ${deviceMin.browserSm} {
<<<<<<< HEAD
        height: 22rem;
=======
        height: 21rem;
>>>>>>> dev
        width: 23rem;
    }
`;

const RecommendedLevelContainer = styled.div`
    padding: 2rem 1.5rem;
    border-bottom: 1px solid #e5e5e5;
`;

//Mobile Styles:

const ProgramTitle = styled.h1`
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;

    @media ${deviceMin.mobileS} {
        display: block;
        padding: 1rem 1.5rem 0rem 1.5rem;
    }

    @media ${deviceMin.tabletp} {
        display: none;
    }
`;

//Interfaces:

interface StyledProps {
    starWidth: string;
    starHeight: string;
}

interface IComponentProps {
    programRating: number;
    programTitle: string;
    openReportDrawer: () => void;
    programId: string;
    accurateScore: number;
    effectiveScore: number;
    reliableScore: number;
    reviewerAdvCount: number;
    reviewerBegCount: number;
    reviewerIntCount: number;
    recAdvCount: number;
    recBegCount: number;
    recIntCount: number;
    avgFollowLength: number;
}

const RatingColumn = ({
    programRating,
    programTitle,
    openReportDrawer,
    programId,
    accurateScore,
    effectiveScore,
    reliableScore,
    reviewerAdvCount,
    reviewerBegCount,
    reviewerIntCount,
    recAdvCount,
    recBegCount,
    recIntCount,
    avgFollowLength,
}: IComponentProps): JSX.Element => {
    useEffect(() => {
        scrollToTop();
    }, []);

    const reviewerLevels = [
        {
            name: 'Beginner',
            Reviewers: reviewerBegCount,
        },
        {
            name: 'Intermediate',
            Reviewers: reviewerIntCount,
        },
        {
            name: 'Advanced',
            Reviewers: reviewerAdvCount,
        },
    ];

    const recommendedLevels = [
        {
            name: 'Beginner',
            Reviewers: recBegCount,
        },
        {
            name: 'Intermediate',
            Reviewers: recIntCount,
        },
        {
            name: 'Advanced',
            Reviewers: recAdvCount,
        },
    ];

    return (
        <MainContainer>
            <ReturnButtonContainer>
                <GeneralButton
                    onClick={() => historyObject.push('/search')}
                    buttonIcon={<CaretLeftIcon />}
                    disableShadow={true}
                    hoverShadow="none"
                    hoverTransform="none"
                    width="13rem"
                    buttonLabel="Workout Programs"
                    buttonBackground="#e5e5e5"
                    padding=".5rem .4rem"
                    buttonTextColor="rgba(0, 0, 34, 1)"
                    textShadow="none"
                />
                <GeneralButton
                    onClick={() => openReportDrawer()}
                    buttonLabel="Flag"
                    fontWeight="700"
                    width="6rem"
                    buttonBackground="transparent"
                    buttonTextColor="red"
                    textShadow="none"
                    border="1px solid red"
                    hoverTransform="none"
                    hoverShadow="none"
                    disableShadow={true}
                    buttonIcon={<FlagIcon />}
                    padding=".45rem .4rem"
                />
            </ReturnButtonContainer>
            <ProgramTitle>{programTitle}</ProgramTitle>
            <GeneralRatingText>Overall Rating</GeneralRatingText>
            <RatingStarsContainer>
                <GeneralScoreText>{`${programRating}`}</GeneralScoreText>
                <Rating
                    start={0}
                    stop={5}
                    fractions={0.1}
                    readonly={true}
                    initialRating={programRating}
                    emptySymbol={
                        <EmptyStar starHeight="2.5rem" starWidth="2.5rem" />
                    }
                    fullSymbol={
                        <FullStar starHeight="2.5rem" starWidth="2.5rem" />
                    }
                />
            </RatingStarsContainer>
            <SubmitReviewButtonContainer>
                <GeneralButton
                    buttonLabel="Submit a Review"
                    padding=".6rem .5rem"
                    width="16rem"
                    buttonIcon={<PencilIcon />}
                    hoverTransform="none"
                    onClick={() =>
                        historyObject.push(`/add-review/${programId}`)
                    }
                />
            </SubmitReviewButtonContainer>
            <RatingBreakdownContainer>
                <SubcategoryHeader>Ratings by Category</SubcategoryHeader>
                <RatingCategoryContainer>
                    <SubcategoryText>
                        Reliability -{' '}
                        <SubcategoryRating>{`${reliableScore}`}</SubcategoryRating>
                    </SubcategoryText>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={0.1}
                        readonly={true}
                        initialRating={reliableScore}
                        emptySymbol={
                            <EmptyStar starHeight="1.5rem" starWidth="1.5rem" />
                        }
                        fullSymbol={
                            <FullStar starHeight="1.5rem" starWidth="1.5rem" />
                        }
                    />
                </RatingCategoryContainer>
                <RatingCategoryContainer>
                    <SubcategoryText>
                        Accurate Difficulty -{' '}
                        <SubcategoryRating>{`${accurateScore}`}</SubcategoryRating>
                    </SubcategoryText>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={0.1}
                        readonly={true}
                        initialRating={accurateScore}
                        emptySymbol={
                            <EmptyStar starHeight="1.5rem" starWidth="1.5rem" />
                        }
                        fullSymbol={
                            <FullStar starHeight="1.5rem" starWidth="1.5rem" />
                        }
                    />
                </RatingCategoryContainer>
                <RatingCategoryContainer>
                    <SubcategoryText>
                        Effectiveness -{' '}
                        <SubcategoryRating>{`${effectiveScore}`}</SubcategoryRating>
                    </SubcategoryText>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={0.1}
                        readonly={true}
                        initialRating={effectiveScore}
                        emptySymbol={
                            <EmptyStar starHeight="1.5rem" starWidth="1.5rem" />
                        }
                        fullSymbol={
                            <FullStar starHeight="1.5rem" starWidth="1.5rem" />
                        }
                    />
                </RatingCategoryContainer>
            </RatingBreakdownContainer>
            <ReviewerLevelContainer>
                <SubcategoryHeader>Reviewer Levels</SubcategoryHeader>
                <ReviewerLevelChartContainer>
                    <ResponsiveContainer>
                        <BarChart
                            width={350}
                            height={300}
                            data={reviewerLevels}
                            margin={{
                                top: 10,
                                right: 30,
                                left: -30,
                                bottom: 10,
                            }}
                            barSize={30}
                        >
                            <XAxis
                                dataKey="name"
                                scale="point"
                                padding={{ left: 38, right: 38 }}
                            />
                            <YAxis tickCount={8} />
                            <Tooltip />
                            <Legend
                                align="center"
                                verticalAlign="bottom"
                                wrapperStyle={{ position: 'relative' }}
                            />
                            <CartesianGrid />
                            <Bar
                                dataKey="Reviewers"
                                fill="rgba(224, 113, 51, 1)"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ReviewerLevelChartContainer>
            </ReviewerLevelContainer>
            <RecommendedLevelContainer>
                <SubcategoryHeader>Suggested Experience</SubcategoryHeader>
                <ReviewerLevelChartContainer>
                    <ResponsiveContainer>
                        <BarChart
                            width={350}
                            height={300}
                            data={recommendedLevels}
                            margin={{
                                top: 10,
                                right: 30,
                                left: -30,
                                bottom: 10,
                            }}
                            barSize={30}
                        >
                            <XAxis
                                dataKey="name"
                                scale="point"
                                padding={{ left: 38, right: 38 }}
                            />
                            <YAxis tickCount={8} />
                            <Tooltip />
                            <Legend
                                align="center"
                                verticalAlign="bottom"
                                wrapperStyle={{ position: 'relative' }}
                            />
                            <CartesianGrid />
                            <Bar
                                dataKey="Experience Level"
                                fill="rgba(224, 113, 51, 1)"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ReviewerLevelChartContainer>
            </RecommendedLevelContainer>
        </MainContainer>
    );
};

export default RatingColumn;
