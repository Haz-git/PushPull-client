import api from '../../api';
import { Dispatch } from 'redux';
import { BuilderAction } from './builderInterfaces';
import { BuilderActionType } from './action-types';

export const findProject = (statusCallback: (status: boolean) => void) => {
    return async (dispatch: Dispatch<BuilderAction>) => {
        statusCallback(true);
    };
};

export const addProject = () => {
    return async (dispatch: Dispatch<BuilderAction>) => {};
};

export const updateProject = () => {
    return async (dispatch: Dispatch<BuilderAction>) => {};
};

export const deleteProject = () => {
    return async (dispatch: Dispatch<BuilderAction>) => {};
};
