import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.button`
    border: none;
    text-decoration: none;
    background: #2c2c2c;
    width: fit-content;
    height: 100%;
`;

//Interfaces:

export const SheetTab = () => {
    return <MainContainer>SINGLE SHEET</MainContainer>;
};
