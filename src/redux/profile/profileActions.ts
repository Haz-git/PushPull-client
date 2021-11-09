import api from '../../api';
import { Dispatch } from 'redux';
import { ProfileAction } from './profileInterfaces';
import { ProfileActionType } from './action-types';

import { userLogin } from '../auth/authActions';

export const findUserProfile = (
    statusCallback: (status: boolean) => void,
    userName: string
) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        let response = await api.get(`/user/${userName}`);

        dispatch({
            type: ProfileActionType.USER_FIND_PROFILE,
            payload: response.data.userProfile,
        });

        if (response?.data?.userProfile) statusCallback(true);
    };
};

export const updateUserProfile = (
    statusCallback: (status: boolean) => void,
    updateObject: any
) => {
    return async (dispatch: Dispatch<any>) => {
        //This route should only be accessible to logged in user.
        console.log(`SENT TO SERVER:`, updateObject);

        let response = await api.post(`/user/update`, { updateObject });

        console.log(`RESPONSE FROM SERVER:`, response);

        //We dispatch to update the profile view:
        dispatch({
            type: ProfileActionType.USER_FIND_PROFILE,
            payload: response.data.userProfile,
        });

        //Update the current user's auth state.

        dispatch(userLogin(response.data.userProfile));
    };
};
