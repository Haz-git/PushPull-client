import { WorkoutProgramActionType } from './action-types';

interface getWorkoutPrograms {
    type: WorkoutProgramActionType.USER_GET_WORKOUTPROGRAMS;
    payload?: any;
}

interface updateWorkoutProgram {
    type: WorkoutProgramActionType.USER_UPDATE_WORKOUTPROGRAM;
    payload?: any;
}

interface createWorkoutProgram {
    type: WorkoutProgramActionType.USER_CREATE_WORKOUTPROGRAM;
    payload?: any;
}

interface deleteWorkoutProgram {
    type: WorkoutProgramActionType.USER_DELETE_WORKOUTPROGRAM;
    payload?: any;
}

export type WorkoutProgramAction =
    | getWorkoutPrograms
    | updateWorkoutProgram
    | createWorkoutProgram
    | deleteWorkoutProgram;
