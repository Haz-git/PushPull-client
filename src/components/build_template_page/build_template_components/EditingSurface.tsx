import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Components:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import GridLayout from 'react-grid-layout';

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
        { i: 'd', x: 4, y: 0, w: 1, h: 2 },
        { i: 'e', x: 4, y: 0, w: 1, h: 2 },
        { i: 'f', x: 4, y: 0, w: 1, h: 2 },
        { i: 'g', x: 4, y: 0, w: 1, h: 2 },
        { i: 'h', x: 4, y: 0, w: 1, h: 2 },
        { i: 'i', x: 4, y: 0, w: 1, h: 2 },
    ];

    const onDrop = (layout: any, layoutItem: any, _event: any) => {
        alert(
            `Dropped element props:\n${JSON.stringify(
                layoutItem,
                ['x', 'y', 'w', 'h'],
                2
            )}`
        );
    };

    return (
        <MainContainer height={height} width={width}>
            <GridLayout
                layout={layout}
                cols={12}
                rowHeight={25}
                width={width}
                onDrop={onDrop}
                isDroppable={true}
            >
                <TestDraggableDiv key="a">a</TestDraggableDiv>
                <TestDraggableDiv key="b">b</TestDraggableDiv>
                <TestDraggableDiv key="c">c</TestDraggableDiv>
                <TestDraggableDiv key="d">d</TestDraggableDiv>
                <TestDraggableDiv key="e">e</TestDraggableDiv>
                <TestDraggableDiv key="f">f</TestDraggableDiv>
                <TestDraggableDiv key="g">g</TestDraggableDiv>
                <TestDraggableDiv key="h">h</TestDraggableDiv>
                <TestDraggableDiv key="i">i</TestDraggableDiv>
            </GridLayout>
        </MainContainer>
    );
};

export default EditingSurface;
