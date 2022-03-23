import * as React from 'react';

//Components:
import { LegendPanel } from './LegendPanel';
import { InputPanel } from './InputPanel';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    background: #2c2c2c;
    height: 100%;
`;

//Interfaces:

export const FixedInformationPanel = () => {
    return (
        <MainContainer>
            <InputPanel />
            <LegendPanel />
        </MainContainer>
    );
};
