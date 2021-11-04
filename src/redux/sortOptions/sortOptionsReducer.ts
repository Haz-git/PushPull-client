import { SortOptionActionType } from './action-types';
import { SortOptionAction } from './sortOptionsInterface';

const initialState = {
    workoutProgramSort: 'alphabetical',
    reviewSort: 'updatedAt',
};

const sortOptionReducer = (
    state: object = initialState,
    action: SortOptionAction
) => {
    switch (action.type) {
        case SortOptionActionType.USER_UPDATE_WORKOUTPROGRAM_SORTOPTION:
            return {
                ...state,
                workoutProgramSort: action.payload,
            };
        case SortOptionActionType.USER_UPDATE_REVIEW_SORTOPTION:
            return { ...state, reviewSort: action.payload };
        default:
            return state;
    }
};

export default sortOptionReducer;
