import React from 'react';

//Components:
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BlockTypeExercise from './BlockTypeExercise';
import { BlockTypes } from './BlockTypeExercise';

//Styles:
import styled from 'styled-components';

const ColumnHeader = styled.div`
    font-weight: 700;
`;

const HeaderDivider = styled.div`
    margin: 0.5rem 0rem;
    height: 4px;
    border-radius: 0.5rem;
    background: #d6d6d6;
`;

const DroppableStyles = styled.div`
    padding: 1rem;
    background: #ffffff;
    border-right: 1px solid #ebe6fb;
    border-left: 1px solid #ebe6fb;
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
                    <HeaderDivider />
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
                                        blockId={item.id}
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        blockDetails={item.blockDetails}
                                        blockType={BlockTypes.EDITING_SURFACE}
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
