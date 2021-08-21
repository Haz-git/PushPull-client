import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
    updateCategory,
    updateEquipment,
    updateDifficulty,
    updateWorkoutSchedule,
    updateWorkoutLength,
} from '../../../redux/filterOptions/filterActions';

//Components:
import DividerLine from '../../general_components/DividerLine';
import FilterButton from './FilterButton';
import FilterChoice from './FilterChoice';

//Styles:
import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/boxicons-solid/ChevronLeft';

//Icons:

export const LeftArrowIcon = styled(ChevronLeft)`
    height: 0.9rem;
    width: 0.9rem;
    margin-right: 0.15rem;
    margin-bottom: 0.0385rem;
    color: ${(props) => props.theme.subText};
`;

export const MainContainer = styled.div`
    background: rgba(239, 239, 239, 1);
    text-align: left;
    width: 100%;

    @media ${deviceMin.tabletp} {
        height: 100%;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    padding: 2rem 2rem;

    @media ${deviceMin.mobileS} {
        padding: 1rem 1rem;
    }

    @media ${deviceMin.tabletp} {
        padding: 2rem 2rem;
    }
`;

export const FilterText = styled.h2`
    font-size: ${(props) => props.theme.fontSizes.xl};
    color: ${(props) => props.theme.accentColors.orange};
    font-weight: 800;
`;

export const ButtonsContainer = styled.div`
    padding: 2rem 1rem;
`;

export const ButtonDivider = styled.div`
    height: 0.5rem;
`;

