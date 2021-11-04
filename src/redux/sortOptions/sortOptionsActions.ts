import { Dispatch } from 'redux';
import { SortOptionAction } from './sortOptionsInterface';
import { SortOptionActionType } from './action-types';

//WorkoutProgramAction Creator:
import { getWorkoutPrograms } from '../workoutPrograms/workoutProgramActions';

//Review action creator:
import { getReviews } from '../reviews/reviewActions';

export const updateWorkoutProgramSortOption = (
    statusCallback: (status: boolean) => void,
    sortOption: string
) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({
            type: SortOptionActionType.USER_UPDATE_WORKOUTPROGRAM_SORTOPTION,
            payload: sortOption,
        });

        //Here, we call getWorkoutPrograms because our sortOption should be updated.
        dispatch(getWorkoutPrograms(statusCallback, 1));
    };
};

export const updateReviewSortOption = (
    statusCallback: (status: boolean) => void,
    workoutProgramId: string,
    page: number,
    sortOption: string
) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({
            type: SortOptionActionType.USER_UPDATE_REVIEW_SORTOPTION,
            payload: sortOption,
        });

        dispatch(getReviews(statusCallback, workoutProgramId, page));
    };
};
