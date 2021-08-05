import React from 'react';
import styled from 'styled-components';

//Styles:
const MainContainer = styled.div``;

const MainTextLineOne = styled.h1`
    color: ${(props) => props.theme.mainText};
    text-shadow: ${(props) => props.theme.textShadows.sm};
    font-size: 6rem;
    padding-right: 2rem;
`;

const MainTextLineTwo = styled.h1`
    color: ${(props) => props.theme.mainText};
    text-shadow: ${(props) => props.theme.textShadows.sm};
    font-size: 6rem;
    padding-left: 8rem;
`;

const BackdropText = () => {
    return (
        <MainContainer>
            <MainTextLineOne>Get Ready</MainTextLineOne>
            <MainTextLineTwo>to Get Fit.</MainTextLineTwo>
        </MainContainer>
    );
};

export default BackdropText;
