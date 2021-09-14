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
        console.log('Testing getReviews dispatch');

        let response = await api.get(`/reviews/all/${workoutProgramId}`);

        console.log(response);
    };
};
