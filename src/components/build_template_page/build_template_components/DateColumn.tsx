import React from 'react';

//Components:
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BlockTypeExercise from './BlockTypeExercise';

//Styles:
import styled from 'styled-components';
const ColumnHeader = styled.div`
    text-transform: uppercase;
    margin-bottom: 1rem;
`;

const DroppableStyles = styled.div`
    padding: 1rem;
    background: #ffffff;
    border-right: 1px solid #ebe6fb;
    height: 100vh;
`;

//Interfaces:

interface IComponentProps {
    prefix: any;
    elements: any;
    columnIndex: any;
}

const DateColumn = ({
    prefix,
    elements,
    columnIndex,
}: IComponentProps): JSX.Element => {
    return (
        <Draggable draggableId={`${prefix}`} index={columnIndex}>
            {(provided) => (
                <DroppableStyles
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <ColumnHeader {...provided.dragHandleProps}>
                        {prefix}
                    </ColumnHeader>
                    <Droppable
                        droppableId={`${prefix}`}
                        type={`EXERCISE_BLOCK`}
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

export default DateColumn;
