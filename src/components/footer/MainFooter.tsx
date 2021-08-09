import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #dddcdc;
    padding: 2rem 1rem;
`;

const FooterBlock = styled.div``;

const FooterText = styled.p`
    color: ${(props) => props.theme.mainText};
    font-size: ${(props) => props.theme.md};
    font-weight: 700;
`;

const FooterTextLinks = styled.a`
    color: ${(props) => props.theme.mainText};
    margin: 0 1rem;
    font-size: ${(props) => props.theme.md};
    font-weight: 700;
`;

//Interfaces:

const MainFooter = () => {
    return (
        <MainContainer>
            <FooterBlock>
                <FooterText>© 2021 PushPull. All rights reserved.</FooterText>
            </FooterBlock>
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
