import * as React from 'react';

//Components:
import { LegendPanel } from './LegendPanel';
import { InputPanel } from './InputPanel';
import DividerLine from '../../general_components/DividerLine';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    background: #2c2c2c;
    height: 100%;
    padding: 1rem 1rem;
`;

//Interfaces:

export const FixedInformationPanel = () => {
    return (
        <MainContainer>
            <InputPanel />
            <DividerLine border="none" margin="1rem" />
            <LegendPanel />
        </MainContainer>
    );
};
