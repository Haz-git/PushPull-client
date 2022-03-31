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
            payload: {
                isLoggedIn: true,
                userDetails,
            },
        });
    };
};

export const userSignout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: AuthActionType.userSignOut,
            payload: {
                isLoggedIn: false,
            },
        });
    };
};

export const checkIfUserLoggedIn = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await api.get('/user/details');

            dispatch({
                type: AuthActionType.userSessionActive,
                payload: {
                    isLoggedIn: true,
                    userDetails: response.data.user,
                },
            });
        } catch (error) {
            dispatch({
                type: AuthActionType.userSessionInactive,
                payload: {
                    isLoggedIn: false,
                },
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
