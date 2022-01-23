import React from 'react';

//Components:
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BlockTypeExercise from './BlockTypeExercise';
import { BlockTypes } from './BlockTypeExercise';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';
import { Edit } from '@styled-icons/fluentui-system-filled/Edit';

const EditIcon = styled(Edit)`
    height: 1.2rem;
    width: 1.2rem;
    color: #e07133;
`;

const ColumnHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ColumnHeaderButton = styled.button`
    background: transparent;
    border: none;
    text-decoration: none;
    cursor: pointer;
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
    const getListStyle = (isDraggingOver: any) => ({
        background: isDraggingOver ? '#ececec' : '#ffffff',
        height: '100%',
        borderRadius: '.3rem',
        width: '100%',
    });

    return (
        <Draggable draggableId={`${prefix}`} index={columnIndex}>
            {(provided) => (
                <DroppableStyles
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <ColumnHeaderContainer {...provided.dragHandleProps}>
                        <Text text={prefix} />
                        <ColumnHeaderButton>
                            <EditIcon />
                        </ColumnHeaderButton>
                    </ColumnHeaderContainer>
                    <HeaderDivider />
                    <Droppable
                        droppableId={`${prefix}`}
                        type={`EXERCISE_BLOCK`}
                    >
                        {(provided: any, snapshot: any) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {elements?.map((item: any, index: any) => (
                                    <BlockTypeExercise
                                        blockId={item.id}
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        blockDetails={item.blockDetails}
                                        blockType={BlockTypes.EDITING_SURFACE}
                                        columnPrefix={`${prefix}`}
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
