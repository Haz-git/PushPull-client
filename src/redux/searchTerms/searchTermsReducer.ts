import { SearchTermActionType } from './action-types';
import { SearchTermAction } from './searchTermsInterfaces';

const initialState = {};

const workoutProgramReducer = (
    state: object = initialState,
    action: SearchTermAction
) => {
    switch (action.type) {
        case SearchTermActionType.USER_UPDATE_SEARCHTERM:
            return { ...state, searchTerms: action.payload };
        default:
            return state;
    }
};

export default workoutProgramReducer;
