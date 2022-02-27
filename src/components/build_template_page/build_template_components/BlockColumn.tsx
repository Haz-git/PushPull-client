import * as React from 'react';
import { Fragment } from 'react';

//Components:
import { Droppable } from 'react-beautiful-dnd';
import BlockTypeExercise from './BlockTypeExercise';
import { BlockTypes } from './BlockTypeExercise';
import { v4 as uuid } from 'uuid';

//Styles:
import styled from 'styled-components';
import { BlockTypeExerciseClone } from './BlockTypeExerciseClone';

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
    const getCloneBlock =
        (elements: any) =>
        (provided: any, snapshot: any, rubric: any): JSX.Element => {
            const cloneBlock = elements[rubric.source.index];
            return (
                <BlockTypeExerciseClone
                    blockDetails={cloneBlock.blockDetails}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={provided.draggableProps.style}
                    key={cloneBlock.id}
                />
            );
        };

    return (
        <MainContainer>
            <Droppable
                droppableId={`${prefix}`}
                type={'EXERCISE_BLOCK'}
                isDropDisabled={true}
                renderClone={getCloneBlock(elements)}
            >
                {(provided: any, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {elements?.map((item: any, index: any) => {
                            const shouldRenderClone =
                                item.id === snapshot.draggingFromThisWith;
                            return (
                                <Fragment key={item.id}>
                                    {shouldRenderClone ? (
                                        <BlockTypeExerciseClone
                                            blockDetails={item.blockDetails}
                                            className="toolbar-block-dnd-copy"
                                        />
                                    ) : (
                                        <BlockTypeExercise
                                            blockId={item.id}
                                            item={item}
                                            index={index}
                                            blockDetails={item.blockDetails}
                                            blockType={BlockTypes.TOOLBAR}
                                            className="toolbar-block-dnd-copy"
                                        />
                                    )}
                                </Fragment>
                            );
                        })}
                    </div>
                )}
            </Droppable>
        </MainContainer>
    );
};

export default BlockColumn;
