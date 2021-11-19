import * as React from 'react';

//Components:
import { Menu, Item, Separator, theme, animation } from 'react-contexify';

//Styles:
import styled from 'styled-components';
import 'react-contexify/dist/ReactContexify.css';

import { Color } from '@styled-icons/fluentui-system-regular/Color';
import { Rename } from '@styled-icons/fluentui-system-regular/Rename';
import { Delete } from '@styled-icons/fluentui-system-regular/Delete';

const ColorIcon = styled(Color)`
    color: #ffffff;
    height: 1.3rem;
    width: 1.3rem;
`;

const RenameIcon = styled(Rename)`
    color: #ffffff;
    height: 1.3rem;
    width: 1.3rem;
`;

const DeleteIcon = styled(Delete)`
    color: #ffffff;
    height: 1.5rem;
    width: 1.5rem;
    margin: -0.8rem -0.1rem;
`;

const StyledMenu = styled(Menu)`
    .react-contexify__item {
        padding: 0;
        margin: 0;
        color: #ffffff;
        font-size: 0.85rem;
        font-weight: 500;
        font-family: 'Lato';
    }

    .react-contexify__item:not(.react-contexify__item--disabled):hover
        > .react-contexify__item__content,
    .react-contexify__item:not(.react-contexify__item--disabled):focus
        > .react-contexify__item__content {
        background-color: rgba(66, 99, 235, 1);
    }
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 0.5rem;
`;

//Interfaces:
interface IComponentProps {
    id: string | number;
}

const ProjectContextMenu = ({ id }: IComponentProps): JSX.Element => {
    return (
        <StyledMenu id={id} animation={animation.fade} theme={theme.dark}>
            <Item>
                <ItemContainer>
                    <RenameIcon />
                    Rename Project
                </ItemContainer>
            </Item>
            <Separator />
            <Item>
                <ItemContainer>
                    <ColorIcon />
                    Change Color
                </ItemContainer>
            </Item>
            <Separator />
            <Item>
                <ItemContainer>
                    <DeleteIcon />
                    Delete Project
                </ItemContainer>
            </Item>
        </StyledMenu>
    );
};

export default ProjectContextMenu;
