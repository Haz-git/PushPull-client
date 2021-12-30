import * as React from 'react';
import { useState } from 'react';
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
    const [gridLayout, setGridLayout] = useState([
        { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
        { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 },
        { i: 'd', x: 4, y: 0, w: 1, h: 2 },
        { i: 'e', x: 4, y: 0, w: 1, h: 2 },
        { i: 'f', x: 4, y: 0, w: 1, h: 2 },
        { i: 'g', x: 4, y: 0, w: 1, h: 2 },
        { i: 'h', x: 4, y: 0, w: 1, h: 2 },
        { i: 'i', x: 4, y: 0, w: 1, h: 2 },
    ]);

    const onDrop = (layout: any, layoutItem: any, _event: any) => {
        console.log(layout, layoutItem);
        setGridLayout(layout);
    };

    const renderGridBlocks = () => {
        return gridLayout.map((block: any) => (
            <TestDraggableDiv key={block.i}>{block.i}</TestDraggableDiv>
        ));
    };

    return (
        <MainContainer height={height} width={width}>
            <GridLayout
                layout={gridLayout}
                cols={12}
                rowHeight={25}
                width={width}
                onDrop={onDrop}
                isDroppable={true}
                droppingItem={{ i: 'Block', w: 1, h: 1 }}
            >
                {renderGridBlocks()}
            </GridLayout>
        </MainContainer>
    );
};

export default EditingSurface;
