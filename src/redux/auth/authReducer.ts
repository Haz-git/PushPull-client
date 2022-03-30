import { AuthActionType } from './action-types';
import { AuthAction } from './authInterfaces';

const initialState: any = {};

const authReducer = (state: Object = initialState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionType.userLogIn:
            return { ...state, user: action.payload };
        case AuthActionType.userUpdateVotes:
            return {
                ...state,
                user: action.payload,
            };
        case AuthActionType.userSignOut:
            return { user: initialState };
        case AuthActionType.userSessionActive:
            return { ...state, user: action.payload };
        case AuthActionType.userSessionInactive:
            return { ...state, user: initialState };
        default:
            return state;
    }
};

export default authReducer;
