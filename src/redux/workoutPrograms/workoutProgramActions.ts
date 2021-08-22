import api from '../../api';
import { Dispatch } from 'redux';
import { WorkoutProgramAction } from './workoutProgramInterfaces';
import { WorkoutProgramActionType } from './action-types';

export const getWorkoutPrograms = () =>
    // statusCallback: (status: boolean) => void
    {
        return async (dispatch: Dispatch<WorkoutProgramAction>) => {
            const response = await api.get('/workoutProgram/all');

            console.log(response);

            // if (response) {
            //     statusCallback(true);
            // }

            dispatch({
                type: WorkoutProgramActionType.USER_GET_WORKOUTPROGRAMS,
                payload: response.data.workoutPrograms,
            });
        };
    };
