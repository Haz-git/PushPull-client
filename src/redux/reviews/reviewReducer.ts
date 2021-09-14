import { ReviewActionType } from './action-types';
import { ReviewAction } from './reviewInterfaces';

const initialState = {};

const reviewReducer = (state: Object = initialState, action: ReviewAction) => {
    switch (action.type) {
        case ReviewActionType.USER_GET_REVIEWS:
            return { ...state, reviews: action.payload };
        case ReviewActionType.USER_CREATE_REVIEWS:
            return { ...state, reviews: action.payload };
        case ReviewActionType.USER_UPDATE_REVIEWS:
            return { ...state, reviews: action.payload };
        case ReviewActionType.USER_DELETE_REVIEWS:
            return { ...state, reviews: action.payload };
        default:
            return state;
    }
};

export default reviewReducer;
