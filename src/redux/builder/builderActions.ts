import api from '../../api';
import { Dispatch } from 'redux';
import { BuilderAction } from './builderInterfaces';
import { BuilderActionType } from './action-types';

export const findProject = (statusCallback: (status: boolean) => void) => {
    return async (dispatch: Dispatch<BuilderAction>) => {
        let response = await api.get(`/builder/user`);

        console.log(response.data);

        dispatch({
            type: BuilderActionType.USER_FIND_PROJECT,
            payload: response.data.builder,
        });

        if (response.data) statusCallback(true);
    };
};

export const addProject = (
    statusCallback: (status: boolean) => void,
    projectDetails: any
) => {
    return async (dispatch: Dispatch<BuilderAction>) => {
        let response = await api.post(`/builder/project/add`, {
            projectDetails,
        });

        dispatch({
            type: BuilderActionType.USER_ADD_PROJECT,
            payload: response.data.builder,
        });

        if (response.data) statusCallback(true);
    };
};

export const updateProject = () => {
    return async (dispatch: Dispatch<BuilderAction>) => {};
};

export const deleteProject = () => {
    return async (dispatch: Dispatch<BuilderAction>) => {};
};