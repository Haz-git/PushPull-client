import api from '../../api';
import { Dispatch } from 'redux';
import { ViewTemplateActions } from './viewTemplateInterfaces';
import { uiLoaderAction } from '../uiLoader/uiLoaderInterfaces';
import { ViewTemplateActionType } from './action-types';
import { loaderTypes } from '../uiLoader/loader-types';
import { v4 as uuid } from 'uuid';

//Error Handling
import { ErrorType } from '../errors/action-types';
import { ErrorAction } from '../errors/errorInterfaces';
import { toggleErrorNotification } from '../errors/errorActions';

//Generic Notification Handling
import { GenericNotificationType } from '../genericNotifications/action-types';
import { GenericNotificationAction } from '../genericNotifications/genericNotificationInterfaces';
import {
    toggleGenericNotification,
    updateGenericNotification,
} from '../genericNotifications/genericNotificationActions';

type ComposedViewTemplate = {
    id: string;
    savedTemplate: any; //Todo..
    templateFileId: string;
};

export const findViewTemplate = (templateId: string): Function => {
    return async (dispatch: Dispatch<ViewTemplateActions | ErrorAction>) => {
        try {
            const response = await api.get(`/viewTemplate/${templateId}`);

            console.log(response);
        } catch (err) {
            //TODO: Link error action creator for error handling.

            dispatch(
                toggleErrorNotification(ErrorType.queryViewTemplateError, {
                    message: 'Unable to find View Template..',
                    openDuration: 10000,
                })
            );

            console.error(err);
        }
    };
};

export const addViewTemplate = (
    composedViewTemplate: ComposedViewTemplate
): Function => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        try {
            const notificationId = uuid();

            dispatch(
                toggleGenericNotification(
                    GenericNotificationType.loadingSaveViewTemplate,
                    {
                        id: notificationId,
                        title: 'Publishing Template Changes...',
                        openDuration: false,
                        isLoading: true,
                    }
                )
            );

            const response = await api.post(`/viewTemplate/add`, {
                composedViewTemplate,
            });

            if (response) {
                //Todo: better check here.
                dispatch(
                    updateGenericNotification(
                        GenericNotificationType.loadingSaveViewTemplate,
                        {
                            id: notificationId,
                            title: 'Your template has been published!',
                            openDuration: 10000,
                            isLoading: false,
                        }
                    )
                );
            }
        } catch (err) {
            dispatch(
                toggleErrorNotification(ErrorType.saveViewTemplateError, {
                    message: 'Unable to publish view template.',
                    openDuration: 10000,
                })
            );
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
