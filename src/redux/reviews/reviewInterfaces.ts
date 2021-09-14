import { ReviewActionType } from './action-types';

interface getReviews {
    type: ReviewActionType.USER_GET_REVIEWS;
    payload?: any;
}

interface updateReview {
    type: ReviewActionType.USER_UPDATE_REVIEWS;
    payload?: any;
}

interface createReview {
    type: ReviewActionType.USER_CREATE_REVIEWS;
    payload?: any;
}

interface deleteReview {
    type: ReviewActionType.USER_DELETE_REVIEWS;
    payload?: any;
}

export type ReviewAction =
    | getReviews
    | updateReview
    | createReview
    | deleteReview;