export const ReturnButton = styled.button`
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
        RENDER_SELECTION_WORKOUTSCHEDULE = 'RENDER_SELECTION_WORKOUTSCHEDULE',
        RENDER_SELECTION_WORKOUTLENGTH = 'RENDER_SELECTION_WORKOUTLENGTH',
    }

    //Redux dispatch hook:
    const dispatch = useDispatch();

    //Redux Selector hook:
    const { category, equipment, difficulty, workoutSchedule, workoutLength } =
        useSelector((state: RootStateOrAny) => state.filters);

    //State management for filter column view -- default it RenderView.RENDER_MAIN_FILTER
    const [renderState, setRenderState] = useState(
        RenderView.RENDER_MAIN_FILTER
    );

    //State manager for the active filter choices per filter button..
    const [activeFilters, setActiveFilters] = useState<any>({
        category: category,
        equipment: equipment,
        difficulty: difficulty,
        workoutSchedule: workoutSchedule,
        workoutLength: workoutLength,
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

            //dispatch necessary changes to store:
            switch (mainFilterName) {
                case 'category':
                    dispatch(updateCategory(filterId));
                    break;
                case 'equipment':
                    dispatch(updateEquipment(filterId));
                    break;
                case 'difficulty':
                    dispatch(updateDifficulty(filterId));
                    break;
                case 'workoutSchedule':
                    dispatch(updateWorkoutSchedule(filterId));
                    break;
                case 'workoutLength':
                    dispatch(updateWorkoutLength(filterId));
                    break;
            }
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
                                    onClick={() =>
                                        setRenderState(
                                            RenderView.RENDER_SELECTION_EQUIPMENT
                                        )
                                    }
                                    currentSelection={setCurrentSelectionForFilterButton(
                                        'equipment'
                                    )}
                                    onFilterRemoval={
                                        removeUserFilterChoiceSelection
                                    }
                                />
                                <ButtonDivider />
                                <FilterButton
                                    name="difficulty"
                                    filterLabel="Difficulty"
                                    onClick={() =>
                                        setRenderState(
                                            RenderView.RENDER_SELECTION_DIFFICULTY
                                        )
                                    }
                                    currentSelection={setCurrentSelectionForFilterButton(
                                        'difficulty'
                                    )}
                                    onFilterRemoval={
                                        removeUserFilterChoiceSelection
                                    }
                                />
                                <ButtonDivider />
                                <FilterButton
                                    name="workoutSchedule"
                                    filterLabel="Workout Schedule"
                                    onClick={() =>
                                        setRenderState(
                                            RenderView.RENDER_SELECTION_WORKOUTSCHEDULE
                                        )
                                    }
                                    currentSelection={setCurrentSelectionForFilterButton(
                                        'workoutSchedule'
                                    )}
                                    onFilterRemoval={
                                        removeUserFilterChoiceSelection
                                    }
                                />
                                <ButtonDivider />
                                <FilterButton
                                    name="workoutLength"
                                    filterLabel="Workout Length"
                                    onClick={() =>
                                        setRenderState(
                                            RenderView.RENDER_SELECTION_WORKOUTLENGTH
                                        )
                                    }
                                    currentSelection={setCurrentSelectionForFilterButton(
                                        'workoutLength'
                                    )}
                                    onFilterRemoval={
                                        removeUserFilterChoiceSelection
                                    }
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
                case RenderView.RENDER_SELECTION_EQUIPMENT:
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
                                <FilterText>Equipment</FilterText>
                            </TitleContainer>
                            <DividerLine border="1px solid #e5e5e5" />
                            <ButtonsContainer>
                                <FilterChoice
                                    name="equipment:any"
                                    choiceLabel="Any Equipment"
                                    isActive={setActiveStateForFilterChoice(
                                        'equipment',
                                        'any'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="equipment:no Equipment"
                                    choiceLabel="No Equipment"
                                    isActive={setActiveStateForFilterChoice(
                                        'equipment',
                                        'no Equipment'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="equipment:gym Required"
                                    choiceLabel="Gym Required"
                                    isActive={setActiveStateForFilterChoice(
                                        'equipment',
                                        'gym Required'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="equipment:outdoors"
                                    choiceLabel="Outdoors"
                                    isActive={setActiveStateForFilterChoice(
                                        'equipment',
                                        'outdoors'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                            </ButtonsContainer>
                        </MainContainer>
                    );
                case RenderView.RENDER_SELECTION_DIFFICULTY:
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
                                <FilterText>Difficulty</FilterText>
                            </TitleContainer>
                            <DividerLine border="1px solid #e5e5e5" />
                            <ButtonsContainer>
                                <FilterChoice
                                    name="difficulty:any"
                                    choiceLabel="Any Difficulty"
                                    isActive={setActiveStateForFilterChoice(
                                        'difficulty',
                                        'any'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="difficulty:beginner"
                                    choiceLabel="Beginner"
                                    isActive={setActiveStateForFilterChoice(
                                        'difficulty',
                                        'beginner'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="difficulty:intermediate"
                                    choiceLabel="Intermediate"
                                    isActive={setActiveStateForFilterChoice(
                                        'difficulty',
                                        'intermediate'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="difficulty:advanced"
                                    choiceLabel="Advanced"
                                    isActive={setActiveStateForFilterChoice(
                                        'difficulty',
                                        'advanced'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                            </ButtonsContainer>
                        </MainContainer>
                    );
                case RenderView.RENDER_SELECTION_WORKOUTSCHEDULE:
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
                                <FilterText>Schedule</FilterText>
                            </TitleContainer>
                            <DividerLine border="1px solid #e5e5e5" />
                            <ButtonsContainer>
                                <FilterChoice
                                    name="workoutSchedule:any"
                                    choiceLabel="Any # of Days"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutSchedule',
                                        'any'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="workoutSchedule:1-2 Days/Week"
                                    choiceLabel="1-2 Days/Week"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutSchedule',
                                        '1-2 Days/Week'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="workoutSchedule:3-4 Days/Week"
                                    choiceLabel="3-4 Days/Week"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutSchedule',
                                        '3-4 Days/Week'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="workoutSchedule:5-7 Days/Week"
                                    choiceLabel="5-7 Days/Week"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutSchedule',
                                        '5-7 Days/Week'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                            </ButtonsContainer>
                        </MainContainer>
                    );
                case RenderView.RENDER_SELECTION_WORKOUTLENGTH:
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
                                <FilterText>Time Length</FilterText>
                            </TitleContainer>
                            <DividerLine border="1px solid #e5e5e5" />
                            <ButtonsContainer>
                                <FilterChoice
                                    name="workoutLength:any"
                                    choiceLabel="Any Amount of Time"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutLength',
                                        'any'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="workoutLength:< 45 Minutes"
                                    choiceLabel="< 45 Minutes"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutLength',
                                        '< 45 Minutes'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="workoutLength:1-2 Hours"
                                    choiceLabel="1-2 Hours"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutLength',
                                        '1-2 Hours'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="workoutLength:2-3 Hours"
                                    choiceLabel="2-3 Hours"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutLength',
                                        '2-3 Hours'
                                    )}
                                    onClick={handleUserFilterChoiceSelection}
                                />
                                <ButtonDivider />
                                <FilterChoice
                                    name="workoutLength:3+ Hours"
                                    choiceLabel="3+ Hours"
                                    isActive={setActiveStateForFilterChoice(
                                        'workoutLength',
                                        '3+ Hours'
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
