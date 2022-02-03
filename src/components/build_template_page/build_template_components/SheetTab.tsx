import * as React from 'react';
import { useState } from 'react';

//Components:
import Text from '../../general_components/Text';
import useQuery from '../../../utils/hooks/useQuery';
import historyObject from '../../../utils/historyObject';
import SheetMenu from './SheetMenu';

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
    const query = useQuery();
    const currSheetId = query.get('sheetId') ? query.get('sheetId') : undefined;

    const [isSheetMenuOpened, toggleSheetMenu] = useState(false);

    const shouldHighlightTab = (): boolean => {
        if (!currSheetId || !sheetId || currSheetId !== sheetId) {
            return false;
        }

        return true;
    };

    return (
        <MainContainer
            isSelected={shouldHighlightTab()}
            onClick={() =>
                historyObject.push(`/file/${templateId}?sheetId=${sheetId}`)
            }
        >
            <SheetTitleContainer>
                <Text
                    text={sheetName}
                    textColor="#ffffff"
                    fontWeight="500"
                    fontSize=".9rem"
                    textShadow={
                        shouldHighlightTab()
                            ? '1px 1px 1px rgba(0,0,0,.25)'
                            : 'none'
                    }
                />
            </SheetTitleContainer>
            <DropdownIconButton
                isSelected={shouldHighlightTab()}
                onClick={() => toggleSheetMenu(!isSheetMenuOpened)}
            >
                <SheetMenu
                    isSheetMenuOpened={isSheetMenuOpened}
                    toggleSheetMenu={toggleSheetMenu}
                    controlElement={<DropdownIcon />}
                />
            </DropdownIconButton>
        </MainContainer>
    );
};
