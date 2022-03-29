import api from '../../api';
import Userfront from '@userfront/react';
import { Dispatch } from 'redux';
import { AuthActionType } from './action-types';
import { AuthAction } from './authInterfaces';

Userfront.init('5nxxrqn7');

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

export const checkIfUserLoggedIn = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await api.get('/user/details');

            console.log(response);
            // dispatch({
            //     type: AuthActionType.USER_LOG_IN,
            //     payload: response.data,
            // });
        } catch (error) {
            console.error(error);
        }
    };
};

export const voteReview = (reviewObject: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        let response = await api.post(`/user/review/update`, { reviewObject });

        dispatch({
            type: AuthActionType.USER_UPDATE_VOTES,
            payload: response.data.userDetails,
        });
    };
};
