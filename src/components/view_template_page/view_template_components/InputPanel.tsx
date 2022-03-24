import * as React from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

import { MainContainer, HeaderContainer, BodyContainer } from './LegendPanel';

//Interfaces:

export const InputPanel = () => {
    return (
        <MainContainer>
            <HeaderContainer>
                <Text
                    text="Viewer Inputs"
                    textColor="#ffffff"
                    textShadow="#000000 0px 0px 2px"
                    fontSize="1.15rem"
                />
            </HeaderContainer>
            <BodyContainer>Under construction...</BodyContainer>
        </MainContainer>
    );
};
