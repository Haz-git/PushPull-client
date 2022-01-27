import React from 'react';

//Components:
import { SheetTab } from './SheetTab';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    position: fixed;
    bottom: 0;
    background: #d6d6d6;
    width: 100%;
    height: 2.5rem;
    width: 100%;
`;

const SheetContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

//Interfaces:

export const SheetsFooter = () => {
    return (
        <MainContainer>
            <SheetContainer>
                <SheetTab />
                <SheetTab />
                <SheetTab />
                <SheetTab />
            </SheetContainer>
        </MainContainer>
    );
};
