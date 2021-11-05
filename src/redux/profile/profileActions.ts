import api from '../../api';
import { Dispatch } from 'redux';
import { ProfileAction } from './profileInterfaces';
import { ProfileActionType } from './action-types';

export const findUserProfile = (
    statusCallback: (status: boolean) => void,
    userName: string
) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        console.log('searching for user profile...');
    };
};
