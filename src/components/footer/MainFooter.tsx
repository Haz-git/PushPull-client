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
    @media ${deviceMin.mobileS} {
        /* height: 10rem; */
        display: block;
        text-align: center;
        padding: 0.5rem 1rem;
        background: ${(props) => props.theme.lightBackground};
    }

    @media ${deviceMin.tablet} {
        /* height: 4rem; */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const FooterTextBlock = styled.div`
    @media ${deviceMin.mobileS} {
        margin: 1rem 0;
    }

    @media ${deviceMin.laptopHalf} {
        margin: 0;
    }
`;

const FooterBlock = styled.div`
    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.mobileM} {
        display: block;
    }

    @media ${deviceMin.tabletp} {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        <MainContainer className="main-footer">
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
                    margin=".5rem auto"
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
