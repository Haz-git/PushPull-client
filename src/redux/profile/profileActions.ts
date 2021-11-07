import api from '../../api';
import { Dispatch } from 'redux';
import { ProfileAction } from './profileInterfaces';
import { ProfileActionType } from './action-types';

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
