import * as React from 'react';

//Components:
import { Draggable } from 'react-beautiful-dnd';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    margin: 1rem 0rem;
    border-radius: 0.4rem;
    background: #ffffff;
    width: 100%;
    border: 2px solid #d6d6d6;
`;

const BlockHeader = styled.div`
    padding: 0.5rem 0rem 0.5rem 0.5rem;
`;

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: #d6d6d6;
`;

//Interfaces:

interface IComponentProps {
    item: any;
    index: any;
    blockDetails: any;
}

const BlockTypeExercise = ({
    item,
    index,
    blockDetails,
}: IComponentProps): JSX.Element => {
    const { name, desc, sets, reps } = blockDetails;
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
                        <BlockHeader>{name}</BlockHeader>
                        <Divider />
                    </MainContainer>
                );
            }}
        </Draggable>
    );
};

export default BlockTypeExercise;
