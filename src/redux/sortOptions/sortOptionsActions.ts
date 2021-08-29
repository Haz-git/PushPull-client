import { Dispatch } from 'redux';
import { SortOptionAction } from './sortOptionsInterface';
import { SortOptionActionType } from './action-types';

export const updateWorkoutProgramSortOption = (sortOption: string) => {
    return async (dispatch: Dispatch<SortOptionAction>) => {
        dispatch({
            type: SortOptionActionType.USER_UPDATE_WORKOUTPROGRAM_SORTOPTION,
            payload: sortOption,
        });
    };
};

export const updateReviewSortOption = (sortOption: string) => {
    return async (dispatch: Dispatch<SortOptionAction>) => {
        dispatch({
            type: SortOptionActionType.USER_UPDATE_REVIEW_SORTOPTION,
            payload: sortOption,
        });
    };
};
