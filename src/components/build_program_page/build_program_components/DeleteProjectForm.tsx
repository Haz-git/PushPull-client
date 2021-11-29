import * as React from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../../redux/builder/builderActions';

//Components:
import { useNotifications } from '@mantine/notifications';

//Styles:
import styled from 'styled-components';
import {
    MainContainer,
    InputContainer,
    ButtonContainer,
    CheckIcon,
    CancelIcon,
    RandomButton,
    RandomIcon,
} from './AddProjectForm';
import GeneralButton from '../../general_components/GeneralButton';
import Text from '../../general_components/Text';

const TextContainer = styled.div`
    padding: 0.5rem 0;
`;

const TextDivider = styled.div`
    height: 0.5rem;
`;

//Interfaces:

interface IComponentProps {
    projectUuid: string;
    toggleDeleteProjectModal: (status: boolean, projectUuid?: string) => void;
}

const DeleteProjectForm = ({
    projectUuid,
    toggleDeleteProjectModal,
}: IComponentProps): JSX.Element => {
    const notifications = useNotifications();
    const dispatch = useDispatch();

    const toggleLoadingNotif = () => {
        let id = notifications.showNotification({
            title: 'Project Is Being Deleted...',
            message: '',
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
            message: '',
            autoClose: 3000,
            icon: <CheckIcon />,
        });
    };

    const handleNewProjectDeletion = () => {
        dispatch(
            deleteProject(toggleLoadingNotif, updateLoadingNotif, projectUuid)
        );

        return toggleDeleteProjectModal(false);
    };

    return (
        <MainContainer>
            <TextContainer>
                <Text
                    text="Deleting your project will permanently remove the project along with all of its contained templates."
                    subText={true}
                    fontSize="1rem"
                    fontWeight="800"
                />
                <TextDivider />
                <Text
                    text="This action is irreversible and this project will not be recoverable."
                    subText={true}
                    fontSize="1rem"
                    fontWeight="800"
                    textColor="#AF1432"
                />
                <TextDivider />
                <Text
                    text="Please consider carefully."
                    subText={true}
                    fontSize="1rem"
                    fontWeight="800"
                />
            </TextContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Delete"
                    width="6rem"
                    buttonBackground="#AF1432"
                    fontSize="1rem"
                    height="2rem"
                    leftIconMargin="0rem .3rem -.2rem 0rem"
                    onClick={handleNewProjectDeletion}
                />
                <GeneralButton
                    buttonLabel="Cancel"
                    width="6rem"
                    buttonBackground="#ececec"
                    buttonTextColor="rgba(0, 0, 34, 1)"
                    textShadow="none"
                    disableShadow={true}
                    hoverShadow="none"
                    border="1px solid #c6c6c6"
                    fontSize="1rem"
                    height="2rem"
                    onClick={() => toggleDeleteProjectModal(false)}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default DeleteProjectForm;
