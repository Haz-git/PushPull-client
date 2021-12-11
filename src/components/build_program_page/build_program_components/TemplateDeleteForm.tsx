import * as React from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import { deleteTemplate } from '../../../redux/templates/templateActions';
//Components:
import { useNotifications } from '@mantine/notifications';

//Styles:
import styled from 'styled-components';
import {
    CheckIcon,
    CancelIcon,
    MainContainer,
    ButtonContainer,
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
    templateId: string;
    projectUuid?: string | null | undefined;
    toggleDeleteTemplateModal: (
        status: boolean,
        templateId: string,
        projectUuid?: string | null
    ) => void;
}

const TemplateDeleteForm = ({
    templateId,
    projectUuid,
    toggleDeleteTemplateModal,
}: IComponentProps): JSX.Element => {
    const notifications = useNotifications();
    const dispatch = useDispatch();

    const toggleLoadingNotif = () => {
        let id = notifications.showNotification({
            title: 'Template is being deleted...',
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
                title: 'Your template failed to be deleted',
                message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                autoClose: 3000,
                icon: <CancelIcon />,
            });
        return notifications.updateNotification(id, {
            id,
            color: 'teal',
            title: 'Your template has been deleted',
            message: '',
            autoClose: 3000,
            icon: <CheckIcon />,
        });
    };

    const handleTemplateDeletion = () => {
        dispatch(
            deleteTemplate(
                toggleLoadingNotif,
                updateLoadingNotif,
                templateId,
                projectUuid
            )
        );

        return toggleDeleteTemplateModal(false, templateId);
    };
    return (
        <MainContainer>
            <TextContainer>
                <Text
                    text="This action is irreversible and this template will not be recoverable."
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
                    onClick={handleTemplateDeletion}
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
                    onClick={() => toggleDeleteTemplateModal(false, templateId)}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default TemplateDeleteForm;
