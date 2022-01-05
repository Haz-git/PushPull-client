import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DroppableElement from './DroppableElement';
import { v4 as uuid } from 'uuid';

//Styles:
import styled from 'styled-components';

const DragDropContextContainer = styled.div`
    padding: 1rem 1rem;
    border: 1px solid black;
    border-radius: 0.3rem;
`;

const ListGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: 1rem;
`;

//Helper Functions:

//Fake data gen:
const getItems = (count: any, prefix: any) =>
    Array.from({ length: count }, (v, k) => k).map((k) => {
        const randomId = uuid();
        return {
            id: `item-${randomId}`,
            prefix,
            content: `item ${randomId}`,
        };
    });

const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

const lists = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

const generateLists = () =>
    //getItems(10, listKey) <- Pass this into empty array below to provide dummy data.
    lists.reduce((acc, listKey) => ({ ...acc, [listKey]: [] }), {});

//Interfaces:

const MultipleLists = () => {
    const [elements, setElements] = useState(generateLists()) as any;

    useEffect(() => {
        setElements(generateLists());
    }, []);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...(elements as any) };

        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );

        setElements(listCopy);
    };

    return (
        <DragDropContextContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <ListGridContainer>
                    {lists.map((listKey: any, index: any) => (
                        <DroppableElement
                            elements={elements[listKey]}
                            key={listKey}
                            prefix={listKey}
                            columnIndex={index}
                        />
                    ))}
                </ListGridContainer>
            </DragDropContext>
        </DragDropContextContainer>
    );
};

export default MultipleLists;
