import * as React from 'react';

//Components:
import { Menu, Item, Separator, theme, animation } from 'react-contexify';

//Styles:
import 'react-contexify/dist/ReactContexify.css';
import styled from 'styled-components';
import { WindowMultiple } from '@styled-icons/fluentui-system-regular/WindowMultiple';
import { Window } from '@styled-icons/fluentui-system-regular/Window';
import {
    ItemContainer,
    StyledMenu,
    RenameIcon,
    DeleteIcon,
} from './ProjectContextMenu';
import historyObject from '../../../utils/historyObject';

const NewTabIcon = styled(WindowMultiple)`
    color: #ffffff;
    height: 1.3rem;
    width: 1.3rem;
`;

const BrowserIcon = styled(Window)`
    color: #ffffff;
    height: 1.35rem;
    width: 1.35rem;
`;

interface IComponentProps {
    id: string | number;
}

const TemplateContextMenu = ({ id }: IComponentProps): JSX.Element => {
    const handleOpen = ({ props: { templateUuid } }: any) => {
        historyObject.push(`/file/${templateUuid}`);
    };

    const handleOpenInNewTab = ({ props: { templateUuid } }: any) => {
        let currHost = window.location.host;

        if (currHost.includes('localhost')) {
            return window.open(
                `http://${window.location.host}/file/${templateUuid}`
            );
        }
        return window.open(
            `https://${window.location.host}/file/${templateUuid}`
        );
    };

    const handleNewTitleInput = ({ props: { toggleNewTitleInput } }: any) => {
        toggleNewTitleInput(true);
    };

    const handleDelete = ({ props: { handleDeleteRequest } }: any) => {
        handleDeleteRequest();
    };

    return (
        <StyledMenu id={id} animation={animation.fade} theme={theme.dark}>
            <Item onClick={handleOpen}>
                <ItemContainer>
                    <BrowserIcon />
                    Open
                </ItemContainer>
            </Item>
            <Separator />
            <Item onClick={handleOpenInNewTab}>
                <ItemContainer>
                    <NewTabIcon />
                    Open In New Tab
                </ItemContainer>
            </Item>
            <Separator />
            <Item onClick={handleNewTitleInput}>
                <ItemContainer>
                    <RenameIcon />
                    Rename Template
                </ItemContainer>
            </Item>
            <Separator />
            <Item onClick={handleDelete}>
                <ItemContainer>
                    <DeleteIcon />
                    Delete Template
                </ItemContainer>
            </Item>
        </StyledMenu>
    );
};

export default TemplateContextMenu;
