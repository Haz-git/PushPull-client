import * as React from 'react';
import { useState } from 'react';

//Components:
import DividerLine from '../../general_components/DividerLine';
import FilterButton from './FilterButton';

//Styles:
import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/boxicons-solid/ChevronLeft';

//Icons:

const LeftArrowIcon = styled(ChevronLeft)`
    height: 0.9rem;
    width: 0.9rem;
    margin-right: 0.15rem;
    margin-bottom: 0.035rem;
    color: ${(props) => props.theme.subText};
`;

const MainContainer = styled.div`
    background: rgba(239, 239, 239, 1);
    text-align: left;
    width: 15rem;
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

    const [renderState, setRenderState] = useState(
        RenderView.RENDER_MAIN_FILTER
    );

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
                                    filterLabel="Category"
                                    onClick={() =>
                                        setRenderState(
                                            RenderView.RENDER_SELECTION_CATEGORY
                                        )
                                    }
                                />
                                <ButtonDivider />
                                <FilterButton filterLabel="Equipment" />
                                <ButtonDivider />
                                <FilterButton filterLabel="Difficulty" />
                                <ButtonDivider />
                                <FilterButton filterLabel="Workout Days" />
                                <ButtonDivider />
                                <FilterButton filterLabel="Workout Length" />
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
                                <FilterButton filterLabel="Weightlifting" />
                                <ButtonDivider />
                                <FilterButton filterLabel="Powerlifting" />
                                <ButtonDivider />
                                <FilterButton filterLabel="Bodybuilding" />
                                <ButtonDivider />
                                <FilterButton filterLabel="Crossfit" />
                                <ButtonDivider />
                                <FilterButton filterLabel="Aerobics" />
                            </ButtonsContainer>
                        </MainContainer>
                    );
            }
        }
    };

    return <>{renderFilterView(renderState)}</>;
};

export default FilterColumn;
