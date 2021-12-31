import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import GridLayout from 'react-grid-layout';
import DraggableBlock from './DraggableBlock';
//Styles:
import 'react-grid-layout/css/styles.css';
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

    console.log(selectedBlock);
    const { width, height } = useWindowDimensions();
    const [gridLayout, setGridLayout] = useState([
        { i: 'Day 1', x: 0, y: 0, w: 1, h: 2, static: true },
        { i: 'Day 2', x: 1, y: 0, w: 1, h: 2, static: true },
        { i: 'Day 3', x: 2, y: 0, w: 1, h: 2, static: true },
        { i: 'Day 4', x: 3, y: 0, w: 1, h: 2, static: true },
        { i: 'Day 5', x: 4, y: 0, w: 1, h: 2, static: true },
        { i: 'f', x: 4, y: 0, w: 1, h: 2 },
        { i: 'g', x: 4, y: 0, w: 1, h: 2 },
        { i: 'h', x: 4, y: 0, w: 1, h: 2 },
        { i: 'i', x: 4, y: 0, w: 1, h: 2 },
    ]);

    const onDrop = (layout: any, layoutItem: any, _event: any) => {
        console.log(layout, layoutItem, _event);
        setGridLayout(layout);
    };

    const renderGridBlocks = () => {
        return gridLayout.map((block: any) => (
            <DraggableBlock key={block.i}>{block.i}</DraggableBlock>
        ));
    };

    return (
        <MainContainer height={height} width={width}>
            <GridContainer>
                <GridLayout
                    layout={gridLayout}
                    cols={5}
                    rowHeight={25}
                    width={width - 274}
                    onDrop={onDrop}
                    isDroppable={true}
                    droppingItem={{
                        i: selectedBlock?.uuid || 'Error: Undefined',
                        w: 1,
                        h: 2,
                    }}
                >
                    {renderGridBlocks()}
                </GridLayout>
            </GridContainer>
        </MainContainer>
    );
};

export default EditingSurface;
