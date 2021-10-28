import { AuthActionType } from './action-types';
import { AuthAction } from './authInterfaces';

const initialState = {};

const authReducer = (state: Object = initialState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionType.USER_LOG_IN:
            return { ...state, user: action.payload };
        case AuthActionType.USER_SIGN_OUT:
            return { user: initialState };
        default:
            return state;
    }
};

export default authReducer;
