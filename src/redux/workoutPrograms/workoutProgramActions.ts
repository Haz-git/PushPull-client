import api from '../../api';
import { Dispatch } from 'redux';
import { WorkoutProgramAction } from './workoutProgramInterfaces';
import { WorkoutProgramActionType } from './action-types';

//utils:
import filterWorkoutPrograms from '../../utils/filterWorkoutPrograms';

//State interface for filter access:
interface FilterState {
    filters: {
        category: string;
        equipment: string;
        difficulty: string;
        workoutSchedule: string;
        workoutLength: string;
    };
}

interface WorkoutProgramState {
    workoutPrograms: {
        workoutPrograms: any;
    };
}

type CombinedState = FilterState & WorkoutProgramState;

export const getWorkoutPrograms = (
    statusCallback: (status: boolean) => void
) => {
    return async (
        dispatch: Dispatch<WorkoutProgramAction>,
        getState: () => FilterState
    ) => {
        const { filters } = getState();

        const response = await api.get('/workoutProgram/all');

        const currWorkoutPrograms = response.data.workoutPrograms;

        const filteredPrograms = filterWorkoutPrograms(
            currWorkoutPrograms,
            filters
        );

        if (response && filteredPrograms !== null) {
            statusCallback(true);
        }

        dispatch({
            type: WorkoutProgramActionType.USER_GET_WORKOUTPROGRAMS,
            payload: response.data.workoutPrograms,
        });

        dispatch({
            type: WorkoutProgramActionType.USER_UPDATE_WORKOUTPROGRAM,
            payload: filteredPrograms,
        });
    };
};

export const filterAndUpdateWorkoutPrograms = (
    statusCallback: (status: boolean) => void
) => {
    return async (
        dispatch: Dispatch<WorkoutProgramAction>,
        getState: () => CombinedState
    ) => {
        const { filters } = getState();
        const {
            workoutPrograms: { workoutPrograms },
        } = getState();

        const filteredPrograms = filterWorkoutPrograms(
            workoutPrograms,
            filters
        );

        if (filteredPrograms !== null) {
            statusCallback(true);
        }

        dispatch({
            type: WorkoutProgramActionType.USER_UPDATE_WORKOUTPROGRAM,
            payload: filteredPrograms,
        });
    };
};
