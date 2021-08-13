import * as React from 'react';

//Components:
import SearchBar from '../../general_components/SearchBar';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    padding: 2rem 2rem;
`;

const SearchResultsTextContainer = styled.div`
    margin: 2rem 0;
`;

const SearchResultsText = styled.h3`
    color: ${(props) => props.theme.mainText};
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: 700;
`;

//Interfaces:

const SearchResultsSection = () => {
    return (
        <MainContainer>
            <SearchBar placeholderText="Search again..." />
            <SearchResultsTextContainer>
                <SearchResultsText>
                    (10) Search results found for 'barbell'
                </SearchResultsText>
            </SearchResultsTextContainer>
        </MainContainer>
    );
};

export default SearchResultsSection;
