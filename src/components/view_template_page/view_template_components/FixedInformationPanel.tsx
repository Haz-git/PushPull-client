import * as React from 'react';

//Components:
import { LegendPanel } from './LegendPanel';
import { InputPanel } from './InputPanel';

//Styles:
import styled from 'styled-components';

//Interfaces:

export const FixedInformationPanel = () => {
    return (
        <div>
            <InputPanel />
            <LegendPanel />
        </div>
    );
};
