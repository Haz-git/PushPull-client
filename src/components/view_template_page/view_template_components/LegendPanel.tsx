import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

export const MainContainer = styled.div`
    background: #ffffff;
    padding: 1rem 1rem;
    border-radius: 0.3rem;
`;

//Interfaces:

export const LegendPanel = () => {
    return (
        <MainContainer>
            <Text text="Legend" />
        </MainContainer>
    );
};
