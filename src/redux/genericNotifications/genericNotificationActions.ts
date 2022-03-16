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
                notificationProps,
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
                notificationProps: {},
            },
        });
    };
};
