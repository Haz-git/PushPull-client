import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
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

//Styles:
import styled from 'styled-components';
import { Star } from '@styled-icons/evaicons-solid/Star';

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
`;

const ReturnButtonContainer = styled.div`
    border: 1px solid red;
    margin: 1rem 1.5rem;
`;

const ReturnButton = styled(Link)``;

const GeneralRatingText = styled.h1`
    font-size: 1.8rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 600;
    margin: 2rem 1.5rem 0rem 1.5rem;
`;

const GeneralScoreText = styled.h1`
    padding: 0rem 0rem 0.5rem 0rem;
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 900;
    margin-bottom: -0.5rem;
    margin-left: 1rem;
`;

const RatingStarsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 1.5rem;
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0.75rem;
`;

const ReviewerLevelContainer = styled.div`
    padding: 2rem 1.5rem;
    border-bottom: 1px solid #e5e5e5;
`;

const ReviewerLevelChartContainer = styled.div`
    margin-top: 1rem;
    height: 100%;
    width: 100%;
`;

//Interfaces:

interface StyledProps {
    starWidth: string;
    starHeight: string;
}

const RatingColumn = () => {
    useEffect(() => {
        scrollToTop();
    }, []);

    const dummyData = [
        {
            name: 'Beginner',
            Reviewers: 10,
        },
        {
            name: 'Intermediate',
            Reviewers: 5,
        },
        {
            name: 'Advanced',
            Reviewers: 1,
        },
    ];

    return (
        <MainContainer>
            <ReturnButtonContainer>
                <ReturnButton to="/search">Return</ReturnButton>
            </ReturnButtonContainer>
            <GeneralRatingText>Overall Rating</GeneralRatingText>
            <RatingStarsContainer>
                <Rating
                    start={0}
                    stop={5}
                    fractions={0.1}
                    readonly={true}
                    initialRating={1.4}
                    emptySymbol={
                        <EmptyStar starHeight="2.5rem" starWidth="2.5rem" />
                    }
                    fullSymbol={
                        <FullStar starHeight="2.5rem" starWidth="2.5rem" />
                    }
                />
                <GeneralScoreText>1.4</GeneralScoreText>
            </RatingStarsContainer>
            <RatingBreakdownContainer>
                <SubcategoryHeader>Ratings by Category</SubcategoryHeader>
                <RatingCategoryContainer>
                    <SubcategoryText>
                        Repeatable - <SubcategoryRating>2.4</SubcategoryRating>
                    </SubcategoryText>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={0.1}
                        readonly={true}
                        initialRating={2.4}
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
                        <SubcategoryRating>1.1</SubcategoryRating>
                    </SubcategoryText>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={0.1}
                        readonly={true}
                        initialRating={1.1}
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
                        Clear Exercises -{' '}
                        <SubcategoryRating>4.1</SubcategoryRating>
                    </SubcategoryText>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={0.1}
                        readonly={true}
                        initialRating={4.1}
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
                    {/* <ResponsiveContainer width="100%" height="100%"> */}
                    <BarChart
                        width={350}
                        height={300}
                        data={dummyData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: -20,
                            bottom: 10,
                        }}
                        barSize={10}
                    >
                        <XAxis
                            dataKey="name"
                            scale="point"
                            padding={{ left: 38, right: 38 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid />
                        <Bar dataKey="Reviewers" fill="rgba(224, 113, 51, 1)" />
                    </BarChart>
                    {/* </ResponsiveContainer> */}
                </ReviewerLevelChartContainer>
            </ReviewerLevelContainer>
        </MainContainer>
    );
};

export default RatingColumn;
