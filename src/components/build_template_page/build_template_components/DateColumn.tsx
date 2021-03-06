import React from 'react';
import { useState, useMemo } from 'react';

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
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';
import { Edit } from '@styled-icons/fluentui-system-filled/Edit';
import useQuery from '../../../utils/hooks/useQuery';

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
    width: 100%;
    margin: 0 auto;
    padding: 1rem 1rem;
    background: #ffffff;
    outline: 1px solid #d6d6d6;
    margin-top: 1px;
    margin-left: 1px;
`;

const BlockContainer = styled.div<IBlockContainer>`
    background: ${({ isDraggingOver }) =>
        isDraggingOver ? '#ececec' : '#ffffff'};
    height: 100%;
    min-height: ${({ height }) => `${height - 57}px`};
    border-radius: 0.3rem;
    width: 100%;
    padding-bottom: 2rem;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

interface IBlockContainer {
    isDraggingOver: any;
    height: number;
}

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
    const query = useQuery();
    const dispatch = useDispatch();
    const template = useSelector((state: RootStateOrAny) => state?.template);
    const { height } = useWindowDimensions();
    const currentSheetId = query.get('sheetId');

    const composeHeaderName = (prefixString: string): string => {
        if (!prefixString.includes(`%SECRET%ID%`)) {
            return prefixString;
        }

        return prefixString.substring(0, prefixString.indexOf(`%SECRET%ID%`));
    };

    const [newColumnName, setNewColumnName] = useState(
        composeHeaderName(prefix)
    );

    const composedHeaderName = useMemo(
        () => composeHeaderName(prefix),
        [prefix]
    );

    const [isEditModeOn, setIsEditModeOn] = useState(false);

    const inputRef = useClickOutside(() => {
        if (newColumnName !== '' && newColumnName !== prefix) {
            dispatch(
                renameEditingSurfaceColumn(
                    template.id,
                    currentSheetId,
                    prefix,
                    newColumnName.concat(`%SECRET%ID%${uuid()}`)
                )
            );
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
                    currentSheetId,
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
                            <BlockContainer
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                                height={height}
                            >
                                {elements?.map((item: any, index: any) => (
                                    <BlockTypeExercise
                                        blockId={item.id}
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        blockDetails={item.blockDetails}
                                        blockType={BlockTypes.EDITING_SURFACE}
                                        columnPrefix={prefix}
                                    />
                                ))}
                                {provided.placeholder}
                            </BlockContainer>
                        )}
                    </Droppable>
                </DroppableStyles>
            )}
        </Draggable>
    );
};

export default DateColumn;
