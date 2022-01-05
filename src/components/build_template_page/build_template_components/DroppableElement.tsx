import React from 'react';

//Components:
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BlockTypeExercise from './BlockTypeExercise';

//Styles:
import styled from 'styled-components';
const ColumnHeader = styled.div`
    text-transform: uppercase;
    margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
    padding: 10px;
    border-radius: 6px;
    background: #d4d4d4;
`;

//Interfaces:

interface IComponentProps {
    prefix: any;
    elements: any;
    columnIndex: any;
}

const DroppableElement = ({
    prefix,
    elements,
    columnIndex,
}: IComponentProps): JSX.Element => {
    //The naming for this DroppableElement should be changed in the future to something like Columns, as this represents the Day columns on the editing surface and the individual blocks column in the toolbar.
    const disableDropForToolbar = () => {
        if (prefix === 'Blocks') return true;
        return false;
    };

    return (
        <Draggable draggableId={`${prefix}`} index={columnIndex}>
            {() => (
                <DroppableStyles>
                    <ColumnHeader>{prefix}</ColumnHeader>
                    <Droppable
                        droppableId={`${prefix}`}
                        isDropDisabled={disableDropForToolbar()}
                    >
                        {(provided: any) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {elements?.map((item: any, index: any) => (
                                    <BlockTypeExercise
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        content={item.content}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DroppableStyles>
            )}
        </Draggable>
    );
};

export default DroppableElement;
