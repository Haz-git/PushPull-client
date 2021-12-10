import * as React from 'react';

//Components:
import { Menu, Item, Separator, theme, animation } from 'react-contexify';

//Styles:
import 'react-contexify/dist/ReactContexify.css';
import styled from 'styled-components';

import {
    ItemContainer,
    StyledMenu,
    RenameIcon,
    DeleteIcon,
} from './ProjectContextMenu';

interface IComponentProps {
    id: string | number;
}

const TemplateContextMenu = ({ id }: IComponentProps): JSX.Element => {
    return (
        <StyledMenu id={id} animation={animation.fade} theme={theme.dark}>
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
