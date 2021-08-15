import * as React from 'react';
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
    }

    @media ${deviceMin.browserSm} {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 8fr;
    }

    @media ${deviceMin.laptopHalf} {
    }

    @media ${deviceMin.laptopS} {
    }
`;

const FilterColumnView = styled.div`
    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.browserSm} {
        display: block;
    }

    @media ${deviceMin.laptopHalf} {
    }

    @media ${deviceMin.laptopS} {
    }
`;

const SearchResultsSectionView = styled.div``;

//Interfaces:

const MainSearchPage = () => {
    return (
        <MainSearchPageContainer>
            <FilterColumnView>
                <FilterColumn />
            </FilterColumnView>
            <SearchResultsSectionView>
                <SearchResultsSection />
            </SearchResultsSectionView>
        </MainSearchPageContainer>
    );
};

export default MainSearchPage;
