import * as React from 'react';
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
import { TextInput } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';

//Interfaces:

interface IComponentProps {
    projectUuid: string;
    toggleRenameProjectModal: (status: boolean, projectUuid?: string) => void;
}

const RenameProjectForm = ({
    projectUuid,
    toggleRenameProjectModal,
}: IComponentProps): JSX.Element => {
    const notifications = useNotifications();
    const dispatch = useDispatch();
    const [newProjectName, setNewProjectName] = useState('');

    const [hasError, setHasError] = useState(false);

    const toggleLoadingNotif = () => {
        let id = notifications.showNotification({
            title: 'Project Is Being Renamed...',
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
                title: 'Your Project Failed To Be Renamed!',
                message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                autoClose: 3000,
                icon: <CancelIcon />,
            });
        return notifications.updateNotification(id, {
            id,
            color: 'teal',
            title: 'Project Has Been Renamed!',
            message: '',
            autoClose: 3000,
            icon: <CheckIcon />,
        });
    };

    const isProjectNameLengthOk = () => {
        if (newProjectName.length === 0) return false;
        if (newProjectName.length <= 3) return false;
        if (newProjectName.length >= 4 && newProjectName.length <= 100)
            return true;

        return false;
    };

    const handleNewProjectNameSubmission = () => {
        if (isProjectNameLengthOk()) {
            dispatch(
                updateProject(
                    toggleLoadingNotif,
                    updateLoadingNotif,
                    {
                        projectName: newProjectName,
                    },
                    projectUuid
                )
            );
            return toggleRenameProjectModal(false);
        }

        return setHasError(true);
    };

    const handleTextOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (hasError) setHasError(false);
        setNewProjectName(e.target.value);
    };

    return (
        <MainContainer>
            {hasError && (
                <TextContainer>
                    <Text
                        text="Please name your project between 4 - 100 characters."
                        textColor="#AF1432"
                    />
                </TextContainer>
            )}
            <InputContainer>
                <TextInput
                    type="text"
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
                    label="New Project Name"
                    placeholder={'Rename your project'}
                    value={newProjectName}
                    onChange={handleTextOnChange}
                    error={hasError}
                />
            </InputContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Rename"
                    width="7rem"
                    buttonBackground="#41A312"
                    fontSize="1rem"
                    height="2rem"
                    leftIconMargin="0rem .3rem -.2rem 0rem"
                    onClick={handleNewProjectNameSubmission}
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
                    onClick={() => toggleRenameProjectModal(false)}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default RenameProjectForm;
