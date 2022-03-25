import * as React from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import Text from '../../general_components/Text';
import { InputList } from './InputList';

//Styles:
import styled from 'styled-components';

import { MainContainer, HeaderContainer, BodyContainer } from './LegendPanel';

//Interfaces:

export const InputPanel = () => {
    const inputArray = useSelector(
        (state: RootStateOrAny) =>
            state?.viewTemplate?.savedTemplate?.templateUserInputs
    );

    const hasInputArray = (): boolean => {
        return inputArray?.length !== 0;
    };
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
            <BodyContainer>
                <InputList
                    shouldDisplayInputs={hasInputArray()}
                    inputArray={inputArray}
                />
            </BodyContainer>
        </MainContainer>
    );
};
