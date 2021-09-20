import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import GeneralButton from '../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';

//Icons:
import { MailSend } from '@styled-icons/boxicons-regular/MailSend';

const MailIcon = styled(MailSend)`
    height: 1.3rem;
    width: 1.3rem;
    color: white;
`;

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
        font-size: ${(props) => props.theme.fontSizes.smp};
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
        font-size: ${(props) => props.theme.fontSizes.smp};
    }
`;

//Interfaces:

interface IComponentProps {
    bugReportHandler: () => void;
}

const MainFooter = ({ bugReportHandler }: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <FooterTextBlock>
                <FooterText>© 2021 PushPull. All rights reserved.</FooterText>
            </FooterTextBlock>
            <FooterBlock>
                <GeneralButton
                    buttonLabel="Feedback"
                    width="7.5rem"
                    onClick={bugReportHandler}
                    padding=".4rem .4rem"
                    buttonIcon={<MailIcon />}
                />
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
