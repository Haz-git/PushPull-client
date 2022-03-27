import * as React from 'react';

//Components:
import { LegendPanel } from './LegendPanel';
import { InputPanel } from './InputPanel';
import DividerLine from '../../general_components/DividerLine';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 0.5rem;
    background: #2c2c2c;
    height: 100%;
    padding: 1rem 1rem;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px;
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
