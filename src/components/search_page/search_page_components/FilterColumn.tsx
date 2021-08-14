import * as React from 'react';

//Components:
import DividerLine from '../../general_components/DividerLine';
import FilterButton from './FilterButton';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    background: rgba(239, 239, 239, 1);
    text-align: left;
    width: 15rem;
`;

const FilterText = styled.h2`
    padding: 2rem 2rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.accentColors.orange};
    font-weight: 800;
`;

const ButtonsContainer = styled.div`
    padding: 2rem 1rem;
`;

const ButtonDivider = styled.div`
    height: 0.5rem;
`;

//interfaces:

const FilterColumn = () => {
    return (
        <MainContainer>
            <FilterText>Filter By</FilterText>
            <DividerLine border="1px solid #e5e5e5" />
            <ButtonsContainer>
                <FilterButton filterLabel="Category" />
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
};

export default FilterColumn;
