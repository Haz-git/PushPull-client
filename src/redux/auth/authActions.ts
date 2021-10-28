import { Dispatch } from 'redux';
import { AuthActionType } from './action-types';
import { AuthAction } from './authInterfaces';

export const userLogin = (userDetails: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: AuthActionType.USER_LOG_IN,
            payload: userDetails,
        });
    };
};

export const userSignout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: AuthActionType.USER_SIGN_OUT,
        });
    };
};
