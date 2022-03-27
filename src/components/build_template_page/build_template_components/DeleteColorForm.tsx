import * as React from 'react';

//Redux:
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { ModalActionTypes } from '../../../redux/modals/action-types';
import { toggleModal } from '../../../redux/modals/modalActions';
import { updateTemplate } from '../../../redux/templates/templateActions';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';
import { ButtonContainer } from '../../build_program_page/build_program_components/AddProjectForm';
import { loaderTypes } from '../../../redux/uiLoader/loader-types';

const MainContainer = styled.div`
    width: 14rem;
`;

const TextDivider = styled.div`
    height: 0.5rem;
`;

//Interfaces:
interface IComponentProps {
    currentSelectedColorId: string;
    resetColorId: () => void;
}

export const DeleteColorForm = ({
    currentSelectedColorId,
    resetColorId,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const currentSavedColors = useSelector(
        (state: RootStateOrAny) => state?.template?.templateLegend
    );
    const template = useSelector((state: RootStateOrAny) => state?.template);

    const composeColorsPostDeletion = (): any[] => {
        let savedColors = [...currentSavedColors];
        const targetIndex = savedColors.findIndex(
            (color) => color.id === currentSelectedColorId
        );
        savedColors.splice(targetIndex, 1);
        return savedColors;
    };

    const handleColorDeletion = (): void => {
        if (!currentSelectedColorId) {
            return;
        }

        const newColorArray = composeColorsPostDeletion();

        dispatch(
            updateTemplate(
                (status) => {},
                template.id,
                { templateLegend: newColorArray },
                true,
                false,
                null,
                null,
                loaderTypes.VIEWER_INTERACTIONS_SETTINGS_MODAL
            )
        );

        dispatch(
            toggleModal(ModalActionTypes.DELETE_COLOR_SWATCH_POPOVER, 'CLOSE')
        );

        resetColorId();
    };

    return (
        <MainContainer>
            <div>
                <Text
                    text="Deleting your color will unlink all blocks connected to this color."
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
                    onClick={handleColorDeletion}
                />
            </ButtonContainer>
        </MainContainer>
    );
};
