import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../devices/breakpoints';
import { BrowserView, MobileOnlyView } from 'react-device-detect';

//Components:
import FilterColumn from './search_page_components/FilterColumn';
import SearchResultsSection from './search_page_components/SearchResultsSection';
import GeneralDrawer from '../general_components/GeneralDrawer';
import AddNewProgramForm from './search_page_components/AddNewProgramForm';

//Utils:
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';
import renderDrawerSize from '../../utils/renderDrawerSize';

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
    const { width } = useWindowDimensions();

    //This loader state controls skeleton loaders from SearchResultsSection:
    const [isResultsLoaded, setIsResultsLoaded] = useState(false);

    const handleIsResultsLoaded = (status: boolean) =>
        setIsResultsLoaded(status);

    //Loader state for modal:
    const [showDrawer, setShowDrawer] = useState(false);
    const closeDrawer = () => setShowDrawer(false);
    const handleDrawerState = (status: boolean) => setShowDrawer(status);

    return (
        <>
            <MobileOnlyView>
                <GeneralDrawer
                    openBoolean={showDrawer}
                    closeFunc={closeDrawer}
                    size="100%"
                    title="Suggest a new Workout Program"
                    position="bottom"
                >
                    <AddNewProgramForm />
                </GeneralDrawer>
            </MobileOnlyView>
            <BrowserView>
                <GeneralDrawer
                    openBoolean={showDrawer}
                    closeFunc={closeDrawer}
                    size={renderDrawerSize(width)}
                    title="Suggest a new Workout Program"
                    position="left"
                >
                    <AddNewProgramForm />
                </GeneralDrawer>
            </BrowserView>
            <MainSearchPageContainer>
                <FilterColumnView>
                    <FilterColumn
                        handleIsResultsLoaded={handleIsResultsLoaded}
                        isResultsLoaded={isResultsLoaded}
                        handleDrawerState={handleDrawerState}
                    />
                </FilterColumnView>
                <SearchResultsSectionView>
                    <SearchResultsSection
                        handleIsResultsLoaded={handleIsResultsLoaded}
                        isResultsLoaded={isResultsLoaded}
                        handleDrawerState={handleDrawerState}
                    />
                </SearchResultsSectionView>
            </MainSearchPageContainer>
        </>
    );
};

export default MainSearchPage;
