import api from '../../api';
import { Dispatch } from 'redux';
import { BuilderAction } from './builderInterfaces';
import { BuilderActionType } from './action-types';

export const findProject = (
    statusCallback: (status: boolean) => void,
    toggleNotif: () => string,
    updateNotif: (id: string, status: boolean) => void
) => {
    return async (dispatch: Dispatch<BuilderAction>) => {
        const id = toggleNotif();

        try {
            let response = await api.get(`/builder/user`);

            dispatch({
                type: BuilderActionType.USER_FIND_PROJECT,
                payload: response.data.builder,
            });

            if (response.data) {
                statusCallback(true);
                updateNotif(id, true);
            }
        } catch (err) {
            statusCallback(false);
            updateNotif(id, false);
        }
    };
};

export const addProject = (
    statusCallback: (status: boolean) => void,
    modalCallback: (status: boolean) => void,
    toggleNotif: () => string,
    updateNotif: (id: string, status: boolean) => void,
    projectDetails: any
) => {
    return async (dispatch: Dispatch<BuilderAction>) => {
        const id = toggleNotif();

        try {
            let response = await api.post(`/builder/project/add`, {
                projectDetails,
            });

            dispatch({
                type: BuilderActionType.USER_ADD_PROJECT,
                payload: response.data.builder,
            });

            if (response.data) {
                statusCallback(false);
                modalCallback(false);
                updateNotif(id, true);
            }
        } catch (err) {
            statusCallback(false);
            modalCallback(false);
            updateNotif(id, false);
        }
    };
};

export const updateProject = (
    toggleNotif: () => string,
    updateNotif: (id: string, status: boolean) => void,
    projectDetails: any,
    projectUuid: string
) => {
    return async (dispatch: Dispatch<BuilderAction>) => {
        const id = toggleNotif();

        try {
            let response = await api.put(
                `/builder/project/update/${projectUuid}`,
                {
                    projectDetails,
                }
            );

            dispatch({
                type: BuilderActionType.USER_UPDATE_PROJECT,
                payload: response.data.builder,
            });

            if (response.data) updateNotif(id, true);
        } catch (err) {
            updateNotif(id, false);
        }
    };
};

export const deleteProject = (
    toggleNotif: () => string,
    updateNotif: (id: string, status: boolean) => void,
    projectId: string
) => {
    return async (dispatch: Dispatch<BuilderAction>) => {
        const id = toggleNotif();

        try {
            let response = await api.delete(
                `/builder/project/delete/${projectId}`
            );

            dispatch({
                type: BuilderActionType.USER_DELETE_PROJECT,
                payload: response.data.builder,
            });

            if (response.data) {
                updateNotif(id, true);
            }
        } catch (err) {
            updateNotif(id, false);
        }
    };
};
