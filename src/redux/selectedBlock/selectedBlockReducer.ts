import { SelectBlockAction } from './selectedBlockInterfaces';
import { SelectedBlockActionType } from './action-types';

const initialState = {};

const selectedBlockReducer = (
    state: {} = initialState,
    action: SelectBlockAction
) => {
    switch (action.type) {
        case SelectedBlockActionType.USER_SELECT_BLOCK:
            return { ...action.payload };
        case SelectedBlockActionType.USER_DESELECT_BLOCK:
            return { ...action.payload };
        default:
            return state;
    }
};

export default selectedBlockReducer;
