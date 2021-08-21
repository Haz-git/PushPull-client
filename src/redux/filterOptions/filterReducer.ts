import { FilterActionType } from './action-types';
import { FilterAction } from './filterInterfaces';

const initialState = {
    category: 'any',
    equipment: 'any',
    difficulty: 'any',
    workoutSchedule: 'any',
    workoutLength: 'any',
};

const filterReducer = (state: Object = initialState, action: FilterAction) => {
    switch (action.type) {
        case FilterActionType.USER_UPDATE_CATEGORY:
            return { ...state, category: action.payload };
        case FilterActionType.USER_UPDATE_EQUIPMENT:
            return { ...state, equipment: action.payload };
        case FilterActionType.USER_UPDATE_DIFFICULTY:
            return { ...state, difficulty: action.payload };
        case FilterActionType.USER_UPDATE_WORKOUTSCHEDULE:
            return { ...state, workoutSchedule: action.payload };
        case FilterActionType.USER_UPDATE_WORKOUTLENGTH:
            return { ...state, workoutLength: action.payload };
        default:
            return state;
    }
};

export default filterReducer;
