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
    resetAllFilters,
} from '../../../redux/filterOptions/filterActions';
import { getWorkoutPrograms } from '../../../redux/workoutPrograms/workoutProgramActions';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import DividerLine from '../../general_components/DividerLine';
import FilterButton from './FilterButton';
import FilterChoice from './FilterChoice';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

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

export const MainContainer = styled.section<IMainContainer>`
    top: 3.75rem;
    position: -webkit-sticky;
    position: sticky;
    background: rgba(239, 239, 239, 1);
    text-align: left;
    width: 100%;

    @media ${deviceMin.mobileS} {
        z-index: -1;
        margin-top: -4rem;
        height: 100%;
    }

    @media ${deviceMin.tabletp} {
        border-right: 2px solid #e5e5e5;
        height: ${(props) => `${props.height - 115}px`};
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

const OtherButtonContainer = styled.div`
    position: absolute;
    padding: 0rem 1rem;
    width: 100%;

    @media ${deviceMin.mobileS} {
        bottom: 0rem;
    }

    @media ${deviceMin.mobileM} {
        bottom: 1rem;
    }
`;

//interfaces:

interface IMainContainer {
    height: number;
}

interface IFilterColumn {
    isResultsLoaded: boolean;
    handleIsResultsLoaded: (status: boolean) => void;
    handleDrawerState: (status: boolean) => void;
    mobileFilterColumnCloseFunc?: (status: boolean) => void;
}

const FilterColumn = ({
    isResultsLoaded,
    handleIsResultsLoaded,
    handleDrawerState,
    mobileFilterColumnCloseFunc,
}: IFilterColumn): JSX.Element => {
    enum RenderView {
        RENDER_MAIN_FILTER = 'RENDER_MAIN_FILTER',
        RENDER_SELECTION_CATEGORY = 'RENDER_SELECTION_CATEGORY',
        RENDER_SELECTION_EQUIPMENT = 'RENDER_SELECTION_EQUIPMENT',
        RENDER_SELECTION_DIFFICULTY = 'RENDER_SELECTION_DIFFICULTY',
        RENDER_SELECTION_WORKOUTSCHEDULE = 'RENDER_SELECTION_WORKOUTSCHEDULE',
        RENDER_SELECTION_WORKOUTLENGTH = 'RENDER_SELECTION_WORKOUTLENGTH',
    }

    //Height window dimension:
    const { height, width } = useWindowDimensions();

    //Redux dispatch hook:
    const dispatch = useDispatch();

    const filters = useSelector((state: RootStateOrAny) => state.filters);

    //State management for filter column view -- default it RenderView.RENDER_MAIN_FILTER
    const [renderState, setRenderState] = useState(
        RenderView.RENDER_MAIN_FILTER
    );

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

        if (filters[mainFilterName] !== filterId) {
            handleIsResultsLoaded(false);
            //dispatch necessary changes to store:
            switch (mainFilterName) {
                case 'category':
                    dispatch(updateCategory(filterId));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
                case 'equipment':
                    dispatch(updateEquipment(filterId));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
                case 'difficulty':
                    dispatch(updateDifficulty(filterId));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
                case 'workoutSchedule':
                    dispatch(updateWorkoutSchedule(filterId));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
                case 'workoutLength':
                    dispatch(updateWorkoutLength(filterId));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
            }
        }
    };

    const removeUserFilterChoiceSelection = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const { name } = e.currentTarget;

        if (filters[name] !== 'any') {
            handleIsResultsLoaded(false);
            //dispatch changes to reset a filter in store:
            switch (name) {
                case 'category':
                    dispatch(updateCategory('any'));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
                case 'equipment':
                    dispatch(updateEquipment('any'));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
                case 'difficulty':
                    dispatch(updateDifficulty('any'));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
                case 'workoutSchedule':
                    dispatch(updateWorkoutSchedule('any'));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
                case 'workoutLength':
                    dispatch(updateWorkoutLength('any'));
                    dispatch(getWorkoutPrograms(handleIsResultsLoaded, 1));
                    break;
            }
        }
    };

    const setActiveStateForFilterChoice = (
        filterOption: string,
        filterChoice: string
    ) => {
        //Checks the main state, and returns a boolean if the current filter choice is selected to render active state.
        if (filters[filterOption] === filterChoice) return true;
        else return false;
    };

    const setCurrentSelectionForFilterButton = (filterOption: string) => {
        return filters[filterOption];
    };

    const renderFilterView = (view: RenderView) => {
        if (view) {
            switch (view) {
                case RenderView.RENDER_MAIN_FILTER:
                    return (
                        <MainContainer height={height}>
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
                            <OtherButtonContainer>
                                <GeneralButton
                                    buttonLabel="Reset All Filters"
                                    padding={
                                        width <= 320
                                            ? '.4rem .4rem'
                                            : '.8rem 1rem'
                                    }
                                    margin=".75rem 0"
                                    onClick={() => {
                                        handleIsResultsLoaded(false);
                                        dispatch(
                                            resetAllFilters(
                                                handleIsResultsLoaded
                                            )
                                        );
                                    }}
                                />
                                <GeneralButton
                                    buttonLabel="Suggest New Program"
                                    padding={
                                        width <= 320
                                            ? '.4rem .4rem'
                                            : '.8rem 1rem'
                                    }
                                    onClick={() => {
                                        if (mobileFilterColumnCloseFunc)
                                            mobileFilterColumnCloseFunc(false);
                                        handleDrawerState(true);
                                    }}
                                />
                            </OtherButtonContainer>
                        </MainContainer>
                    );
                case RenderView.RENDER_SELECTION_CATEGORY:
                    return (
                        <MainContainer height={height}>
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
                            </ButtonsContainer>
                        </MainContainer>
                    );
                case RenderView.RENDER_SELECTION_EQUIPMENT:
                    return (
                        <MainContainer height={height}>
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
                        <MainContainer height={height}>
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
                        <MainContainer height={height}>
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
                        <MainContainer height={height}>
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
