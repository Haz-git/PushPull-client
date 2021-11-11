import * as React from 'react';
import { MobileView, BrowserView } from 'react-device-detect';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import { ReactComponent as LostSVG } from '../../assets/lost_animation.svg';
import GeneralButton from '../general_components/GeneralButton';
import historyObject from '../../utils/historyObject';

//Styles:
import styled from 'styled-components';

export const MainContainer = styled.section`
    @media ${deviceMin.mobileS} {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
        align-content: center;
    }

    @media ${deviceMin.laptopM} {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: 40% 60%;
        margin: 0 auto;
        max-width: 100rem;
    }
`;

export const MobileMainContainer = styled.section`
    display: block;
    text-align: center;
`;

export const SVGContainer = styled.div`
    height: 100%;
    width: 100%;
    z-index: 1;

    @media ${deviceMin.laptopM} {
        padding-right: 10rem;
    }
`;

export const MobileSVGContainer = styled.div`
    z-index: 1;
    margin: 0 auto;
    @media ${deviceMin.tablet} {
        height: 80%;
        width: 80%;
    }
`;

export const TextContainer = styled.div`
    @media ${deviceMin.laptopM} {
        padding-left: 10rem;
    }
`;

export const MobileTextContainer = styled.div`
    display: block;
    position: relative;
    z-index: 10;

    @media ${deviceMin.mobileS} {
        margin-top: -4rem;
    }

    @media ${deviceMin.tablet} {
        margin-top: -5rem;
    }
`;

export const ErrorCode = styled.h1`
    font-size: 9rem;
    color: ${(props) => props.theme.accentColors.orange};
    font-weight: 800;
    margin-bottom: 2rem;
`;

export const MobileErrorCode = styled.h1`
    font-size: 9rem;
    color: ${(props) => props.theme.accentColors.orange};
    font-weight: 800;
    z-index: 10;

    @media ${deviceMin.mobileS} {
        font-size: 5rem;
        margin-bottom: -2.5rem;
    }

    @media ${deviceMin.tablet} {
        font-size: 9rem;
        margin-bottom: -5rem;
    }

    @media ${deviceMin.laptop} {
        margin-bottom: -5rem;
    }
`;

export const HeaderText = styled.h2`
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
    margin-bottom: 0.5rem;

    @media ${deviceMin.mobileS} {
        font-size: 1.5rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 2.5rem;
    }
`;

export const SubText = styled.h3`
    font-size: 1.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
    margin-bottom: 1rem;

    @media ${deviceMin.mobileS} {
        font-size: 1rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1.5rem;
    }
`;

export const ButtonContainer = styled.div``;

export const MobileButtonContainer = styled.div`
    width: 15rem;
    text-align: center;
    margin: 0 auto;
`;

//Interface:

const NotFound = () => {
    return (
        <>
            <BrowserView>
                <MainContainer>
                    <TextContainer>
                        <ErrorCode>404</ErrorCode>
                        <HeaderText>Whoa, where did you go?</HeaderText>
                        <SubText>Honestly, we don't know either.</SubText>
                        <ButtonContainer>
                            <GeneralButton
                                buttonLabel="Return to Homepage"
                                onClick={() => historyObject.push('/')}
                                width="15rem"
                            />
                        </ButtonContainer>
                    </TextContainer>
                    <SVGContainer>
                        <LostSVG />
                    </SVGContainer>
                </MainContainer>
            </BrowserView>
            <MobileView>
                <MobileMainContainer>
                    <MobileErrorCode>404</MobileErrorCode>
                    <MobileSVGContainer>
                        <LostSVG />
                    </MobileSVGContainer>
                    <MobileTextContainer>
                        <HeaderText>Whoa, where did you go?</HeaderText>
                        <SubText>Honestly, we don't know either.</SubText>
                        <MobileButtonContainer>
                            <GeneralButton
                                buttonLabel="Return to Homepage"
                                onClick={() => historyObject.push('/')}
                                width="15rem"
                            />
                        </MobileButtonContainer>
                    </MobileTextContainer>
                </MobileMainContainer>
            </MobileView>
        </>
    );
};

export default NotFound;
