import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import { Link } from 'react-router-dom';
import scrollToTop from '../../../utils/scrollToTop';
import Rating from 'react-rating';

//Styles:
import styled from 'styled-components';
import { Star } from '@styled-icons/evaicons-solid/Star';

const EmptyStar = styled(Star)`
    height: 2.5rem;
    width: 2.5rem;
    color: #c2c2c2;
`;

const FullStar = styled(Star)`
    height: 2.5rem;
    width: 2.5rem;
    color: rgba(224, 113, 51, 1);
`;

const MainContainer = styled.section`
    width: 25rem;
    padding: 1rem 1rem;
    border: 1px solid black;
    text-align: left;
`;

const ReturnButtonContainer = styled.div`
    border: 1px solid red;
`;

const ReturnButton = styled(Link)``;

const GeneralRatingText = styled.h1`
    padding: 0.5rem 0rem 0.5rem 0rem;
    font-size: 2rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 600;
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
`;

//Interfaces:

const RatingColumn = () => {
    useEffect(() => {
        scrollToTop();
    }, []);

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
                    emptySymbol={<EmptyStar />}
                    fullSymbol={<FullStar />}
                />
                <GeneralScoreText>1.4</GeneralScoreText>
            </RatingStarsContainer>
        </MainContainer>
    );
};

export default RatingColumn;
