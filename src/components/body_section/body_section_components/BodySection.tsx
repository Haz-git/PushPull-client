import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';
import { BrowserView, MobileView, TabletView } from 'react-device-detect';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section<BodySectionProps>`
    background: ${(props) => props.backgroundColor};
`;

const ItemWrapper = styled.div<BodySectionProps>`
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: auto 40%;

    @media ${deviceMin.mobileS} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 0;
    }

    @media ${deviceMin.laptopHalf} {
        padding: 0 0;
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: ${(props) =>
            props.isReversed === true ? '40% auto' : 'auto 40%'};
    }
`;

const MobileItemWrapper = styled.div`
    padding: 2rem 0;
    display: block;
`;

const SVGContainer = styled.div`
    height: 40rem;
    width: 40rem;

    @media ${deviceMin.mobileS} {
        margin: -1rem auto;
        height: 20rem;
        width: 20rem;
    }

    @media ${deviceMin.browserSm} {
        margin: 4rem auto -1.5rem auto;
        height: 28rem;
        width: 28rem;
    }

    @media ${deviceMin.laptopHalf} {
        margin: 0 auto;
        height: 24rem;
        width: 24rem;
    }

    @media ${deviceMin.laptopS} {
        margin: 0 auto;
        height: 38rem;
        width: 38rem;
    }
`;

const TextContainer = styled.div`
    text-align: left;
    margin-left: 2rem;
`;

const BodyHeader = styled.h2<BodySectionProps>`
    font-size: ${(props) => props.theme.fontSizes.xxl};
    color: ${(props) => props.mainTextColor};
    font-weight: 700;
    margin: 2rem 0;

    @media ${deviceMin.mobileS} {
        margin-top: 4rem;
        margin-bottom: 1rem;
        font-size: ${(props) => props.theme.fontSizes.lg};
    }

    @media ${deviceMin.browserSm} {
        margin: 1rem auto 0 auto;
    }

    @media ${deviceMin.laptopS} {
        font-size: ${(props) => props.theme.fontSizes.xxl};
        color: ${(props) => props.mainTextColor};
        font-weight: 700;
        margin: 2rem 0;
    }
`;

const BodyDesc = styled.p<BodySectionProps>`
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.subTextColor};
    font-weight: 600;
    margin: 2rem 0;

    @media ${deviceMin.mobileS} {
        margin: 0.5rem 0;
        font-size: ${(props) => props.theme.fontSizes.md};
    }

    @media ${deviceMin.laptopS} {
        font-size: ${(props) => props.theme.fontSizes.lg};
        color: ${(props) => props.subTextColor};
        font-weight: 600;
        margin: 2rem 0;
    }
`;

const MobileButtonContainer = styled.div`
    width: 100%;
    padding: 0 1rem;
    margin: 0.5rem auto;
`;

const ButtonContainer = styled.div`
    max-width: 15rem;
    margin: 2rem 0;
`;

//Interfaces:

interface IStyledProps {
    isReversed?: boolean;
    backgroundColor?: string;
    mainTextColor?: string;
    subTextColor?: string;
}

interface IComponentProps {
    SVGImage?: JSX.Element;
    textHeader?: string;
    textDesc?: string;
    primaryButton?: JSX.Element;
}

type BodySectionProps = IStyledProps & IComponentProps;

const BodySection = ({
    SVGImage,
    textHeader,
    textDesc,
    primaryButton,
    isReversed = false,
    backgroundColor = 'inherit',
    mainTextColor = 'rgba(0, 0, 34, 1)',
    subTextColor = 'rgba(0, 0, 34, .7)',
}: BodySectionProps): JSX.Element => {
    return (
        <>
            <BrowserView>
                {isReversed === false ? (
                    <MainContainer backgroundColor={backgroundColor}>
                        <ItemWrapper isReversed={isReversed}>
                            <SVGContainer>{SVGImage}</SVGContainer>
                            <TextContainer>
                                <BodyHeader mainTextColor={mainTextColor}>
                                    {textHeader}
                                </BodyHeader>
                                <BodyDesc subTextColor={subTextColor}>
                                    {textDesc}
                                </BodyDesc>
                                <ButtonContainer>
                                    {primaryButton}
                                </ButtonContainer>
                            </TextContainer>
                        </ItemWrapper>
                    </MainContainer>
                ) : (
                    <MainContainer backgroundColor={backgroundColor}>
                        <ItemWrapper isReversed={isReversed}>
                            <TextContainer>
                                <BodyHeader mainTextColor={mainTextColor}>
                                    {textHeader}
                                </BodyHeader>
                                <BodyDesc subTextColor={subTextColor}>
                                    {textDesc}
                                </BodyDesc>
                                <ButtonContainer>
                                    {primaryButton}
                                </ButtonContainer>
                            </TextContainer>
                            <SVGContainer>{SVGImage}</SVGContainer>
                        </ItemWrapper>
                    </MainContainer>
                )}
            </BrowserView>
            <MobileView>
                <MainContainer backgroundColor={backgroundColor}>
                    <MobileItemWrapper>
                        <TextContainer>
                            <BodyHeader mainTextColor={mainTextColor}>
                                {textHeader}
                            </BodyHeader>
                            <BodyDesc subTextColor={subTextColor}>
                                {textDesc}
                            </BodyDesc>
                        </TextContainer>
                        <SVGContainer>{SVGImage}</SVGContainer>
                        <MobileButtonContainer>
                            {primaryButton}
                        </MobileButtonContainer>
                    </MobileItemWrapper>
                </MainContainer>
            </MobileView>
        </>
    );
};

export default BodySection;
