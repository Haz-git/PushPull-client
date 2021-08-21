import { Dispatch } from 'redux';
import { FilterActionType } from './action-types';
import { FilterAction } from './filterInterfaces';

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
