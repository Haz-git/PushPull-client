import { FilterActionType } from './action-types';

interface updateCategory {
    type: FilterActionType.USER_UPDATE_CATEGORY;
    payload?: any;
}

interface updateEquipment {
    type: FilterActionType.USER_UPDATE_EQUIPMENT;
    payload?: any;
}

interface updateDifficulty {
    type: FilterActionType.USER_UPDATE_DIFFICULTY;
    payload?: any;
}

interface updateWorkoutSchedule {
    type: FilterActionType.USER_UPDATE_WORKOUTSCHEDULE;
    payload?: any;
}

interface updateWorkoutLength {
    type: FilterActionType.USER_UPDATE_WORKOUTLENGTH;
    payload?: any;
}

export type FilterAction =
    | updateCategory
    | updateEquipment
    | updateDifficulty
    | updateWorkoutSchedule
    | updateWorkoutLength;
