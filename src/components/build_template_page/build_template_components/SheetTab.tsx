import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
import useQuery from '../../../utils/hooks/useQuery';
import historyObject from '../../../utils/historyObject';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.button<ITabContainerProps>`
    border: none;
    text-decoration: none;
    background: ${({ isSelected }) => (isSelected ? '#e07133' : '#2c2c2c')};
    width: fit-content;
    height: 100%;
    padding: 0rem 1.5rem;
    outline: 1px solid #d6d6d6;
    margin-top: 1px;
    margin-left: 1px;
    cursor: pointer;
    transition: all 0.15s linear;

    &:hover {
        background: ${({ isSelected }) => (isSelected ? '#e07133' : '#464646')};
    }
`;

const SheetTitleContainer = styled.div``;

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
        </MainContainer>
    );
};
