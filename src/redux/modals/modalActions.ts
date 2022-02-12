import { Dispatch } from 'redux';
import { ModalAction } from './modalInterfaces';
import { ModalActionTypes } from './action-types';

export const toggleModal = (
    modalType: any,
    action: 'OPEN' | 'CLOSE',
    modalProps?: any
): Function => {
    return async (dispatch: Dispatch<ModalAction>) => {
        if (!Object.values(ModalActionTypes).includes(modalType)) {
            return;
        }

        return dispatch({
            type: modalType,
            payload: {
                isOpen: action === 'OPEN',
                modalProps: modalProps || {},
            },
        });
    };
};
