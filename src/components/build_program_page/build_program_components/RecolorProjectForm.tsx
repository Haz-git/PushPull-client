import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import { updateProject } from '../../../redux/builder/builderActions';

//Components:
import { useNotifications } from '@mantine/notifications';
import { ColorInput } from '@mantine/core';

//Styles:
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

//Interfaces

interface IComponentProps {
    projectUuid: string;
    toggleRecolorProjectModal: (status: boolean, projectUuid?: string) => void;
}

const RecolorProjectForm = ({
    projectUuid,
    toggleRecolorProjectModal,
}: IComponentProps): JSX.Element => {
    const notifications = useNotifications();
    const dispatch = useDispatch();
    const [newProjectColor, setNewProjectColor] = useState('#ffffff');

    const toggleLoadingNotif = () => {
        let id = notifications.showNotification({
            title: 'Project Is Being Recolored...',
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
                title: 'Your Project Failed To Be Recolored!',
                message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                autoClose: 3000,
                icon: <CancelIcon />,
            });
        return notifications.updateNotification(id, {
            id,
            color: 'teal',
            title: 'Project Has Been Recolored!',
            message: '',
            autoClose: 3000,
            icon: <CheckIcon />,
        });
    };

    const generateRandomHexColor = () => {
        setNewProjectColor(
            '#'.concat(Math.floor(Math.random() * 16777215).toString(16))
        );
    };

    const handleNewProjectColorSubmission = () => {
        dispatch(
            updateProject(
                toggleLoadingNotif,
                updateLoadingNotif,
                { projectColorHex: newProjectColor },
                projectUuid
            )
        );

        return toggleRecolorProjectModal(false);
    };

    return (
        <MainContainer>
            <InputContainer>
                <ColorInput
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                    }}
                    placeholder="Pick color"
                    label="Project Color"
                    disallowInput
                    dropdownZIndex={9999}
                    onChange={(e: string) => setNewProjectColor(e)}
                    value={newProjectColor}
                    rightSection={
                        <RandomButton onClick={generateRandomHexColor}>
                            <RandomIcon />
                        </RandomButton>
                    }
                />
            </InputContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Recolor"
                    width="7rem"
                    buttonBackground="#41A312"
                    fontSize="1rem"
                    height="2rem"
                    leftIconMargin="0rem .3rem -.2rem 0rem"
                    onClick={handleNewProjectColorSubmission}
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
                    onClick={() => toggleRecolorProjectModal(false)}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default RecolorProjectForm;
