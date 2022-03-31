import { AuthActionType } from './action-types';

interface userLogin {
    type: AuthActionType.userLogIn;
    payload?: any;
}

interface userSignout {
    type: AuthActionType.userSignOut;
    payload?: any;
}

interface userUpdate {
    type: AuthActionType.userUpdateVotes;
    payload?: any;
}

interface retrieveUserIfSessionActive {
    type: AuthActionType.userSessionActive;
    payload?: any; // Todo: This is user object
}

interface preventUserDetailsIfSessionInactive {
    type: AuthActionType.userSessionInactive;
    payload: {
        isLoggedIn: boolean;
    };
}

export type AuthAction =
    | userLogin
    | userSignout
    | userUpdate
    | retrieveUserIfSessionActive
    | preventUserDetailsIfSessionInactive;
