import { FilterActionType } from './action-types';
import { FilterAction } from './filterInterfaces';

const initialState = {};

const filterReducer = (state: Object = initialState, action: FilterAction) => {
    switch (action.type) {
        case FilterActionType.USER_UPDATE_CATEGORY:
            return { ...state, filters: action.payload };
        case FilterActionType.USER_UPDATE_EQUIPMENT:
            return { ...state, filters: action.payload };
        case FilterActionType.USER_UPDATE_DIFFICULTY:
            return { ...state, filters: action.payload };
        case FilterActionType.USER_UPDATE_WORKOUTSCHEDULE:
            return { ...state, filters: action.payload };
        case FilterActionType.USER_UPDATE_WORKOUTLENGTH:
            return { ...state, filters: action.payload };
        default:
            return state;
    }
};

export default filterReducer;
