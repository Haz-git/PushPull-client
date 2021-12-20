import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Components:
import { ReactComponent as DarkLogoSVG } from '../../../assets/dark_logo.svg';
import BlocksContainer from './BlocksContainer';
import { Accordion } from '@mantine/core';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    background: #2c2c2c;
    position: fixed;
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

const AccordionContainer = styled.div``;

//Interfaces:

const Toolbar = () => {
    return (
        <MainContainer>
            <LogoContainer>
                <DarkLogoSVG />
            </LogoContainer>
            <AccordionContainer>
                <Accordion iconPosition="right" multiple>
                    <Accordion.Item label="Blocks">
                        Colors, fonts, shadows and many other parts are
                        customizable to fit your design needs
                    </Accordion.Item>
                    <Accordion.Item label="Favorited blocks">
                        Configure components appearance and behavior with vast
                        amount of settings or overwrite any part of component
                        styles
                    </Accordion.Item>
                </Accordion>
            </AccordionContainer>
        </MainContainer>
    );
};

export default Toolbar;
