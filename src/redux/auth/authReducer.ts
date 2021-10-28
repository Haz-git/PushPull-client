import { AuthActionType } from './action-types';
import { AuthAction } from './authInterfaces';

const initialState = {};

const authReducer = (state: Object = initialState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionType.USER_LOG_IN:
            return { ...state, userDetails: action.payload };
        case AuthActionType.USER_SIGN_OUT:
            return { ...state, userDetails: initialState };
        default:
            return state;
    }
};

export default authReducer;
