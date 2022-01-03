import React from 'react';

//Components:
import { Droppable } from 'react-beautiful-dnd';
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
}

const DraggableElement = ({
    prefix,
    elements,
}: IComponentProps): JSX.Element => {
    return (
        <DroppableStyles>
            <ColumnHeader>{prefix}</ColumnHeader>
            <Droppable droppableId={`${prefix}`}>
                {(provided: any) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {elements?.map((item: any, index: any) => (
                            <BlockTypeExercise
                                key={item.id}
                                item={item}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DroppableStyles>
    );
};

export default DraggableElement;
