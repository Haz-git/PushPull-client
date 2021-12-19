import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Components:
import { ReactComponent as DarkLogoSVG } from '../../../assets/dark_logo.svg';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    background: #2c2c2c;
    position: fixed;
    border-right: 1px solid #d6d6d6;
    height: 100%;
    text-align: left;
    overflow-y: scroll;
    z-index: 80;

    @media ${deviceMin.mobileS} {
        width: 11rem;
        max-width: 11rem;
    }

    @media ${deviceMin.mobileM} {
        width: 12rem;
        max-width: 12rem;
    }

    @media ${deviceMin.mobileL} {
        width: 13rem;
        max-width: 13rem;
    }

    @media ${deviceMin.browserSm} {
        width: 14rem;
        max-width: 14rem;
    }

    @media ${deviceMin.laptop} {
        width: 15rem;
        max-width: 15rem;
    }

    @media ${deviceMin.laptopL} {
        width: 16rem;
        max-width: 16rem;
    }
`;

const LogoContainer = styled.div`
    position: relative;
    border-bottom: 1px solid #525252;

    @media ${deviceMin.mobileS} {
        height: 2rem;
        width: 10rem;
    }

    @media ${deviceMin.mobileM} {
        height: 2.5rem;
        width: 10rem;
    }

    @media ${deviceMin.mobileL} {
        height: 2.5rem;
        width: 10rem;
    }

    @media ${deviceMin.browserSm} {
        padding: 1rem 1rem;
        height: 4.5rem;
        width: 100%;
    }
`;

//Interfaces:

const Toolbar = () => {
    return (
        <MainContainer>
            <LogoContainer>
                <DarkLogoSVG />
            </LogoContainer>
        </MainContainer>
    );
};

export default Toolbar;
