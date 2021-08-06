import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';
import { BrowserView, MobileView, TabletView } from 'react-device-detect';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section``;

const ItemWrapper = styled.div<IStyledProps>`
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: auto 40%;
`;

const MobileItemWrapper = styled.div`
    display: block;
`;

const SVGContainer = styled.div`
    height: 40rem;
    width: 40rem;

    @media ${deviceMin.mobileS} {
        margin: -1rem auto;
        height: 22rem;
        width: 22rem;
    }

    @media ${deviceMin.browserSm} {
        margin: 0 auto;
        height: 22rem;
        width: 22rem;
    }

    @media ${deviceMin.laptopHalf} {
        margin: 0 auto;
        height: 24rem;
        width: 24rem;
    }

    @media ${deviceMin.laptopS} {
        margin: 0 auto;
        height: 40rem;
        width: 40rem;
    }
`;

const TextContainer = styled.div`
    text-align: left;
    margin-left: 2rem;
`;

const BodyHeader = styled.h2`
    font-size: ${(props) => props.theme.fontSizes.xxl};
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
    margin: 2rem 0;

    @media ${deviceMin.mobileS} {
        margin-top: 4rem;
        margin-bottom: 1rem;
        font-size: 1.8rem;
    }
`;

const BodyDesc = styled.p`
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    margin: 2rem 0;

    @media ${deviceMin.mobileS} {
        margin: 0.5rem 0;
        font-size: 1.2rem;
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
}

interface IComponentProps {
    SVGImage?: JSX.Element;
    textHeader?: string;
    textDesc?: string;
    primaryButton?: JSX.Element;
    isReversed?: boolean;
}

const BodySection = ({
    SVGImage,
    textHeader,
    textDesc,
    primaryButton,
    isReversed = false,
}: IComponentProps): JSX.Element => {
    return (
        <>
            <BrowserView>
                <MainContainer>
                    <ItemWrapper isReversed={isReversed}>
                        <SVGContainer>{SVGImage}</SVGContainer>
                        <TextContainer>
                            <BodyHeader>{textHeader}</BodyHeader>
                            <BodyDesc>{textDesc}</BodyDesc>
                            <ButtonContainer>{primaryButton}</ButtonContainer>
                        </TextContainer>
                    </ItemWrapper>
                </MainContainer>
            </BrowserView>
            <MobileView>
                <MainContainer>
                    <MobileItemWrapper>
                        <TextContainer>
                            <BodyHeader>{textHeader}</BodyHeader>
                            <BodyDesc>{textDesc}</BodyDesc>
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
