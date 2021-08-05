import * as React from 'react';

//Components:
import BackdropText from './backdrop_components/BackdropText';
import { ReactComponent as BackdropSVG } from '../../assets/backdrop_workout_pic.svg';

//Styles:
import styled from 'styled-components';

const BackdropMainContainer = styled.section`
    display: grid;
    grid-template-columns: 50% auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: rgba(255, 183, 0, 1);
`;

const SVGContainer = styled.div`
    height: 31rem;
    width: 31rem;
`;

const BackdropMain = () => {
    return (
        <BackdropMainContainer>
            <BackdropText />
            <SVGContainer>
                <BackdropSVG />
            </SVGContainer>
        </BackdropMainContainer>
    );
};

export default BackdropMain;
