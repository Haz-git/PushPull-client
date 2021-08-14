import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div``;

const SortByLabel = styled.h2`
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 600;
    color: ${(props) => props.theme.subText};
`;

//Interfaces:

const SortByWheel = () => {
    return (
        <MainContainer>
            <SortByLabel>Sort By:</SortByLabel>
        </MainContainer>
    );
};

export default SortByWheel;
