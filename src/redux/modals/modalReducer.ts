import { ModalActionTypes } from './action-types';
import { ModalAction } from './modalInterfaces';

const initialState: any = {
    editBlock: {
        isOpen: false,
        modalProps: {},
    },
    deleteSheetConfirmation: {
        isOpen: false,
        modalProps: {},
    },
    addColorSwatchPopover: {
        isOpen: false,
        modalProps: {},
    },
    deleteColorSwatchPopover: {
        isOpen: false,
        modalProps: {},
    },
    addViewerInputPopover: {
        isOpen: false,
        modalProps: {},
    },
    deleteViewerInputPopover: {
        isOpen: false,
        modalProps: {},
    },
    allowResetAddBlockFormValues: {
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
