import { Dispatch } from 'redux';
import { FilterActionType } from './action-types';
import { FilterAction } from './filterInterfaces';

//WorkoutProgram action creator:
import { getWorkoutPrograms } from '../workoutPrograms/workoutProgramActions';

export const updateCategory = (filterChoice: string) => {
    return async (dispatch: Dispatch<FilterAction>) => {
        dispatch({
            type: FilterActionType.USER_UPDATE_CATEGORY,
            payload: filterChoice,
        });
    };
};

export const updateEquipment = (filterChoice: string) => {
    return async (dispatch: Dispatch<FilterAction>) => {
        dispatch({
            type: FilterActionType.USER_UPDATE_EQUIPMENT,
            payload: filterChoice,
        });
    };
};

export const updateDifficulty = (filterChoice: string) => {
    return async (dispatch: Dispatch<FilterAction>) => {
        dispatch({
            type: FilterActionType.USER_UPDATE_DIFFICULTY,
            payload: filterChoice,
        });
    };
};

export const updateWorkoutSchedule = (filterChoice: string) => {
    return async (dispatch: Dispatch<FilterAction>) => {
        dispatch({
            type: FilterActionType.USER_UPDATE_WORKOUTSCHEDULE,
            payload: filterChoice,
        });
    };
};

export const updateWorkoutLength = (filterChoice: string) => {
    return async (dispatch: Dispatch<FilterAction>) => {
        dispatch({
            type: FilterActionType.USER_UPDATE_WORKOUTLENGTH,
            payload: filterChoice,
        });
    };
};

export const resetAllFilters = (statusCallback: (status: boolean) => void) => {
    return async (dispatch: Dispatch<any>) => {
        //Dispatch to reset all filter states:
        dispatch(updateCategory('any'));
        dispatch(updateEquipment('any'));
        dispatch(updateDifficulty('any'));
        dispatch(updateWorkoutSchedule('any'));
        dispatch(updateWorkoutLength('any'));

        //Dispatch to query for user again after reset:
        dispatch(getWorkoutPrograms(statusCallback, 1));
    };
};
