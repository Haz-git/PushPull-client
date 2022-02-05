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
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px, rgba(0, 0, 0, 0.23) 0px 2px 4px;
    margin-bottom: 0.5rem;
`;

const ColorSwatchContainer = styled.div`
    height: 100%;
    padding: 0.5rem 0.5rem;
`;

const ColorSwatch = styled.div`
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 0.3rem;
    background: #ea4cde;
`;

const DescriptionContainer = styled.div`
    max-height: 5rem;
    border-left: 1px solid #d6d6d6;
    padding: 0.5rem 0.5rem;
    overflow-y: scroll;
`;

export const ColorSelectables = () => {
    return (
        <MainContainer>
            <ColorSwatchContainer>
                <ColorSwatch />
            </ColorSwatchContainer>
            <DescriptionContainer>
                <Text text="Test long description Test long description Test long description Test long description Test long " />
            </DescriptionContainer>
        </MainContainer>
    );
};
