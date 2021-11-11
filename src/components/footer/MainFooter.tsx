import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../devices/breakpoints';
import {
    CustomView,
    isDesktop,
    isTablet,
    MobileOnlyView,
} from 'react-device-detect';

//Components:
import GeneralButton from '../general_components/GeneralButton';
import { Collapse } from '@mantine/core';

//Styles:
import styled from 'styled-components';

//Icons:
import { MailSend } from '@styled-icons/boxicons-regular/MailSend';
import { CaretUp } from '@styled-icons/fluentui-system-filled/CaretUp';
import { CaretDown } from '@styled-icons/fluentui-system-filled/CaretDown';

const MailIcon = styled(MailSend)`
    height: 1.3rem;
    width: 1.3rem;
    color: #ffffff;
`;

const CaretUpIcon = styled(CaretUp)`
    height: 1.3rem;
    width: 1.3rem;
    color: #ffffff;
`;

const CaretDownIcon = styled(CaretDown)`
    height: 1.3rem;
    width: 1.3rem;
    color: #ffffff;
`;

const MainContainer = styled.section`
    z-index: 90;
    @media ${deviceMin.mobileS} {
        /* height: 10rem; */
        height: 8rem;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        display: block;
        text-align: center;
        padding: 0.5rem 1rem;
        background: ${(props) => props.theme.lightBackground};
    }

    @media ${deviceMin.tablet} {
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px -3px 8px;
        -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px -3px 8px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px -3px 8px;
    }
`;

const MobileMainContainer = styled.section`
    z-index: 90;
    // max-height: 4rem;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
    text-align: center;
    background: ${(props) => props.theme.lightBackground};
`;

const MobilePaddingSpacers = styled.div`
    padding: 0.1rem 0.5rem;
`;

const MobileFlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const MobileLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MobileFooterTextLinks = styled.a`
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
    font-size: 0.8rem;
    padding: 0.5rem 0;
    background: #ececec;
    width: 100%;
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
        display: flex;
        align-items: center;
        justify-content: center;
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
    const [isOpen, setIsOpen] = useState(false);

    const identifyBrowserOrTablet = () => {
        if (isDesktop || isTablet) return true;
        else return false;
    };

    const returnStateCollapseButtonIcon = () => {
        if (isOpen === true) return <CaretDownIcon />;
        return <CaretUpIcon />;
    };

    return (
        <>
            <CustomView condition={identifyBrowserOrTablet()}>
                <MainContainer>
                    <FooterTextBlock>
                        <FooterText>
                            © 2021 PushPull. All rights reserved.
                        </FooterText>
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
                        <FooterTextLinks
                            href="https://storyset.com"
                            target="_blank"
                        >
                            Illustrations by StorySet
                        </FooterTextLinks>
                        <FooterTextLinks>Add a Review</FooterTextLinks>
                        <FooterTextLinks>About Us</FooterTextLinks>
                        <FooterTextLinks>Contact Us</FooterTextLinks>
                    </FooterBlock>
                </MainContainer>
            </CustomView>
            <MobileOnlyView>
                <MobileMainContainer>
                    <MobileFlexContainer>
                        <FooterTextBlock>
                            <MobilePaddingSpacers>
                                <FooterText>© 2021 PushPull</FooterText>
                            </MobilePaddingSpacers>
                        </FooterTextBlock>
                        <FooterBlock>
                            <MobilePaddingSpacers>
                                <GeneralButton
                                    buttonLabel="Feedback"
                                    width="6rem"
                                    onClick={bugReportHandler}
                                    padding=".2rem .1rem"
                                    buttonIcon={<MailIcon />}
                                    margin=".5rem auto"
                                    fontSize=".8rem"
                                />
                            </MobilePaddingSpacers>
                            <MobilePaddingSpacers>
                                <GeneralButton
                                    buttonLabel="More"
                                    fontSize=".8rem"
                                    padding=".2rem .4rem"
                                    buttonIcon={returnStateCollapseButtonIcon()}
                                    onClick={() => setIsOpen(!isOpen)}
                                    margin=".5rem auto"
                                />
                            </MobilePaddingSpacers>
                        </FooterBlock>
                    </MobileFlexContainer>
                    <Collapse in={isOpen}>
                        <MobileLinkContainer>
                            <MobileFooterTextLinks
                                href="https://storyset.com"
                                target="_blank"
                            >
                                Illustrations by StorySet
                            </MobileFooterTextLinks>
                            <MobileFooterTextLinks>
                                Add a Review
                            </MobileFooterTextLinks>
                            <MobileFooterTextLinks>
                                About Us
                            </MobileFooterTextLinks>
                            <MobileFooterTextLinks>
                                Contact Us
                            </MobileFooterTextLinks>
                        </MobileLinkContainer>
                    </Collapse>
                </MobileMainContainer>
            </MobileOnlyView>
        </>
    );
};

export default MainFooter;
