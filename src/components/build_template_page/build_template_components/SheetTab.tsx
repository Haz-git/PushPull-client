import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.button`
    border: none;
    text-decoration: none;
    background: #ececec;
    width: fit-content;
    height: 100%;
    padding: 0rem 1rem;
    outline: 1px solid #d6d6d6;
    margin-top: 1px;
    margin-left: 1px;
`;

//Interfaces:

export const SheetTab = () => {
    return <MainContainer>SHEET</MainContainer>;
};
