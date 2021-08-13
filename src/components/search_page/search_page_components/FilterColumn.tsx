import * as React from 'react';

//Components:
import DividerLine from '../../general_components/DividerLine';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    background: rgba(239, 239, 239, 1);
    text-align: left;
`;

const FilterText = styled.h2`
    padding: 2rem 1rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.accentColors.orange};
    font-weight: 800;
`;

//interfaces:

const FilterColumn = () => {
    return (
        <MainContainer>
            <FilterText>Filter By</FilterText>
            <DividerLine border="1px solid rgba(244,244,244, 1)" />
        </MainContainer>
    );
};

export default FilterColumn;
