import * as React from 'react';

//Components:
import { Menu, Item, Separator, theme, animation } from 'react-contexify';

//Styles:
import 'react-contexify/dist/ReactContexify.css';
import styled from 'styled-components';
import { Open } from '@styled-icons/fluentui-system-filled/Open';
import { Window } from '@styled-icons/fluentui-system-regular/Window';
import {
    ItemContainer,
    StyledMenu,
    RenameIcon,
    DeleteIcon,
} from './ProjectContextMenu';

const NewTabIcon = styled(Open)`
    color: #ffffff;
    height: 1.25rem;
    width: 1.25rem;
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
    return (
        <StyledMenu id={id} animation={animation.fade} theme={theme.dark}>
            <Item>
                <ItemContainer>
                    <BrowserIcon />
                    Open
                </ItemContainer>
            </Item>
            <Separator />
            <Item>
                <ItemContainer>
                    <NewTabIcon />
                    Open In New Tab
                </ItemContainer>
            </Item>
            <Separator />
            <Item>
                <ItemContainer>
                    <RenameIcon />
                    Rename Template
                </ItemContainer>
            </Item>
            <Separator />
            <Item>
                <ItemContainer>
                    <DeleteIcon />
                    Delete Template
                </ItemContainer>
            </Item>
        </StyledMenu>
    );
};

export default TemplateContextMenu;
