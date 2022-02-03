import { ModalActionTypes } from './action-types';

interface openModal {
    type: ModalActionTypes.DELETE_SHEET_CONFIRMATION;
    payload?: any;
}

interface closeModal {
    type: ModalActionTypes.DELETE_SHEET_CONFIRMATION;
    payload?: any;
}

export type ModalAction = openModal | closeModal;
