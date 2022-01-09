import * as React from 'react';

//Components:
import { Draggable } from 'react-beautiful-dnd';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    margin: 1rem 0rem;
    padding: 0.5rem 0.5rem;
    border-radius: 0.4rem;
    background: salmon;
    width: 100%;
`;

//Interfaces:

interface IComponentProps {
    item: any;
    index: any;
    content: any;
}

const BlockTypeExercise = ({
    item,
    index,
    content,
}: IComponentProps): JSX.Element => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <MainContainer
                        ref={provided.innerRef}
                        data-snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div>{`ID :${item.id}`}</div>
                        <div>{content}</div>
                    </MainContainer>
                );
            }}
        </Draggable>
    );
};

export default BlockTypeExercise;
