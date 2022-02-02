import { Dispatch } from 'redux';
import { ModalAction } from './modalInterfaces';
import { ModalActionTypes } from './action-types';

export const toggleModal = (
    modalType: any,
    action: 'OPEN' | 'CLOSE'
): Function => {
    return async (dispatch: Dispatch<ModalAction>) => {
        if (!Object.values(ModalActionTypes).includes(modalType)) {
            return;
        }

        let shouldModalOpen = true;

        if (action !== 'OPEN') {
            shouldModalOpen = false;
        }

        return dispatch({
            type: modalType,
            payload: {
                isOpen: shouldModalOpen,
            },
        });
    };
};