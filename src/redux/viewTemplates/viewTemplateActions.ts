import api from '../../api';
import { Dispatch } from 'redux';
import { ViewTemplateActions } from './viewTemplateInterfaces';
import { uiLoaderAction } from '../uiLoader/uiLoaderInterfaces';
import { ViewTemplateActionType } from './action-types';
import { loaderTypes } from '../uiLoader/loader-types';

type ComposedViewTemplate = {
    id: string;
    savedTemplate: any; //Todo..
    templateFileId: string;
};

export const findViewTemplate = (templateId: string): Function => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        try {
            const response = await api.get(`/viewTemplate/${templateId}`);

            console.log(response);
        } catch (err) {
            //TODO: Link error action creator for error handling.
            console.error(err);
        }
    };
};

export const addViewTemplate = (
    composedViewTemplate: ComposedViewTemplate
): Function => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        try {
            const response = await api.post(`/viewTemplate/add`, {
                composedViewTemplate,
            });

            console.log(response);
        } catch (err) {
            //TODO: Link error action creator for error handling.
            //TODO: Link notif action creator to notify user template is published.
            console.error(err);
        }
    };
};

export const updateViewTemplate = () => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        try {
        } catch (err) {
            //TODO: Link error action creator for error handling.
            console.error(err);
        }
    };
};

export const deleteViewTemplate = () => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        try {
        } catch (err) {
            //TODO: Link error action creator for error handling.
            console.error(err);
        }
    };
};
