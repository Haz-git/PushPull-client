import { ProfileActionType } from './action-types';

interface findProfile {
    type: ProfileActionType.USER_FIND_PROFILE;
    payload?: any;
}

interface updateProfile {
    type: ProfileActionType.USER_UPDATE_PROFILE;
    payload?: any;
}

interface deleteProfile {
    type: ProfileActionType.USER_DELETE_PROFILE;
    payload?: any;
}

export type ProfileAction = findProfile | updateProfile | deleteProfile;
