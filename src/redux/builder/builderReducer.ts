import { BuilderActionType } from './action-types';
import { BuilderAction } from './builderInterfaces';

const initialState = {};

const builderReducer = (
    state: Object = initialState,
    action: BuilderAction
) => {
    switch (action.type) {
        case BuilderActionType.USER_FIND_PROJECT:
            return { ...state, ...action.payload };
        case BuilderActionType.USER_UPDATE_PROJECT:
            return { ...state, ...action.payload };
        case BuilderActionType.USER_DELETE_PROJECT:
            return { ...state, ...action.payload };
        case BuilderActionType.USER_ADD_PROJECT:
            return { ...state, ...action.payload };
        case BuilderActionType.USER_ADD_PROJECT_MEMBER:
            return { ...state, ...action.payload };
        case BuilderActionType.USER_DELETE_PROJECT_MEMBER:
            return { ...state, ...action.payload };
        case BuilderActionType.USER_ADD_TEMPLATE:
            return { ...state, ...action.payload };
        case BuilderActionType.USER_DELETE_TEMPLATE:
            return { ...state, ...action.payload };
        case BuilderActionType.USER_UPDATE_TEMPLATE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};

export default builderReducer;