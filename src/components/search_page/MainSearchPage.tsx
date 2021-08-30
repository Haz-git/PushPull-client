import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import FilterColumn from './search_page_components/FilterColumn';
import SearchResultsSection from './search_page_components/SearchResultsSection';
import GeneralModal from '../general_components/GeneralModal';
import AddNewProgramForm from './search_page_components/AddNewProgramForm';

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

    //Loader state for modal:
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const handleModalState = (status: boolean) => setShowModal(status);

    return (
        <>
            <GeneralModal
                openBoolean={showModal}
                closeFunc={closeModal}
                size="xl"
                title="Suggest a new Workout Program"
            >
                <AddNewProgramForm />
            </GeneralModal>
            <MainSearchPageContainer>
                <FilterColumnView>
                    <FilterColumn
                        handleIsResultsLoaded={handleIsResultsLoaded}
                        isResultsLoaded={isResultsLoaded}
                        handleModalState={handleModalState}
                    />
                </FilterColumnView>
                <SearchResultsSectionView>
                    <SearchResultsSection
                        handleIsResultsLoaded={handleIsResultsLoaded}
                        isResultsLoaded={isResultsLoaded}
                        handleModalState={handleModalState}
                    />
                </SearchResultsSectionView>
            </MainSearchPageContainer>
        </>
    );
};

export default MainSearchPage;
