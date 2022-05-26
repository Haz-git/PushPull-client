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
    const template = useSelector((state: RootStateOrAny) => state?.template);

    const composeInputsPostDeletion = (): any[] => {
        let savedQuestions = [...currentSavedQuestions];
        const targetIndex = savedQuestions.findIndex(
            (question) => question.id === currentSelectedQuestionId
        );

        savedQuestions.splice(targetIndex, 1);
        return savedQuestions;
    };

    const handleViewerInputDeletion = (): void => {
        if (!currentSelectedQuestionId) {
            return;
        }

        const newInputsArray = composeInputsPostDeletion();

        dispatch(
            updateTemplate(
                (status) => {},
                template.id,
                { templateUserInputs: newInputsArray },
                true,
                false,
                null,
                null,
                loaderTypes.VIEWER_INTERACTIONS_SETTINGS_MODAL
            )
        );

        dispatch(
            toggleModal(ModalActionTypes.deleteViewerInputPopover, 'CLOSE')
        );

        resetQuestionId();
    };

    return (
        <MainContainer>
            <div>
                <Text
                    text="Deleting this input will unlink all blocks connected to this input"
                    subText={true}
                    fontSize=".9rem"
                    fontWeight="800"
                />
                <TextDivider />
                <Text
                    text="This action is irreversible."
                    subText={true}
                    fontSize=".9rem"
                    fontWeight="800"
                    textColor="#AF1432"
                />
                <TextDivider />
            </div>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Delete"
                    width="6rem"
                    buttonBackground="#AF1432"
                    fontSize="1rem"
                    height="2rem"
                    leftIconMargin="0rem .3rem -.2rem 0rem"
                    onClick={handleViewerInputDeletion}
                />
            </ButtonContainer>
        </MainContainer>
    );
};
