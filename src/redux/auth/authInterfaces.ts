import { AuthActionType } from './action-types';

interface userLogin {
    type: AuthActionType.USER_LOG_IN;
    payload?: any;
}

interface userSignout {
    type: AuthActionType.USER_SIGN_OUT;
    payload?: any;
}

interface userUpdate {
    type: AuthActionType.USER_UPDATE_VOTES;
    payload?: any;
}

export type AuthAction = userLogin | userSignout | userUpdate;
