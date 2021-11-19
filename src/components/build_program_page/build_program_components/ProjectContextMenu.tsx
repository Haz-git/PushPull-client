import * as React from 'react';

//Components:
import { Menu, Item, Separator, theme, animation } from 'react-contexify';

//Styles:
import styled from 'styled-components';
import 'react-contexify/dist/ReactContexify.css';

const StyledMenu = styled(Menu)`
    .react-contexify__separator {
        background: #dfdfdf;
    }
    .react-contexify__item {
        color: #81898f;
        font-size: 1em;
        font-weight: 500;
        font-family: 'Lato';
    }

    .react-contexify__item:not(.react-contexify__item--disabled):hover
        > .react-contexify__item__content,
    .react-contexify__item:not(.react-contexify__item--disabled):focus
        > .react-contexify__item__content {
        background-color: rgba(66, 99, 235, 0.85);
    }
`;

//Interfaces:
interface IComponentProps {
    id: string | number;
}

const ProjectContextMenu = ({ id }: IComponentProps): JSX.Element => {
    return (
        <StyledMenu id={id} animation={animation.fade}>
            <Item>Rename</Item>
            <Separator />
            <Item>Move</Item>
            <Separator />
            <Item>Star / Unstar</Item>
            <Separator />
            <Item>Delete</Item>
        </StyledMenu>
    );
};

export default ProjectContextMenu;
