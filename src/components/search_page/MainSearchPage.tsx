import * as React from 'react';

//Components:
import FilterColumn from './search_page_components/FilterColumn';
import SearchResultsSection from './search_page_components/SearchResultsSection';

//Styles:
import styled from 'styled-components';

const MainSearchPageContainer = styled.section`
    height: 100vh;
    display: grid;
    grid-template-columns: 2fr 6fr;
`;

//Interfaces:

const MainSearchPage = () => {
    return (
        <MainSearchPageContainer>
            <FilterColumn />
            <SearchResultsSection />
        </MainSearchPageContainer>
    );
};

export default MainSearchPage;
