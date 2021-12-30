import { SelectedBlockActionType } from './action-types';

interface selectBlock {
    type: SelectedBlockActionType.USER_SELECT_BLOCK;
    payload?: any;
}

interface deselectBlock {
    type: SelectedBlockActionType.USER_DESELECT_BLOCK;
    payload?: any;
}

export type SelectBlockAction = selectBlock | deselectBlock;
