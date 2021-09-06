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

interface SortState {
    sortOptions: {
        workoutProgramSort: string;
        reviewSort: string;
    };
}
type CombinedState = FilterState & SortState;

export const getWorkoutPrograms = (
    statusCallback: (status: boolean) => void,
    page: number
) => {
    return async (
        dispatch: Dispatch<WorkoutProgramAction>,
        getState: () => CombinedState
    ) => {
        const { filters } = getState();
        const {
            searchTerms: {
                searchTerms: { currSearchTerm },
            },
        } = getState();
        const {
            sortOptions: { workoutProgramSort },
        } = getState();

        let response;
        if (currSearchTerm !== '') {
            response = await api.post(
                `/workoutProgram/search/${currSearchTerm}/?page=${page - 1}`,
                { filters, workoutProgramSort }
            );
        } else {
            response = await api.post(`/workoutProgram/all/?page=${page - 1}`, {
                filters,
                workoutProgramSort,
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

export const findWorkoutProgram = (
    id: string,
    statusCallback: (status: boolean) => void
) => {
    return async (dispatch: Dispatch<WorkoutProgramAction>) => {
        let response = await api.get(`/workoutProgram/${id}`);

        if (response) {
            statusCallback(true);
        }

        dispatch({
            type: WorkoutProgramActionType.USER_UPDATE_WORKOUTPROGRAM,
            payload: response.data.workoutPrograms,
        });
    };
};
