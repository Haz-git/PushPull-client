import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import SearchBar from '../../general_components/SearchBar';
import SortByWheel from './SortByWheel';
import WorkoutProgramComponent from './WorkoutProgramComponent';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import MobileFilterDrawerButton from './MobileFilterDrawerButton';
import MobileFilterDrawer from './MobileFilterDrawer';
import MobileFilterPill from './MobileFilterPill';

//Styles:
import styled from 'styled-components';

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

//Interfaces:

interface StyledProps {
    containerHeight: number;
}

const SearchResultsSection = () => {
    const { height } = useWindowDimensions();
    const [renderMobileDrawer, setRenderMobileDrawer] = useState(false);

    //toggles mobile drawer:
    const toggleMobileDrawer = (status: boolean) => {
        setRenderMobileDrawer(status);
    };

    //Redux Selector hook:
    const { category, equipment, difficulty, workoutSchedule, workoutLength } =
        useSelector((state: RootStateOrAny) => state.filters);

    //Pill render function:
    const renderFilterPills = () => {
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
                        object.val.charAt(0).toUpperCase() + object.val.slice(1)
                    }
                    filterType={object.type}
                    key={object.type}
                />
            ));
    };

    return (
        <>
            <MobileFilterDrawer
                isOpen={renderMobileDrawer}
                closeFunc={toggleMobileDrawer}
            />
            <MainContainer>
                <SearchBar placeholderText="Search again..." />
                <SearchResultsTextContainer>
                    <SearchResultsText>
                        (10) Search Results for 'barbell'
                    </SearchResultsText>
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
                        <WorkoutProgramComponent />
                        <WorkoutProgramComponent />
                        <WorkoutProgramComponent />
                        <WorkoutProgramComponent />
                    </WorkoutProgramContainer>
                </SearchResultsTextContainer>
            </MainContainer>
        </>
    );
};

export default SearchResultsSection;
