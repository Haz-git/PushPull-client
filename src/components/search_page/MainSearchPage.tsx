import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import FilterColumn from './search_page_components/FilterColumn';
import SearchResultsSection from './search_page_components/SearchResultsSection';

//Styles:
import styled from 'styled-components';

const MainSearchPageContainer = styled.section`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 8fr;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
        overflow: hidden;
    }

    @media ${deviceMin.tabletp} {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 8fr;
    }
`;

const FilterColumnView = styled.div`
    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.tabletp} {
        display: block;
        width: 18rem;
    }
`;

const SearchResultsSectionView = styled.div``;

//Interfaces:

const MainSearchPage = () => {
    //This loader state controls skeleton loaders from SearchResultsSection:
    const [isResultsLoaded, setIsResultsLoaded] = useState(false);

    const handleIsResultsLoaded = (status: boolean) =>
        setIsResultsLoaded(status);

    return (
        <MainSearchPageContainer>
            <FilterColumnView>
                <FilterColumn
                    handleIsResultsLoaded={handleIsResultsLoaded}
                    isResultsLoaded={isResultsLoaded}
                />
            </FilterColumnView>
            <SearchResultsSectionView>
                <SearchResultsSection
                    handleIsResultsLoaded={handleIsResultsLoaded}
                    isResultsLoaded={isResultsLoaded}
                />
            </SearchResultsSectionView>
        </MainSearchPageContainer>
    );
};

export default MainSearchPage;
