import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section``;

const ItemWrapper = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: auto 40%;
`;

const SVGContainer = styled.div`
    height: 40rem;
    width: 40rem;
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
`;

const BodyDesc = styled.p`
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    margin: 2rem 0;
`;

const ButtonContainer = styled.div`
    max-width: 8rem;
    margin: 2rem 0;
`;

//Interfaces:

interface IComponentProps {
    SVGImage?: JSX.Element;
    textHeader?: string;
    textDesc?: string;
    primaryButton?: JSX.Element;
}

const BodySection = ({
    SVGImage,
    textHeader,
    textDesc,
    primaryButton,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <ItemWrapper>
                <SVGContainer>{SVGImage}</SVGContainer>
                <TextContainer>
                    <BodyHeader>{textHeader}</BodyHeader>
                    <BodyDesc>{textDesc}</BodyDesc>
                    <ButtonContainer>{primaryButton}</ButtonContainer>
                </TextContainer>
            </ItemWrapper>
        </MainContainer>
    );
};

export default BodySection;
