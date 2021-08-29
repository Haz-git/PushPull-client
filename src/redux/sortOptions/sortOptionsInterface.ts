import { SortOptionActionType } from './action-types';

interface updateWorkoutProgramSortOption {
    type: SortOptionActionType.USER_UPDATE_WORKOUTPROGRAM_SORTOPTION;
    payload?: any;
}

interface updateReviewSortOption {
    type: SortOptionActionType.USER_UPDATE_REVIEW_SORTOPTION;
    payload?: any;
}

export type SortOptionAction =
    | updateWorkoutProgramSortOption
    | updateReviewSortOption;
