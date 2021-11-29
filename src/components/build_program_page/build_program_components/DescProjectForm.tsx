import React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import { updateProject } from '../../../redux/builder/builderActions';

//Components:
import { useNotifications } from '@mantine/notifications';

//Styles:
import {
    MainContainer,
    TextContainer,
    InputContainer,
    ButtonContainer,
    CheckIcon,
    CancelIcon,
} from './AddProjectForm';
import Text from '../../general_components/Text';
import { Textarea } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';

//Interfaces:

interface IComponentProps {
    projectUuid: string;
    toggleDescProjectModal: (status: boolean, projectUuid?: string) => void;
    currProjectDesc?: string;
}

const DescProjectForm = ({
    projectUuid,
    toggleDescProjectModal,
    currProjectDesc,
}: IComponentProps): JSX.Element => {
    const notifications = useNotifications();
    const dispatch = useDispatch();
    const [newProjectDesc, setNewProjectDesc] = useState(currProjectDesc);

    const toggleLoadingNotif = () => {
        let id = notifications.showNotification({
            title: 'Project Description Updating...',
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
                title: 'Your Project Description Was Not Updated!',
                message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                autoClose: 3000,
                icon: <CancelIcon />,
            });
        return notifications.updateNotification(id, {
            id,
            color: 'teal',
            title: 'Project Description Has Been Updated.',
            message: '',
            autoClose: 3000,
            icon: <CheckIcon />,
        });
    };

    const handleNewProjectDescSubmission = () => {
        dispatch(
            updateProject(
                toggleLoadingNotif,
                updateLoadingNotif,
                {
                    projectDesc: newProjectDesc,
                },
                projectUuid
            )
        );
        return toggleDescProjectModal(false);
    };

    return (
        <MainContainer>
            <InputContainer>
                <Textarea
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 500,
                        },
                    }}
                    required
                    label="New Project Description"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setNewProjectDesc(e.target.value);
                    }}
                    value={newProjectDesc}
                />
            </InputContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Save"
                    width="6rem"
                    buttonBackground="#41A312"
                    fontSize="1rem"
                    height="2rem"
                    leftIconMargin="0rem .3rem -.2rem 0rem"
                    onClick={handleNewProjectDescSubmission}
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
                    onClick={() => toggleDescProjectModal(false)}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default DescProjectForm;
