import React from 'react';

//Components:
import { deviceMin } from '../../../devices/breakpoints';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div``;

const MainTextLineOne = styled.h1`
    color: ${(props) => props.theme.mainText};
    text-shadow: ${(props) => props.theme.textShadows.sm};
    font-size: 6rem;
    text-align: center;
    padding-right: 4rem;

    @media ${deviceMin.mobileS} {
        font-size: 3rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 4rem;
    }

    @media ${deviceMin.laptopHalf} {
        font-size: 3rem;
    }

    @media ${deviceMin.laptop} {
        font-size: 4rem;
    }

    @media ${deviceMin.laptopL} {
        font-size: 6rem;
    }
`;

const MainTextLineTwo = styled.h1`
    color: ${(props) => props.theme.mainText};
    text-shadow: ${(props) => props.theme.textShadows.sm};
    font-size: 6rem;
    text-align: center;
    padding-left: 4rem;

    @media ${deviceMin.mobileS} {
        font-size: 3rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 4rem;
    }

    @media ${deviceMin.laptopHalf} {
        font-size: 3rem;
    }

    @media ${deviceMin.laptop} {
        font-size: 4rem;
    }

    @media ${deviceMin.laptopL} {
        font-size: 6rem;
    }
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
