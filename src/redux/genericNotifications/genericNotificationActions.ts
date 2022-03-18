import { Dispatch } from 'redux';
import { GenericNotificationType } from './action-types';
import {
    GenericNotificationAction,
    NotificationProps,
} from './genericNotificationInterfaces';

export const toggleGenericNotification = (
    genericNotificationType: GenericNotificationType,
    notificationProps: NotificationProps
): any => {
    //Todo: Find types here
    return async (dispatch: Dispatch<GenericNotificationAction>) => {
        if (
            !Object.values(GenericNotificationType).includes(
                genericNotificationType
            )
        ) {
            return;
        }

        return dispatch({
            type: genericNotificationType,
            payload: {
                shouldDisplay: true,
                isUpdated: false,
                notificationProps,
            },
        });
    };
};

export const updateGenericNotification = (
    genericNotificationType: GenericNotificationType,
    updatedNotificationProps: NotificationProps
): any => {
    return async (dispatch: Dispatch<GenericNotificationAction>) => {
        /**
         * We can use this to update the isUpdated flag for a specific loading notification.
         * Inside generic notification provider, this is captured and the notification is updated.
         */

        if (
            !Object.values(GenericNotificationType).includes(
                genericNotificationType
            )
        ) {
            return;
        }

        return dispatch({
            type: genericNotificationType,
            payload: {
                shouldDisplay: true,
                isUpdated: true,
                notificationProps: updatedNotificationProps,
            },
        });
    };
};

export const resetGenericNotification = (
    genericNotificationType: GenericNotificationType
): any => {
    return async (dispatch: Dispatch<GenericNotificationAction>) => {
        if (
            !Object.values(GenericNotificationType).includes(
                genericNotificationType
            )
        ) {
            return;
        }

        return dispatch({
            type: genericNotificationType,
            payload: {
                shouldDisplay: false,
                isUpdated: false,
                notificationProps: {},
            },
        });
    };
};
