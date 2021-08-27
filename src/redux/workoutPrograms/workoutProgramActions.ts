import api from '../../api';
import { Dispatch } from 'redux';
import { WorkoutProgramAction } from './workoutProgramInterfaces';
import { WorkoutProgramActionType } from './action-types';

//utils:
import filterWorkoutPrograms from '../../utils/filterWorkoutPrograms';

//State interface for filter access:
interface FilterState {
    filters: {
        category: string;
        equipment: string;
        difficulty: string;
        workoutSchedule: string;
        workoutLength: string;
    };
    searchTerms: any;
}

interface WorkoutProgramState {
    workoutPrograms: {
        workoutPrograms: any;
    };
}

type CombinedState = FilterState & WorkoutProgramState;

export const getWorkoutPrograms = (
    statusCallback: (status: boolean) => void,
    page: number
) => {
    return async (
        dispatch: Dispatch<WorkoutProgramAction>,
        getState: () => FilterState
    ) => {
        const { filters } = getState();
        const {
            searchTerms: {
                searchTerms: { currSearchTerm },
            },
        } = getState();

        let response;
        if (currSearchTerm !== '') {
            response = await api.post(
                `/workoutProgram/search/${currSearchTerm}/?page=${page - 1}`,
                { filters }
            );
        } else {
            response = await api.post(`/workoutProgram/all/?page=${page - 1}`, {
                filters,
            });
        }

        const { count: totalItems } = response.data.workoutPrograms;
        const currentPage = page ? +page : 0;

        const totalPages = Math.ceil(totalItems / 8);

        if (response) {
            statusCallback(true);
        }

        console.log(response);

        dispatch({
            type: WorkoutProgramActionType.USER_GET_WORKOUTPROGRAMS,
            payload: {
                workoutPrograms: response.data.workoutPrograms.rows,
                totalItems,
                currentPage,
                totalPages,
            },
        });
    };
};
