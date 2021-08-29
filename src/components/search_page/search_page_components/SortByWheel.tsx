import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { updateWorkoutProgramSortOption } from '../../../redux/sortOptions/sortOptionsActions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const SortByLabel = styled.h2`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${(props) => props.theme.subText};
    white-space: nowrap;

    @media ${deviceMin.mobileS} {
        font-size: 1rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1.2rem;
    }
`;

const OptionsContainer = styled.div`
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    max-width: 30rem;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StatOptionButton = styled.button<StyledProps>`
    margin: 0 0.25rem;
    background: #ffffff;
    color: ${(props) => props.theme.mainText};
    border: 2px solid
        ${(props) => (props.isActive ? `rgba(224, 113, 51, 1)` : `#ececec`)};
    border-radius: 0.3rem;
    padding: 0.5em 0.5em;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: ${(props) =>
        props.isActive
            ? 'rgba(0, 0, 0, 0.1) 0px 1px 1px, rgba(0, 0, 0, 0.23) 0px 2px 4px;'
            : 'none'};

    &:focus {
        outline: none;
    }

    @media ${deviceMin.mobileS} {
        font-size: 0.8rem;
        margin: 0 0.15rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1rem;
        margin: 0 0.25rem;
    }
`;

//Interfaces:

interface StyledProps {
    isActive: boolean;
}

interface IComponentProps {
    handleIsResultsLoaded: (status: boolean) => void;
}

const SortByWheel = ({
    handleIsResultsLoaded,
}: IComponentProps): JSX.Element => {
    //Redux Dispatch Hook:
    const dispatch = useDispatch();

    //Redux Selector Hook:
    const { workoutProgramSort } = useSelector(
        (state: RootStateOrAny) => state.sortOptions
    );

    //Renders an active StatOptionButton if it's in sortOptions:
    const indicateActiveSort = (buttonName: string) => {
        if (buttonName === workoutProgramSort) return true;
        return false;
    };

    //Dispatches a change to the current sort:
    const dispatchSort = (sortOption: string) => {
        if (workoutProgramSort !== sortOption) {
            dispatch(
                updateWorkoutProgramSortOption(
                    handleIsResultsLoaded,
                    sortOption
                )
            );
        }
    };

    return (
        <MainContainer>
            <SortByLabel>Sort By:</SortByLabel>
            <OptionsContainer>
                <StatOptionButton
                    isActive={indicateActiveSort('alphabetical')}
                    onClick={() => dispatchSort('alphabetical')}
                >
                    Alphabetical
                </StatOptionButton>
                <StatOptionButton
                    isActive={indicateActiveSort('newest')}
                    onClick={() => dispatchSort('newest')}
                >
                    Newest
                </StatOptionButton>
                <StatOptionButton
                    isActive={indicateActiveSort('topRated')}
                    onClick={() => dispatchSort('topRated')}
                >
                    Top Rated
                </StatOptionButton>
                <StatOptionButton
                    isActive={indicateActiveSort('mostReviewed')}
                    onClick={() => dispatchSort('mostReviewed')}
                >
                    Most Reviewed
                </StatOptionButton>
            </OptionsContainer>
        </MainContainer>
    );
};

export default SortByWheel;
