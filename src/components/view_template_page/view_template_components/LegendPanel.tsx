import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

export const MainContainer = styled.div`
    background: transparent;
    border-radius: 0.2rem;
`;

export const HeaderContainer = styled.div`
    background: #7678ed;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #2c2c2c;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
`;

export const BodyContainer = styled.div`
    background: #ffffff;
    padding: 0.5rem 1rem;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
`;

//Interfaces:

export const LegendPanel = () => {
    return (
        <MainContainer>
            <HeaderContainer>
                <Text
                    text="Color Legend"
                    textColor="#ffffff"
                    textShadow="#000000 0px 0px 2px"
                />
            </HeaderContainer>
            <BodyContainer>Under construction...</BodyContainer>
        </MainContainer>
    );
};
