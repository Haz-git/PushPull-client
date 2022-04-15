import api from '../../api';
import { Dispatch } from 'redux';
import { ViewTemplateActions } from './viewTemplateInterfaces';
import { ViewTemplateActionType } from './action-types';
import { v4 as uuid } from 'uuid';

//UI loader state:

import { uiLoaderAction } from '../uiLoader/uiLoaderInterfaces';
import {
    invokeLoaderState,
    disableLoaderState,
} from '../uiLoader/uiLoaderActions';
import { loaderTypes } from '../uiLoader/loader-types';

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
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(invokeLoaderState(loaderTypes.MAIN_VIEW_TEMPLATE_VIEW));
            const response = await api.get(`/viewTemplate/${templateId}`);

            dispatch({
                type: ViewTemplateActionType.queryViewTemplate,
                payload: response.data.viewTemplate,
            });

            if (response) {
                dispatch(
                    disableLoaderState(loaderTypes.MAIN_VIEW_TEMPLATE_VIEW)
                );
            }
        } catch (err) {
            dispatch(
                toggleErrorNotification(ErrorType.queryViewTemplateError, {
                    message: 'Unable to find View Template..',
                    openDuration: 3000,
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
                            title: 'Your Template Has Been Published!',
                            openDuration: 3000,
                            isLoading: false,
                        }
                    )
                );
            }
        } catch (err) {
            dispatch(
                toggleErrorNotification(ErrorType.saveViewTemplateError, {
                    message: 'Unable To Publish View Template.',
                    openDuration: 3000,
                })
            );
            console.error(err);
        }
    };
};

export const updateViewTemplate = (
    viewTemplateId: string,
    updatedTemplate: any
) => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        //Todo Types...
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

            const response = await api.put(
                `/viewTemplate/update/${viewTemplateId}`,
                { updatedTemplate }
            );

            if (response) {
                //Todo: better check here.
                dispatch(
                    updateGenericNotification(
                        GenericNotificationType.loadingSaveViewTemplate,
                        {
                            id: notificationId,
                            title: 'Your Template Has Been Published!',
                            openDuration: 3000,
                            isLoading: false,
                        }
                    )
                );
            }
        } catch (err) {
            dispatch(
                toggleErrorNotification(ErrorType.saveViewTemplateError, {
                    message: 'Unable To Publish View Template.',
                    openDuration: 3000,
                })
            );
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

export const resetViewTemplate = () => {
    return async (dispatch: Dispatch<ViewTemplateActions>) => {
        dispatch({
            type: ViewTemplateActionType.resetViewTemplate,
            payload: {},
        });
    };
};
