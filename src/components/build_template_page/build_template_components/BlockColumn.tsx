import * as React from 'react';

//Components:
import { Droppable } from 'react-beautiful-dnd';
import BlockTypeExercise from './BlockTypeExercise';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    border-radius: 6px;
    background: transparent;
`;

//Interfaces:
interface IComponentProps {
    prefix: any;
    elements: any;
}

const BlockColumn = ({ prefix, elements }: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <Droppable
                droppableId={`${prefix}`}
                type={'EXERCISE_BLOCK'}
                isDropDisabled={true}
            >
                {(provided: any) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {elements?.map((item: any, index: any) => (
                            <BlockTypeExercise
                                key={item.id}
                                item={item}
                                index={index}
                                content={item.content}
                            />
                        ))}
                    </div>
                )}
            </Droppable>
        </MainContainer>
    );
};

export default BlockColumn;
