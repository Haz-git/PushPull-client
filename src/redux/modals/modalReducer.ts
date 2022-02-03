import { ModalActionTypes } from './action-types';
import { ModalAction } from './modalInterfaces';

const initialState: any = {
    DELETE_SHEET_CONFIRMATION: {
        isOpen: false,
    },
};

export const modalReducer = (state: {} = initialState, action: ModalAction) => {
    if (!Object.keys(ModalActionTypes).includes(action.type)) {
        return state;
    }

    return { ...state, [action.type]: action.payload };
};
