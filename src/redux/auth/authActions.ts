import api from '../../api';
import Userfront from '@userfront/react';
import { Dispatch } from 'redux';
import { AuthActionType } from './action-types';
import { AuthAction } from './authInterfaces';

Userfront.init('5nxxrqn7');

export const userLogin = (userDetails: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: AuthActionType.userLogIn,
            payload: userDetails,
        });
    };
};

export const userSignout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: AuthActionType.userSignOut,
        });
    };
};

export const checkIfUserLoggedIn = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await api.get('/user/details');

            dispatch({
                type: AuthActionType.userSessionActive,
                payload: response.data.user,
            });
        } catch (error) {
            dispatch({
                type: AuthActionType.userSessionInactive,
                payload: {},
            });
        }
    };
};

export const voteReview = (reviewObject: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        let response = await api.post(`/user/review/update`, { reviewObject });

        dispatch({
            type: AuthActionType.userUpdateVotes,
            payload: response.data.userDetails,
        });
    };
};
