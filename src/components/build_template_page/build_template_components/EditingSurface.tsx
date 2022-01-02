import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

    const [items, setItems] = useState([] as any);

    //Fake data gen:
    const getItems = (count: number) =>
        Array.from({ length: count }, (v, k) => k).map((k) => ({
            id: `item-${k}`,
            content: `item ${k}`,
        }));

    useEffect(() => {
        setItems(getItems(10));
    }, []);
    //Reorder results:
    const reorder = (list: any, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const grid = 8;

    const getItemStyle = (isDragging: any, draggableStyle: any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver: any) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250,
    });

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(reorderedItems);
    };

    return (
        <MainContainer height={height} width={width}>
            <GridContainer>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {items.map((item: any, index: any) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </GridContainer>
        </MainContainer>
    );
};

export default EditingSurface;
