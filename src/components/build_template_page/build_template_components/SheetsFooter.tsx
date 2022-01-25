import React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    position: fixed;
    bottom: 0;
    background: salmon;
    width: 100%;
    border: 1px solid black;
    height: 57px;
`;

//Interfaces:

export const SheetsFooter = () => {
    return <MainContainer>This should contain SHEETS</MainContainer>;
};
