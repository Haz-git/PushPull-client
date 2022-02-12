import { ModalActionTypes } from './action-types';
import { ModalAction } from './modalInterfaces';

const initialState: any = {
    EDIT_BLOCK: {
        isOpen: false,
        modalProps: {},
    },
    DELETE_SHEET_CONFIRMATION: {
        isOpen: false,
        modalProps: {},
    },
    ADD_COLOR_SWATCH_POPOVER: {
        isOpen: false,
        modalProps: {},
    },
    DELETE_COLOR_SWATCH_POPOVER: {
        isOpen: false,
        modalProps: {},
    },
    ADD_VIEWER_INPUT_POPOVER: {
        isOpen: false,
        modalProps: {},
    },
    DELETE_VIEWER_INPUT_POPOVER: {
        isOpen: false,
        modalProps: {},
    },
};

export const modalReducer = (state: {} = initialState, action: ModalAction) => {
    if (!Object.keys(ModalActionTypes).includes(action.type)) {
        return state;
    }

    return { ...state, [action.type]: action.payload };
};
