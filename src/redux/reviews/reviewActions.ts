import api from '../../api';
import { Dispatch } from 'redux';
import { ReviewAction } from './reviewInterfaces';
import { ReviewActionType } from './action-types';

export const getReviews = (
    statusCallback: (status: boolean) => void,
    workoutProgramId: string,
    page: number
) => {
    return async (dispatch: Dispatch<ReviewAction>) => {
        let response = await api.get(`/reviews/all/${workoutProgramId}`);

        const { count: totalItems } = response.data.reviews;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / 8);

        dispatch({
            type: ReviewActionType.USER_GET_REVIEWS,
            payload: {
                reviews: response.data.reviews.rows,
                totalItems,
                currentPage,
                totalPages,
            },
        });

        if (response) {
            statusCallback(true);
        }
    };
};
