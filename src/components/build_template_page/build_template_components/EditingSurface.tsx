import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    width: 100%;
    height: 100%;

    /*
        Incredibly frustrating working with this css. I have the exact same grid logic implemented for MainBuildProgramView, but for some reason grid-template-columns does not push the Editing surface the right of the Toolbar. It works perfectly without these media queries in the programview, but these below must be included in editing surface... css???
    */

    @media ${deviceMin.mobileS} {
        margin-left: 11rem;
    }

    @media ${deviceMin.mobileM} {
        margin-left: 12rem;
    }

    @media ${deviceMin.mobileL} {
        margin-left: 13rem;
    }

    @media ${deviceMin.browserSm} {
        margin-left: 14rem;
    }

    @media ${deviceMin.laptop} {
        margin-left: 15rem;
    }

    @media ${deviceMin.laptopL} {
        margin-left: 16rem;
    }
`;

//Interfaces:

const EditingSurface = () => {
    return (
        <MainContainer>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
            <div>TEETSTSETSETSE</div>
        </MainContainer>
    );
};

export default EditingSurface;
