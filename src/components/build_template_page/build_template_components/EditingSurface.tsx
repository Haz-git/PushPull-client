import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import ListGrid from './ListGrid';
import MultipleLists from './MultipleLists';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section<IMainContainerProps>`
    width: ${({ width }) => `${width - 274}px`};
    height: ${({ height }) => `${height}px`};
    background: #ffffff;
    border: 1px solid black;

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

const GridContainer = styled.div`
    border: 1px solid black;
`;

const TestDraggableDiv = styled.div`
    background: salmon;
    border: 1px solid black;
`;

//Interfaces:

interface IMainContainerProps {
    height: number;
    width: number;
}

const EditingSurface = () => {
    const selectedBlock = useSelector(
        (state: RootStateOrAny) => state?.toolbarSelectedBlock
    );
    const { width, height } = useWindowDimensions();

    return (
        <MainContainer height={height} width={width}>
            <GridContainer>{/* <MultipleLists /> */}</GridContainer>
        </MainContainer>
    );
};

export default EditingSurface;
