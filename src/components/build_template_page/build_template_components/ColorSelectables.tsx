import * as React from 'react';

//Redux:

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px, rgba(0, 0, 0, 0.23) 0px 2px 4px;
`;

const ColorSwatchContainer = styled.div`
    padding: 0.5rem 0.5rem;
    border-right: 1px solid #d6d6d6;
`;

const ColorSwatch = styled.div`
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 0.3rem;
    background: #ea4cde;
`;

const DescriptionContainer = styled.div``;

export const ColorSelectables = () => {
    return (
        <MainContainer>
            <ColorSwatchContainer>
                <ColorSwatch />
            </ColorSwatchContainer>
            <DescriptionContainer>
                <Text text="test" />
            </DescriptionContainer>
        </MainContainer>
    );
};
