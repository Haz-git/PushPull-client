import { ModalActionTypes } from './action-types';

interface openModal {
    type: ModalActionTypes;
    payload?: any;
}

interface closeModal {
    type: ModalActionTypes;
    payload?: any;
}

export type ModalAction = openModal | closeModal;
