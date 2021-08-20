import * as React from 'react';
import { useState } from 'react';

//Components:
import DividerLine from '../../general_components/DividerLine';
import FilterButton from './FilterButton';
import FilterChoice from './FilterChoice';

//Styles:
import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/boxicons-solid/ChevronLeft';

//Icons:

const LeftArrowIcon = styled(ChevronLeft)`
    height: 0.9rem;
    width: 0.9rem;
    margin-right: 0.15rem;
    margin-bottom: 0.0385rem;
    color: ${(props) => props.theme.subText};
`;

const MainContainer = styled.div`
    background: rgba(239, 239, 239, 1);
    text-align: left;
    width: 18rem;
    height: 100%;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    padding: 2rem 2rem;
`;

const FilterText = styled.h2`
    font-size: ${(props) => props.theme.fontSizes.xl};
    color: ${(props) => props.theme.accentColors.orange};
    font-weight: 800;
`;

const ButtonsContainer = styled.div`
    padding: 2rem 1rem;
`;

const ButtonDivider = styled.div`
    height: 0.5rem;
`;

const ReturnButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    color: ${(props) => props.theme.subText};
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    padding: 0.25rem 0.25rem;
    background: inherit;
    border-radius: 0.3rem;
    transition: 0.3s all ease-in-out;
    margin-left: -0.5rem;

    &:hover {
        text-decoration: none;
        outline: none;
        background: #dbdbdb;
    }
`;

//interfaces:

const FilterColumn = () => {
    enum RenderView {
        RENDER_MAIN_FILTER = 'RENDER_MAIN_FILTER',
        RENDER_SELECTION_CATEGORY = 'RENDER_SELECTION_CATEGORY',
        RENDER_SELECTION_EQUIPMENT = 'RENDER_SELECTION_EQUIPMENT',
        RENDER_SELECTION_DIFFICULTY = 'RENDER_SELECTION_DIFFICULTY',
        RENDER_SELECTION_WORKOUTDAYS = 'RENDER_SELECTION_WORKOUTDAYS',
        RENDER_SELECTION_WORKOUTLENGTH = 'RENDER_SELECTION_WORKOUTLENGTH',
    }

    //State management for filter column view -- default it RenderView.RENDER_MAIN_FILTER
    const [renderState, setRenderState] = useState(
        RenderView.RENDER_MAIN_FILTER
    );

    //State manager for the active filter choices per filter button..
    const [activeFilters, setActiveFilters] = useState<any>({
        category: 'any',
        equipment: 'any',
        difficulty: 'any',
        workoutDays: 'any',
        workoutLength: 'any',
    });

    //Filter choice selection handler:
    const handleUserFilterChoiceSelection = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const { name } = e.currentTarget;

        //Extract out the filter name and filter choice
        const targetNum = name.indexOf(':');
        const mainFilterName = name.substr(0, targetNum);
        const filterId = name.substr(targetNum + 1);

        //Change the state if it's a different value? Type conflict during the check...

        if (activeFilters[mainFilterName] !== filterId) {
            setActiveFilters({
                ...activeFilters,
                [mainFilterName]: filterId,
            });
        }
    };

    const removeUserFilterChoiceSelection = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const { name } = e.currentTarget;

        if (activeFilters[name] !== 'any') {
            setActiveFilters({
                ...activeFilters,
                [name]: 'any',
            });
        }
    };

    const setActiveStateForFilterChoice = (
        filterOption: string,
        filterChoice: string
    ) => {
        //Checks the main state, and returns a boolean if the current filter choice is selected to render active state.
        if (activeFilters[filterOption] === filterChoice) return true;
        else return false;
    };

    const setCurrentSelectionForFilterButton = (filterOption: string) => {
        return activeFilters[filterOption];
    };

    const renderFilterView = (view: RenderView) => {
        if (view) {
            switch (view) {
                case RenderView.RENDER_MAIN_FILTER:
                    return (
                        <MainContainer>
                            <TitleContainer>
                                <FilterText>Filter By</FilterText>
                            </TitleContainer>
                            <DividerLine border="1px solid #e5e5e5" />
                            <ButtonsContainer>
                                <FilterButton
                                    name="category"
                                    filterLabel="Category"
                                    onClick={() =>
                                        setRenderState(
                                            RenderView.RENDER_SELECTION_CATEGORY
                                        )
                                    }
                                    currentSelection={setCurrentSelectionForFilterButton(
                                        'category'
                                    )}
                                    onFilterRemoval={
                                        removeUserFilterChoiceSelection
                                    }
                                />
                                <ButtonDivider />
                                <FilterButton
                                    name="equipment"
                                    filterLabel="Equipment"
                                />
                                <ButtonDivider />
                                <FilterButton
                                    name="difficulty"
                                    filterLabel="Difficulty"
                                />
                                <ButtonDivider />
                                <FilterButton
                                    name="workoutDays"
                                    filterLabel="Workout Days"
                                />
                                <ButtonDivider />
                                <FilterButton
                                    name="workoutLength"
                                    filterLabel="Workout Length"
                                />
                            </ButtonsContainer>
                        </MainContainer>
                    );
                case RenderView.RENDER_SELECTION_CATEGORY:
                    return (
                        <MainContainer>
                            <TitleContainer>
                                <ReturnButton
                                    onClick={() =>
                                        setRenderState(
                                            RenderView.RENDER_MAIN_FILTER
                                        )
                                    }
                                >
                                    <LeftArrowIcon />
                                    Filters
                                </ReturnButton>
                                <FilterText>Category</FilterText>
                            </TitleContainer>
                            <DividerLine border="1px solid #e5e5e5" />
                            <ButtonsContainer>
                                <FilterChoice
                                    name="category:any"
                                    choiceLabel="Any Category"
                                    isActive={setActiveStateForFilterChoice(
                                        'category',
                                        'any'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="category:weightlifting"
                                    choiceLabel="Weightlifting"
                                    isActive={setActiveStateForFilterChoice(
                                        'category',
                                        'weightlifting'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="category:powerlifting"
                                    choiceLabel="Powerlifting"
                                    isActive={setActiveStateForFilterChoice(
                                        'category',
                                        'powerlifting'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="category:bodybuilding"
                                    choiceLabel="Bodybuilding"
                                    isActive={setActiveStateForFilterChoice(
                                        'category',
                                        'bodybuilding'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="category:crossfit"
                                    choiceLabel="Crossfit"
                                    isActive={setActiveStateForFilterChoice(
                                        'category',
                                        'crossfit'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="category:aerobics"
                                    choiceLabel="Aerobics"
                                    isActive={setActiveStateForFilterChoice(
                                        'category',
                                        'aerobics'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                            </ButtonsContainer>
                        </MainContainer>
                    );
            }
        }
    };

    return <>{renderFilterView(renderState)}</>;
};

export default FilterColumn;
