import { ModalActionTypes } from './action-types';
import { ModalAction } from './modalInterfaces';

const initialState: any = {};

export const modalReducer = (state: {} = initialState, action: ModalAction) => {
    if (!Object.keys(ModalActionTypes).includes(action.type)) {
        return state;
    }

    return { ...action.payload };
};
