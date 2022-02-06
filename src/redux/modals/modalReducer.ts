import { ModalActionTypes } from './action-types';
import { ModalAction } from './modalInterfaces';

const initialState: any = {
    DELETE_SHEET_CONFIRMATION: {
        isOpen: false,
    },
    ADD_COLOR_SWATCH_POPOVER: {
        isOpen: false,
    },
    DELETE_COLOR_SWATCH_POPOVER: {
        isOpen: false,
    },
    ADD_VIEWER_INPUT_POPOVER: {
        isOpen: false,
    },
    DELETE_VIEWER_INPUT_POPOVER: {
        isOpen: false,
    },
};

export const modalReducer = (state: {} = initialState, action: ModalAction) => {
    if (!Object.keys(ModalActionTypes).includes(action.type)) {
        return state;
    }

    return { ...state, [action.type]: action.payload };
};
