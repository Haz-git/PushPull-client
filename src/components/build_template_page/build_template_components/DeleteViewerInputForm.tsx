import * as React from 'react';

//Redux:
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { ModalActionTypes } from '../../../redux/modals/action-types';
import { toggleModal } from '../../../redux/modals/modalActions';
import { updateTemplate } from '../../../redux/templates/templateActions';
import { loaderTypes } from '../../../redux/uiLoader/loader-types';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';
import { ButtonContainer } from '../../build_program_page/build_program_components/AddProjectForm';

const MainContainer = styled.div`
    width: 14rem;
`;

const TextDivider = styled.div`
    height: 0.5rem;
`;

//Interfaces:
interface IComponentProps {
    currentSelectedQuestionId: string;
    resetQuestionId: () => void;
}

export const DeleteViewerInputForm = ({
    currentSelectedQuestionId,
    resetQuestionId,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const currentSavedQuestions = useSelector(
        (state: RootStateOrAny) => state?.template?.templateUserInputs
    );
    return <div>DeleteViewerInputForm</div>;
};
