import * as React from 'react';

//Components:
import { Menu, MenuItem, Divider } from '@mantine/core';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';
import {
    RenameIcon,
    DeleteIcon,
} from '../../build_program_page/build_program_components/ProjectContextMenu';

const DarkRenameIcon = styled(RenameIcon)`
    color: rgba(0, 0, 34, 0.7);
`;

const DarkTrashIcon = styled(DeleteIcon)`
    color: rgba(0, 0, 34, 0.7);
    margin: 0rem 0rem;
`;

//Interfaces:

interface IComponentProps {
    isSheetMenuOpened: boolean;
    toggleSheetMenu: (status: boolean) => void;
    controlElement: React.ReactElement;
}

const SheetMenu = ({
    isSheetMenuOpened,
    toggleSheetMenu,
    controlElement,
}: IComponentProps): JSX.Element => {
    return (
        <Menu
            size={170}
            position="top"
            placement="center"
            gutter={15}
            opened={isSheetMenuOpened}
            onClose={() => toggleSheetMenu(false)}
            control={controlElement}
        >
            <Menu.Item icon={<DarkRenameIcon />}>
                <Text text="Rename Sheet" subText={true} fontSize=".9rem" />
            </Menu.Item>
            <Divider />
            <Menu.Item color="red" icon={<DarkTrashIcon />}>
                <Text text="Delete Sheet" subText={true} fontSize=".90rem" />
            </Menu.Item>
        </Menu>
    );
};

export default SheetMenu;
