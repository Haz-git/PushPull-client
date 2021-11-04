import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { getWorkoutPrograms } from '../../../redux/workoutPrograms/workoutProgramActions';

//Components:
import scrollToTop from '../../../utils/scrollToTop';
import { ReactComponent as NoDataSVG } from '../../../assets/search_no_data.svg';
import SearchbarDropdown from './SearchbarDropdown';
import SortByWheel from './SortByWheel';
import WorkoutProgramComponent from './WorkoutProgramComponent';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import MobileFilterDrawerButton from './MobileFilterDrawerButton';
import MobileFilterDrawer from './MobileFilterDrawer';
import MobileFilterPill from './MobileFilterPill';
import WorkoutProgramSkeletonLoader from '../../general_components/WorkoutProgramSkeletonLoader';
import { Pagination } from '@mantine/core';

//Styles:
import styled from 'styled-components';

//Icons:
import { ChevronRight } from '@styled-icons/boxicons-solid/ChevronRight';
import { ChevronLeft } from '@styled-icons/boxicons-solid/ChevronLeft';

const RightArrowIcon = styled(ChevronRight)`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => props.theme.mainText};
`;

const LeftArrowIcon = styled(ChevronLeft)`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => props.theme.mainText};
`;

const MainContainer = styled.section`
    @media ${deviceMin.mobileS} {
        padding: 1rem 1rem;
    }

    @media ${deviceMin.browserSm} {
        padding: 2rem 2rem;
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
`;

const SortByWheelContainer = styled.div`
    margin: 1.5rem 0;
`;

const WorkoutProgramContainer = styled.div<StyledProps>`
    // overflow-y: scroll;
    margin: 1.5rem -2rem;
    // height: ${(props) => `${props.containerHeight - 290}px`};
    height: 100%;
    padding: 1rem 2rem 0rem 2rem;
`;

const SVGContainer = styled.div`
    margin: 0 auto;

    text-align: center;

    @media ${deviceMin.mobileS} {
        width: 19rem;
        height: 19rem;
    }

    @media ${deviceMin.mobileM} {
        width: 23rem;
        height: 23rem;
    }

    @media ${deviceMin.mobileL} {
        width: 25.5rem;
        height: 25.5rem;
    }

    @media ${deviceMin.laptop} {
        width: 27rem;
        height: 27rem;
    }

    @media ${deviceMin.desktopS} {
        width: 33rem;
        height: 33rem;
    }
`;

const MobileFilterButtonContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    @media ${deviceMin.tabletp} {
        display: none;
    }
`;

const MobilePillContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    @media ${deviceMin.tabletp} {
        display: none;
    }
`;

export const PaginationButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    text-align: center;
    padding: 1rem 0;
