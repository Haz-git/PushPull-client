import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

import { MainContainer } from './LegendPanel';

//Interfaces:

export const InputPanel = () => {
    return (
        <MainContainer>
            <Text text="Inputs" />
        </MainContainer>
    );
};
