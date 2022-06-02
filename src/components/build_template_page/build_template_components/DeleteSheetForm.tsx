import * as React from 'react';

//redux:
import { useDispatch } from 'react-redux';
import { deleteSheet } from '../../../redux/templates/templateActions';
import { toggleModal } from '../../../redux/modals/modalActions';
import { ModalActionTypes } from '../../../redux/modals/action-types';

//Components
import GeneralButton from '../../general_components/GeneralButton';
import Text from '../../general_components/Text';

//Styles
import styled from 'styled-components';

import {
    MainContainer,
    ButtonContainer,
} from '../../build_program_page/build_program_components/AddProjectForm';

const TextDivider = styled.div`
    height: 0.5rem;
`;
//Interfaces

interface IComponentProps {
    sheetId: string | null;
    templateId: string;
}

export const DeleteSheetForm = ({
    sheetId,
    templateId,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();

    const handleDeleteSheetRequest = (): undefined => {
        if (!sheetId || !templateId) {
            return;
        }

        dispatch(deleteSheet(templateId, sheetId));
        dispatch(
            toggleModal(ModalActionTypes.deleteSheetConfirmation, 'CLOSE')
        );
    };

    return (
        <MainContainer>
            <div>
                <Text
                    text="Deleting your sheet will permanently remove the sheet along with all of its contained blocks."
                    subText={true}
                    fontSize="1rem"
                    fontWeight="800"
                />
                <TextDivider />
                <Text
                    text="This action is irreversible and this sheet will not be recoverable."
                    subText={true}
                    fontSize="1rem"
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
                    onClick={handleDeleteSheetRequest}
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
                    onClick={() =>
                        dispatch(
                            toggleModal(
                                ModalActionTypes.deleteSheetConfirmation,
                                'CLOSE'
                            )
                        )
                    }
                />
            </ButtonContainer>
        </MainContainer>
    );
};
