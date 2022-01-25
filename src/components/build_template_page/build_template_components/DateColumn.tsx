import React from 'react';
import { useState } from 'react';

//Redux:
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { renameEditingSurfaceColumn } from '../../../redux/templates/templateActions';

//Components:
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BlockTypeExercise from './BlockTypeExercise';
import { BlockTypes } from './BlockTypeExercise';
import Text from '../../general_components/Text';
import { v4 as uuid } from 'uuid';
import { TextInput } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

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
    const dispatch = useDispatch();
    const template = useSelector((state: RootStateOrAny) => state?.template);
    // console.log(template);

    const [newColumnName, setNewColumnName] = useState(prefix);
    const [isEditModeOn, setIsEditModeOn] = useState(false);

    const inputRef = useClickOutside(() => {
        if (newColumnName !== '' && newColumnName !== prefix) {
            console.log('Dispatch here.');
        }

        setIsEditModeOn(false);
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewColumnName(e.target.value);
    };

    const handleOnKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (
            e.key === 'Enter' &&
            newColumnName !== '' &&
            newColumnName !== prefix
        ) {
            dispatch(
                renameEditingSurfaceColumn(
                    template.id,
                    template.templateEditingSurfaceBlocks[0]['weekId'],
                    prefix,
                    newColumnName.concat(`%SECRET%ID%${uuid()}`)
                )
            );
            setIsEditModeOn(false);
        }
    };

    const renderInputFieldOnEdit = (): JSX.Element => {
        if (!isEditModeOn) {
            return (
                <>
                    <Text text={newColumnName} />
                    <ColumnHeaderButton onClick={() => setIsEditModeOn(true)}>
                        <EditIcon />
                    </ColumnHeaderButton>
                </>
            );
        }

        return (
            <TextInput
                ref={inputRef}
                autoFocus
                value={newColumnName}
                required
                onChange={handleUserInput}
                size="xs"
                styles={{
                    root: {
                        padding: '0 0',
                        margin: '-.2rem 0rem 0rem 0rem',
                    },
                    input: {
                        fontFamily: 'Lato',
                        border: 'none',
                        padding: '0rem 0rem 0rem .5rem',
                        margin: '0 0',
                        height: '1.4rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        width: '100%',
                        minHeight: '0',
                    },
                }}
                onKeyPress={handleOnKeyPress}
            />
        );
    };

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
                        {renderInputFieldOnEdit()}
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
