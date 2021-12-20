import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Components:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import GridLayout from 'react-grid-layout';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

//Styles:
import 'react-grid-layout/css/styles.css';
import styled from 'styled-components';

const MainContainer = styled.section<IMainContainerProps>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    background: #ffffff;

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
    const { width, height } = useWindowDimensions();

    const layout = [
        { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
        { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ];

    return (
        <MainContainer height={height} width={width}>
            <TransformWrapper initialScale={1}>
                <TransformComponent>
                    <GridLayout
                        layout={layout}
                        cols={12}
                        rowHeight={25}
                        width={width}
                    >
                        <TestDraggableDiv key="a">a</TestDraggableDiv>
                        <TestDraggableDiv key="b">b</TestDraggableDiv>
                        <TestDraggableDiv key="c">c</TestDraggableDiv>
                    </GridLayout>
                </TransformComponent>
            </TransformWrapper>
        </MainContainer>
    );
};

export default EditingSurface;
