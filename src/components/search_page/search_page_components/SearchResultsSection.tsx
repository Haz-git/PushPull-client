import * as React from 'react';
import { useState } from 'react';

//Components:
import SearchBar from '../../general_components/SearchBar';
import SortByWheel from './SortByWheel';
import WorkoutProgramComponent from './WorkoutProgramComponent';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    padding: 2rem 2rem;
`;

const SearchResultsTextContainer = styled.div`
    margin: 2rem 0.2rem;
`;

const SearchResultsText = styled.h3`
    color: ${(props) => props.theme.mainText};
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: 700;
`;

const SortByWheelContainer = styled.div`
    margin: 1.5rem 0;
`;

const WorkoutProgramContainer = styled.div<StyledProps>`
    overflow-y: scroll;
    margin: 1.5rem -1rem;
    height: ${(props) => `${props.containerHeight - 290}px`};
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
