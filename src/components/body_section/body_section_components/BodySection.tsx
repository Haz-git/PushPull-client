import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section``;

const ItemWrapper = styled.div``;

const TextContainer = styled.div``;

const BodyHeader = styled.h2``;

const BodyDesc = styled.p``;

//Interfaces:

interface IComponentProps {
    SVGImage?: HTMLElement & SVGElement;
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
                <TextContainer>
                    <BodyHeader>{textHeader}</BodyHeader>
                    <BodyDesc>{textDesc}</BodyDesc>
                </TextContainer>
            </ItemWrapper>
        </MainContainer>
    );
};

export default BodySection;
