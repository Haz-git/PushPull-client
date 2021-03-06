import { BuilderActionType } from './action-types';
import { BuilderAction } from './builderInterfaces';

const initialState: any = [];

const builderReducer = (
    state: Array<any> = initialState,
    action: BuilderAction
) => {
    switch (action.type) {
        case BuilderActionType.USER_FIND_PROJECT:
            return [...action.payload];
        case BuilderActionType.USER_UPDATE_PROJECT:
            return [...action.payload];
        case BuilderActionType.USER_DELETE_PROJECT:
            return [...action.payload];
        case BuilderActionType.USER_ADD_PROJECT:
            return [...action.payload];
        case BuilderActionType.USER_ADD_PROJECT_MEMBER:
            return [...action.payload];
        case BuilderActionType.USER_DELETE_PROJECT_MEMBER:
            return [...action.payload];
        default:
            return state;
    }
};

export default builderReducer;
