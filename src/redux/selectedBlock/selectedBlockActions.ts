import { Dispatch } from 'redux';
import { SelectBlockAction } from './selectedBlockInterfaces';
import { SelectedBlockActionType } from './action-types';

export const selectBlock = (block: any) => {
    return async (dispatch: Dispatch<SelectBlockAction>) => {
        dispatch({
            type: SelectedBlockActionType.USER_SELECT_BLOCK,
            payload: block,
        });
    };
};

export const deselectBlock = () => {
    return async (dispatch: Dispatch<SelectBlockAction>) => {
        dispatch({
            type: SelectedBlockActionType.USER_DESELECT_BLOCK,
            payload: {},
        });
    };
};
