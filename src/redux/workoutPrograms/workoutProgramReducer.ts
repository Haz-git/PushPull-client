import { WorkoutProgramActionType } from './action-types';
import { WorkoutProgramAction } from './workoutProgramInterfaces';

const initialState = {};

const workoutProgramReducer = (
    state: Object = initialState,
    action: WorkoutProgramAction
) => {
    switch (action.type) {
        case WorkoutProgramActionType.USER_GET_WORKOUTPROGRAMS:
            return { ...state, workoutPrograms: action.payload };
        case WorkoutProgramActionType.USER_CREATE_WORKOUTPROGRAM:
            return { ...state, workoutPrograms: action.payload };
        case WorkoutProgramActionType.USER_UPDATE_WORKOUTPROGRAM:
            return { ...state, workoutPrograms: action.payload };
        case WorkoutProgramActionType.USER_DELETE_WORKOUTPROGRAM:
            return { ...state, workoutPrograms: action.payload };
        default:
            return state;
    }
};

export default workoutProgramReducer;
