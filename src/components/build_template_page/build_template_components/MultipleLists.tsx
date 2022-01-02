import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//Styles:

//Interfaces:

const ListGrid = () => {
    const [items, setItems] = useState([] as any);
    const [selected, setSelected] = useState([] as any);

    //Fake data gen:
    const getItems = (count: number, offset = 0) =>
        Array.from({ length: count }, (v, k) => k).map((k) => ({
            id: `item-${k + offset}`,
            content: `item ${k + offset}`,
        }));

    useEffect(() => {
        setItems(getItems(10));
        setSelected(getItems(5, 10));
    }, []);

    //Reorder results:
    const reorder = (list: any, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    // Move item from one list to other
    const move = (
        source: any,
        destination: any,
        droppableSource: any,
        droppableDestination: any
    ) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {} as any;
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const grid = 10;

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

    const id2List = {
        droppable: 'items',
        droppable2: 'selected',
    };

    const getList = (id: any) => {
        if (id === 'items') return items;
        return selected;
    };

    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        // Sorting in same list
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable2') {
                setSelected(items);
            }

            setItems(items);
        }
        // Interlist movement
        else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setItems(result.droppable);
            setSelected(result.droppable2);
        }

        // const reorderedItems = reorder(
        //     items,
        //     result.source.index,
        //     result.destination.index
        // );

        // setItems(reorderedItems);
    };

    return (
        <div style={{ display: 'flex' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
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
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {selected.map((item: any, index: any) => (
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
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ListGrid;
