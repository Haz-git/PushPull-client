import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { getWorkoutPrograms } from '../../../redux/workoutPrograms/workoutProgramActions';

//Components:
import SearchbarDropdown from './SearchbarDropdown';
import SortByWheel from './SortByWheel';
import WorkoutProgramComponent from './WorkoutProgramComponent';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import MobileFilterDrawerButton from './MobileFilterDrawerButton';
import MobileFilterDrawer from './MobileFilterDrawer';
import MobileFilterPill from './MobileFilterPill';
import WorkoutProgramSkeletonLoader from '../../general_components/WorkoutProgramSkeletonLoader';

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
    overflow-y: scroll;
    margin: 1.5rem -2rem;
    height: ${(props) => `${props.containerHeight - 290}px`};
    padding: 1rem 2rem;
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

const PaginationButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    text-align: center;
`;

const PaginationText = styled.h3`
    color: ${(props) => props.theme.mainText};
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 600;
    margin: 0 2rem;
`;

const PaginationButton = styled.button<StyledPaginationProps>`
    border: none;
    background: transparent;
    padding: 0.5rem 0.5rem;
    border-radius: 50%;
    transition: 0.2s all ease-in-out;
    visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};

    &:hover {
        background: #e8e8e8;
    }
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
}

const SearchResultsSection = ({
    isResultsLoaded,
    handleIsResultsLoaded,
}: ISearchResultsSection): JSX.Element => {
    const { height } = useWindowDimensions();

    //Redux Dispatch hook:
    const dispatch = useDispatch();

    //Redux Selector hook:
    const { category, equipment, difficulty, workoutSchedule, workoutLength } =
        useSelector((state: RootStateOrAny) => state.filters);

    const { totalItems, currentPage, totalPages, searchTerm } = useSelector(
        (state: RootStateOrAny) => state.workoutPrograms.workoutPrograms
    );

    useEffect(() => {
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
        (state: RootStateOrAny) => state.workoutPrograms.filteredWorkoutPrograms
    );

    const totalWorkoutPrograms = useSelector(
        (state: RootStateOrAny) =>
            state.workoutPrograms.workoutPrograms.workoutPrograms
    );

    //Render workout programs
    const renderWorkoutPrograms = () => {
        if (workoutPrograms !== undefined && workoutPrograms !== null) {
            return workoutPrograms.map((program: any) => (
                <WorkoutProgramComponent
                    key={program.id}
                    programTitle={program.workoutProgramTitle}
                    programDesc={program.workoutProgramDesc}
                    programAverageRating={program.rating}
                />
            ));
        }
    };

    //Show pagination buttons:
    const showPaginationButton = (direction: string) => {
        if (totalItems && currentPage && totalPages) {
            if (direction === 'FORWARD') {
                if (currentPage !== totalPages) return true;
            } else {
                if (currentPage > 1) return true;
            }

            return false;
        }

        return false;
    };

    //Render pagination buttons:
    const renderPaginationButtons = () => {
        if (totalItems && currentPage && totalPages) {
            return (
                <PaginationButtonContainer>
                    <PaginationButton
                        onClick={() =>
                            handlePaginationRequest(
                                currentPage,
                                totalPages,
                                'BACKWARD'
                            )
                        }
                        isActive={showPaginationButton('BACKWARD')}
                    >
                        <LeftArrowIcon />
                    </PaginationButton>
                    <PaginationText>
                        {`${currentPage} of ${totalPages}`}
                    </PaginationText>
                    <PaginationButton
                        onClick={() =>
                            handlePaginationRequest(
                                currentPage,
                                totalPages,
                                'FORWARD'
                            )
                        }
                        isActive={showPaginationButton('FORWARD')}
                    >
                        <RightArrowIcon />
                    </PaginationButton>
                </PaginationButtonContainer>
            );
        }
    };

    //Handle pagination request:
    const handlePaginationRequest = (
        current: number,
        total: number,
        direction: string
    ) => {
        if (direction === 'FORWARD') {
            if (current !== total) {
                current = current + 1;
                handleIsResultsLoaded(false);
                dispatch(getWorkoutPrograms(handleIsResultsLoaded, current));
            }
        } else {
            //Direction is BACKWARD
            if (current > 1) {
                current = current - 1;
                handleIsResultsLoaded(false);
                dispatch(getWorkoutPrograms(handleIsResultsLoaded, current));
            }
        }
    };

    //Handle search results text:
    const renderSearchText = () => {
        if (totalItems && searchTerm) {
            return (
                <SearchResultsText>
                    {`${totalItems} Search Results for '${searchTerm}'`}
                </SearchResultsText>
            );
        } else if (totalItems) {
            return (
                <SearchResultsText>
                    {`${totalItems} Search Results`}
                </SearchResultsText>
            );
        } else if (totalItems === 0 && totalPages === 0) {
            return (
                <SearchResultsText>
                    {`${totalItems} Search Results for '${searchTerm}'`}
                </SearchResultsText>
            );
        }
    };

    return (
        <>
            <MobileFilterDrawer
                isOpen={renderMobileDrawer}
                closeFunc={toggleMobileDrawer}
                handleIsResultsLoaded={handleIsResultsLoaded}
                isResultsLoaded={isResultsLoaded}
            />
            <MainContainer>
                <SearchbarDropdown
                    totalWorkoutPrograms={totalWorkoutPrograms}
                    loadingHandler={handleIsResultsLoaded}
                />
                <SearchResultsTextContainer>
                    {renderSearchText()}
                    <SortByWheelContainer>
                        <SortByWheel />
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
                                <WorkoutProgramSkeletonLoader />
                            </>
                        )}
                        {renderPaginationButtons()}
                    </WorkoutProgramContainer>
                </SearchResultsTextContainer>
            </MainContainer>
        </>
    );
};

export default SearchResultsSection;
