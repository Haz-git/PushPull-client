import { ProfileActionType } from './action-types';
import { ProfileAction } from './profileInterfaces';

const initialState = {};

const profileReducer = (
    state: Object = initialState,
    action: ProfileAction
) => {
    switch (action.type) {
        case ProfileActionType.USER_FIND_PROFILE:
            return { ...state, reviews: action.payload };
        case ProfileActionType.USER_UPDATE_PROFILE:
            return { ...state, reviews: action.payload };
        case ProfileActionType.USER_DELETE_PROFILE:
            return { ...state, reviews: action.payload };

        default:
            return state;
    }
};

export default profileReducer;
