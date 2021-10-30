import * as React from 'react';

//Components:
import { ReactComponent as LostSVG } from '../../assets/lost_animation.svg';
import GeneralButton from '../general_components/GeneralButton';
import historyObject from '../../utils/historyObject';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 40% 60%;
    margin: 0 auto;
    max-width: 80rem;
`;

const SVGContainer = styled.div``;

const TextContainer = styled.div``;

const ErrorCode = styled.h1`
    font-size: 9rem;
    color: ${(props) => props.theme.accentColors.orange};
    font-weight: 800;
    margin-bottom: 2rem;
`;

const HeaderText = styled.h2`
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
    margin-bottom: 0.5rem;
`;

const SubText = styled.h3`
    font-size: 1.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
    margin-bottom: 1rem;
`;

const ButtonContainer = styled.div``;

//Interface:

const NotFound = () => {
    return (
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
    );
};

export default NotFound;