`;

//Interfaces:

interface StyledProps {
    containerHeight: number;
}

interface StyledPaginationProps {
    isActive: boolean;
}

interface ISearchResultsSection {
    isResultsLoaded: boolean;
    handleIsResultsLoaded: (status: boolean) => void;
    handleDrawerState: (status: boolean) => void;
}

const SearchResultsSection = ({
    isResultsLoaded,
    handleIsResultsLoaded,
    handleDrawerState,
}: ISearchResultsSection): JSX.Element => {
    const { height } = useWindowDimensions();

    //Redux Dispatch hook:
    const dispatch = useDispatch();

    //Redux Selector hook:
    const { category, equipment, difficulty, workoutSchedule, workoutLength } =
        useSelector((state: RootStateOrAny) => state.filters);

    const { totalItems, currentPage, totalPages } = useSelector(
        (state: RootStateOrAny) => state.workoutPrograms.workoutPrograms
    );

    const { currSearchTerm, recentSearchTerms } = useSelector(
        (state: RootStateOrAny) => state.searchTerms.searchTerms
    );

    useEffect(() => {
        scrollToTop();
        dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
    }, []);

    const [renderMobileDrawer, setRenderMobileDrawer] = useState(false);

    //toggles mobile drawer:
    const toggleMobileDrawer = (status: boolean) => {
        setRenderMobileDrawer(status);
    };

    //Pill render function:
    const renderFilterPills = () => {
        if (
            category &&
            equipment &&
            difficulty &&
            workoutSchedule &&
            workoutLength
        ) {
            let pillArray = [] as any[];
            pillArray.push(
                { type: 'category', val: category },
                { type: 'equipment', val: equipment },
                { type: 'difficulty', val: difficulty },
                { type: 'workoutSchedule', val: workoutSchedule },
                { type: 'workoutLength', val: workoutLength }
            );

            return pillArray
                .filter((object) => object.val !== 'any')
                .map((object) => (
                    <MobileFilterPill
                        pillLabel={
                            object.val.charAt(0).toUpperCase() +
                            object.val.slice(1)
                        }
                        filterType={object.type}
                        key={object.type}
                        handleIsResultsLoaded={handleIsResultsLoaded}
                        isResultsLoaded={isResultsLoaded}
                    />
                ));
        }
    };

    const workoutPrograms = useSelector(
        (state: RootStateOrAny) =>
            state.workoutPrograms.workoutPrograms.workoutPrograms
    );

    //Render workout programs
    const renderWorkoutPrograms = () => {
        if (workoutPrograms !== undefined && workoutPrograms !== null) {
            if (workoutPrograms.length === 0 || totalItems === 0) {
                return (
                    <SVGContainer>
                        <NoDataSVG />
                    </SVGContainer>
                );
            } else {
                return workoutPrograms.map((program: any) => (
                    <WorkoutProgramComponent
                        key={program.id}
                        programTitle={program.workoutProgramTitle}
                        programDesc={program.workoutProgramDesc}
                        programAverageRating={program.rating}
                        programReviewCount={program.reviews}
                        programLink={`program/${program.id}`}
                    />
                ));
            }
        }
    };

    //Render pagination buttons:

    const renderMantinePagination = () => {
        if (
            totalItems &&
            currentPage &&
            totalPages &&
            workoutPrograms !== undefined &&
            workoutPrograms.length !== 0
        ) {
            return (
                <Pagination
                    page={currentPage}
                    total={totalPages}
                    onChange={(page) => handlePaginationRequest(page)}
                    styles={{
                        item: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontWeight: 700,
                        },
                        active: {
                            backgroundColor: '#e07133',
                            color: '#ffffff',
                        },
                    }}
                />
            );
        }
    };

    const handlePaginationRequest = (page: number) => {
        handleIsResultsLoaded(false);
        dispatch(getWorkoutPrograms(handleIsResultsLoaded, page));
    };

    //Handle search results text:
    const renderSearchText = () => {
        if (totalItems && currSearchTerm) {
            return (
                <SearchResultsText>
                    {`${totalItems} Search Results for '${currSearchTerm}'`}
                </SearchResultsText>
            );
        } else if (totalItems && currSearchTerm === '') {
            return (
                <SearchResultsText>
                    {`${totalItems} Total Results`}
                </SearchResultsText>
            );
        } else if (totalItems === 0 && totalPages === 0) {
            return <SearchResultsText>{`No Results Found`}</SearchResultsText>;
        }
    };

    return (
        <>
            <MobileFilterDrawer
                isOpen={renderMobileDrawer}
                closeFunc={toggleMobileDrawer}
                handleIsResultsLoaded={handleIsResultsLoaded}
                isResultsLoaded={isResultsLoaded}
                handleDrawerState={handleDrawerState}
            />
            <MainContainer>
                <SearchbarDropdown
                    recentSearchTerms={recentSearchTerms}
                    totalWorkoutPrograms={workoutPrograms}
                    loadingHandler={handleIsResultsLoaded}
                />
                <SearchResultsTextContainer>
                    {renderSearchText()}
                    <SortByWheelContainer>
                        <SortByWheel
                            handleIsResultsLoaded={handleIsResultsLoaded}
                        />
                    </SortByWheelContainer>
                    <MobileFilterButtonContainer>
                        <MobileFilterDrawerButton
                            btnLabel="Filters"
                            onClick={toggleMobileDrawer}
                        />
                        <MobilePillContainer>
                            {renderFilterPills()}
                        </MobilePillContainer>
                    </MobileFilterButtonContainer>
                    <WorkoutProgramContainer containerHeight={height}>
                        {isResultsLoaded === true ? (
                            renderWorkoutPrograms()
                        ) : (
                            <>
                                <WorkoutProgramSkeletonLoader />
                                <WorkoutProgramSkeletonLoader />
                                <WorkoutProgramSkeletonLoader />
                            </>
                        )}
                        <PaginationButtonContainer>
                            {renderMantinePagination()}
                        </PaginationButtonContainer>
                    </WorkoutProgramContainer>
                </SearchResultsTextContainer>
            </MainContainer>
        </>
    );
};

export default SearchResultsSection;
