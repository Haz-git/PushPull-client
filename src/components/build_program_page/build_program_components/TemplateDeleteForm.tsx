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

const TemplateDeleteForm = () => {
    return <div>templateDelete</div>;
};

export default TemplateDeleteForm;
