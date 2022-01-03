import * as React from 'react';

//Components:
import { Draggable } from 'react-beautiful-dnd';

//Styles:
import styled from 'styled-components';

//Interfaces:

interface IComponentProps {
    item: any;
    index: any;
}

const BlockTypeExercise = ({ item, index }: IComponentProps): JSX.Element => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        data-snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {item.id}
                    </div>
                );
            }}
        </Draggable>
    );
};

export default BlockTypeExercise;
