import * as React from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { toggleModal } from '../../../redux/modals/modalActions';
import { ModalActionTypes } from '../../../redux/modals/action-types';

//Components:
import { Menu, Divider } from '@mantine/core';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';
import { CancelIcon } from '../../build_program_page/build_program_components/AddProjectForm';
import {
    RenameIcon,
    DeleteIcon,
} from '../../build_program_page/build_program_components/ProjectContextMenu';
import { useNotifications } from '@mantine/notifications';

const DarkRenameIcon = styled(RenameIcon)`
    color: rgba(0, 0, 34, 1);
`;

const DarkTrashIcon = styled(DeleteIcon)`
    color: rgba(0, 0, 34, 1);
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
    const dispatch = useDispatch();
    const notifications = useNotifications();
    const sheets = useSelector(
        (state: RootStateOrAny) => state?.template?.templateEditingSurfaceBlocks
    );

    const sheetCount = sheets.length;

    const handleSheetDeletionRequest = (): Function | undefined => {
        if (sheetCount === 1) {
            notifications.showNotification({
                title: 'You may not delete your only sheet.',
                message: '',
                color: 'red',
                autoClose: 3000,
                icon: <CancelIcon />,
            });

            return;
        }

        return dispatch(
            toggleModal(ModalActionTypes.DELETE_SHEET_CONFIRMATION, 'OPEN')
        );

        // return dispatch(deleteSheet(templateId, sheetId));
    };

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
            <Menu.Item
                icon={<DarkRenameIcon />}
                onClick={() => alert('Under Construction..')}
            >
                <Text text="Rename Sheet" mainText={true} fontSize=".9rem" />
            </Menu.Item>
            <Divider />
            <Menu.Item
                color="red"
                icon={<DarkTrashIcon />}
                onClick={handleSheetDeletionRequest}
            >
                <Text text="Delete Sheet" mainText={true} fontSize=".90rem" />
            </Menu.Item>
        </Menu>
    );
};

export default SheetMenu;
