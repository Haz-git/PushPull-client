import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Components:
import SearchBar from '../../general_components/SearchBar';
import SortByWheel from './SortByWheel';
import WorkoutProgramComponent from './WorkoutProgramComponent';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    @media ${deviceMin.mobileS} {
        padding: 1rem 1rem;
    }

    @media ${deviceMin.browserSm} {
        padding: 2rem 2rem;
    }

    @media ${deviceMin.laptopHalf} {
    }

    @media ${deviceMin.laptopS} {
    }
`;

const SearchResultsTextContainer = styled.div`
    margin: 2rem 0.2rem;
`;

const SearchResultsText = styled.h3`
    color: ${(props) => props.theme.mainText};
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: 700;

    @media ${deviceMin.mobileS} {
        font-size: ${(props) => props.theme.fontSizes.md};
    }

    @media ${deviceMin.browserSm} {
        font-size: ${(props) => props.theme.fontSizes.lg};
    }

    @media ${deviceMin.laptopHalf} {
    }

    @media ${deviceMin.laptopS} {
    }
`;

const SortByWheelContainer = styled.div`
    margin: 1.5rem 0;
`;

const WorkoutProgramContainer = styled.div<StyledProps>`
    overflow-y: scroll;
    margin: 1.5rem -2rem;
    height: ${(props) => `${props.containerHeight - 290}px`};
    padding: 1rem 2rem;
`;

//Interfaces:

interface StyledProps {
    containerHeight: number;
}

const SearchResultsSection = () => {
    const { height } = useWindowDimensions();

    return (
        <MainContainer>
            <SearchBar placeholderText="Search again..." />
            <SearchResultsTextContainer>
                <SearchResultsText>
                    (10) Search Results for 'barbell'
                </SearchResultsText>
                <SortByWheelContainer>
                    <SortByWheel />
                </SortByWheelContainer>
                <WorkoutProgramContainer containerHeight={height}>
                    <WorkoutProgramComponent />
                    <WorkoutProgramComponent />
                    <WorkoutProgramComponent />
                    <WorkoutProgramComponent />
                </WorkoutProgramContainer>
            </SearchResultsTextContainer>
        </MainContainer>
    );
};

export default SearchResultsSection;
