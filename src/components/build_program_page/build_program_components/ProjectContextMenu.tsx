import * as React from 'react';

//Redux:

//Components:
import { Menu, Item, Separator, theme, animation } from 'react-contexify';
import { useNotifications } from '@mantine/notifications';

//Styles:
import styled from 'styled-components';
import 'react-contexify/dist/ReactContexify.css';
import {
    CheckIcon,
    CancelIcon,
} from '../build_program_components/AddProjectForm';
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
    const notifications = useNotifications();

    const toggleLoadingNotif = () => {
        let id = notifications.showNotification({
            title: 'Project Is Being Deleted...',
            message: 'This is a non-reversable process.',
            color: 'orange',
            autoClose: false,
            disallowClose: true,
            loading: true,
        });

        return id;
    };

    const updateLoadingNotif = (id: string, status: boolean) => {
        if (status !== true)
            return notifications.updateNotification(id, {
                id,
                color: 'red',
                title: 'Your Project Failed To Be Deleted!',
                message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                autoClose: 3000,
                icon: <CancelIcon />,
            });
        return notifications.updateNotification(id, {
            id,
            color: 'teal',
            title: 'Project Has Been Deleted!',
            message: 'This is a non-reversable action.',
            autoClose: 3000,
            icon: <CheckIcon />,
        });
    };

    const handleDeleteProject = ({
        props: { projectUuid, toggleDeleteProjectModal },
    }: any) => {
        toggleDeleteProjectModal(true, projectUuid);
        // console.log(projectUuid);
        // dispatch(
        //     deleteProject(
        //         (status) => console.log(status),
        //         toggleLoadingNotif,
        //         updateLoadingNotif,
        //         projectUuid
        //     )
        // );
    };

    const handleRenameProject = ({
        props: { projectUuid, toggleRenameProjectModal },
    }: any) => {
        toggleRenameProjectModal(true, projectUuid);
    };

    const handleRecolorProject = ({
        props: { projectUuid, toggleRecolorProjectModal },
    }: any) => {
        toggleRecolorProjectModal(true, projectUuid);
    };

    return (
        <StyledMenu id={id} animation={animation.fade} theme={theme.dark}>
            <Item onClick={handleRenameProject}>
                <ItemContainer>
                    <RenameIcon />
                    Rename Project
                </ItemContainer>
            </Item>
            <Separator />
            <Item onClick={handleRecolorProject}>
                <ItemContainer>
                    <ColorIcon />
                    Change Color
                </ItemContainer>
            </Item>
            <Separator />
            <Item onClick={handleDeleteProject}>
                <ItemContainer>
                    <DeleteIcon />
                    Delete Project
                </ItemContainer>
            </Item>
        </StyledMenu>
    );
};

export default ProjectContextMenu;
