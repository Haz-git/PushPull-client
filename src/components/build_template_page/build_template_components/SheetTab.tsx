import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import { updateSheet } from '../../../redux/templates/templateActions';

//Components:
import Text from '../../general_components/Text';
import useQuery from '../../../utils/hooks/useQuery';
import historyObject from '../../../utils/historyObject';
import SheetMenu from './SheetMenu';
import { TextInput } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

//Styles:
import styled from 'styled-components';
import { CaretDown } from '@styled-icons/fluentui-system-filled/CaretDown';

const DropdownIcon = styled(CaretDown)`
    height: 1rem;
    width: 1rem;
    color: #ffffff;
`;

const MainContainer = styled.div<ITabContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    text-decoration: none;
    background: ${({ isSelected }) => (isSelected ? '#e07133' : '#2c2c2c')};
    width: fit-content;
    height: 100%;
    padding: 0rem 1rem;
    outline: 1px solid #d6d6d6;
    margin-top: 1px;
    margin-left: 1px;
    cursor: pointer;
    transition: all 0.15s linear;
    column-gap: 0.5rem;

    &:hover {
        background: ${({ isSelected }) => (isSelected ? '#e07133' : '#464646')};
    }
`;

const SheetTitleContainer = styled.div``;

const DropdownIconButton = styled.button<ITabContainerProps>`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
    transition: all 0.1s linear;

    &:hover {
        background: ${({ isSelected }) => (isSelected ? '#c2591e' : '#2c2c2c')};
    }
`;

//Interfaces:

interface ITabContainerProps {
    isSelected: boolean;
}

interface IComponentProps {
    sheetId: string;
    sheetName: string;
    templateId: string;
}

export const SheetTab = ({
    sheetId,
    sheetName,
    templateId,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const query = useQuery();
    const currentSheetId = query.get('sheetId')
        ? query.get('sheetId')
        : undefined;

    const [isSheetMenuOpened, toggleSheetMenu] = useState(false);
    const [isTextFieldActive, toggleTextField] = useState(false);
    const [newSheetName, setNewSheetName] = useState(sheetName);

    const handleEscapeKey = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
            //Discard user edits.
            setNewSheetName(sheetName);
            toggleTextField(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [sheetName]);

    const shouldHighlightTab = (): boolean => {
        if (!currentSheetId || !sheetId || currentSheetId !== sheetId) {
            return false;
        }

        return true;
    };

    const handleUpdateSheetName = (): void => {
        if (newSheetName === '' || newSheetName === sheetName) {
            setNewSheetName(sheetName);
            return toggleTextField(false);
        }

        dispatch(
            updateSheet(templateId, sheetId, {
                sheetName: newSheetName,
            })
        );

        return toggleTextField(false);
    };

    const inputRef = useClickOutside(() => {
        handleUpdateSheetName();
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewSheetName(e.target.value);
    };

    const handleOnKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        //Esc key triggers textField to close. Esc key does not fire keyPress.
        if (e.key === 'Enter') {
            handleUpdateSheetName();
        }
    };

    const showTextFieldOrName = (): JSX.Element => {
        if (!isTextFieldActive) {
            return (
                <Text
                    text={newSheetName}
                    textColor="#ffffff"
                    fontWeight="500"
                    fontSize=".9rem"
                    textShadow={
                        shouldHighlightTab()
                            ? '1px 1px 1px rgba(0,0,0,.25)'
                            : 'none'
                    }
                />
            );
        }

        return (
            <TextInput
                ref={inputRef}
                autoFocus
                value={newSheetName}
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
                        width: '10rem',
                        minHeight: '0',
                    },
                }}
                onKeyPress={handleOnKeyPress}
            />
        );
    };

    return (
        <MainContainer
            isSelected={shouldHighlightTab()}
            onClick={() =>
                historyObject.push(`/file/${templateId}?sheetId=${sheetId}`)
            }
        >
            <SheetTitleContainer>{showTextFieldOrName()}</SheetTitleContainer>
            <DropdownIconButton
                isSelected={shouldHighlightTab()}
                onClick={() => toggleSheetMenu(!isSheetMenuOpened)}
            >
                <SheetMenu
                    isSheetMenuOpened={isSheetMenuOpened}
                    toggleSheetMenu={toggleSheetMenu}
                    controlElement={<DropdownIcon />}
                    toggleTextField={toggleTextField}
                />
            </DropdownIconButton>
        </MainContainer>
    );
};
