import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props) => props.theme.lightBackground};
    padding: 1rem 1rem;

    @media ${deviceMin.mobileS} {
        display: block;
        text-align: center;
        padding: 1rem 1rem;
    }

    @media ${deviceMin.browserSm} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1rem;
    }
`;

const FooterTextBlock = styled.div`
    @media ${deviceMin.mobileS} {
        margin-bottom: 1rem;
    }

    @media ${deviceMin.browserSm} {
        margin-bottom: 0;
    }
`;

const FooterBlock = styled.div`
    @media ${deviceMin.mobileS} {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media ${deviceMin.browserSm} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1rem;
    }
`;

const FooterText = styled.p`
    color: ${(props) => props.theme.mainText};
    font-weight: 700;

    @media ${deviceMin.mobileS} {
        font-size: 0.8rem;
    }

    @media ${deviceMin.tablet} {
        font-size: ${(props) => props.theme.fontSizes.md};
    }
`;

const FooterTextLinks = styled.a`
    color: ${(props) => props.theme.mainText};
    font-weight: 700;

    @media ${deviceMin.mobileS} {
        font-size: 0.8rem;
        margin: 0 0.2rem;
    }

    @media ${deviceMin.tablet} {
        margin: 0 1rem;
        font-size: ${(props) => props.theme.fontSizes.md};
    }
`;

//Interfaces:

const MainFooter = () => {
    return (
        <MainContainer>
            <FooterTextBlock>
                <FooterText>© 2021 PushPull. All rights reserved.</FooterText>
            </FooterTextBlock>
            <FooterBlock>
                <FooterTextLinks href="https://storyset.com" target="_blank">
                    Illustrations by StorySet
                </FooterTextLinks>
                <FooterTextLinks>Add a Review</FooterTextLinks>
                <FooterTextLinks>About Us</FooterTextLinks>
                <FooterTextLinks>Contact Us</FooterTextLinks>
            </FooterBlock>
        </MainContainer>
    );
};

export default MainFooter;
