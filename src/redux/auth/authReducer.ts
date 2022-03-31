import { AuthActionType } from './action-types';
import { AuthAction } from './authInterfaces';

const initialState: any = {
    isLoggedIn: false,
    user: {},
};

const authReducer = (state: Object = initialState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionType.userLogIn:
            return {
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.userDetails,
            };
        case AuthActionType.userUpdateVotes:
            return {
                ...state,
                user: action.payload,
            };
        case AuthActionType.userSignOut:
            return {
                isLoggedIn: action.payload.isLoggedIn,
                user: {},
            };
        case AuthActionType.userSessionActive:
            return {
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.userDetails,
            };
        case AuthActionType.userSessionInactive:
            return {
                isLoggedIn: action.payload.isLoggedIn,
                user: {},
            };
        default:
            return state;
    }
};

export default authReducer;
