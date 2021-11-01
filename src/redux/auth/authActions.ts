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

export const voteReview = (reviewsVotedObject: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        console.log(reviewsVotedObject);
        Userfront.user.update({
            reviewsVoted: reviewsVotedObject,
        });

        dispatch({
            type: AuthActionType.USER_UPDATE_VOTES,
            payload: Userfront.user,
        });
    };
};
