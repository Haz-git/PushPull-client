import api from '../../api';
import { Dispatch } from 'redux';
import { ViewTemplateActions } from './viewTemplateInterfaces';
import { uiLoaderAction } from '../uiLoader/uiLoaderInterfaces';
import { ViewTemplateActionType } from './action-types';
import { loaderTypes } from '../uiLoader/loader-types';

export const findViewTemplate = () => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        try {
        } catch (err) {
            //TODO: Link error action creator for error handling.
            console.error(err);
        }
    };
};

export const addViewTemplate = () => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        try {
        } catch (err) {
            //TODO: Link error action creator for error handling.
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
