import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const SortByLabel = styled.h2`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${(props) => props.theme.subText};
    white-space: nowrap;

    @media ${deviceMin.mobileS} {
        font-size: 1rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1.2rem;
    }
`;

const OptionsContainer = styled.div`
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    max-width: 30rem;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StatOptionButton = styled.button`
    margin: 0 0.25rem;
    background: #ffffff;
    color: ${(props) => props.theme.mainText};
    border: 1px solid #ececec;
    border-radius: 0.3rem;
    padding: 0.5em 0.5em;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;

    &:focus {
        outline: none;
    }

    @media ${deviceMin.mobileS} {
        font-size: 0.8rem;
        margin: 0 0.15rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1rem;
        margin: 0 0.25rem;
    }
`;

//Interfaces:

const SortByWheel = () => {
    return (
        <MainContainer>
            <SortByLabel>Sort By:</SortByLabel>
            <OptionsContainer>
                <StatOptionButton>Alphabetical</StatOptionButton>
                <StatOptionButton>Newest</StatOptionButton>
                <StatOptionButton>Top Rated</StatOptionButton>
                <StatOptionButton>Most Reviewed</StatOptionButton>
            </OptionsContainer>
        </MainContainer>
    );
};

export default SortByWheel;
