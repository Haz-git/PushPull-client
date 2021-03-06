import {
    GenericNotificationAction,
    NotificationProps,
} from './genericNotificationInterfaces';
import { GenericNotificationType } from './action-types';

const initialState: any = {
    loadingSaveViewTemplate: {
        shouldDisplay: false,
        isUpdated: false,
        notificationProps: {},
    },
    successSaveViewTemplate: {
        shouldDisplay: false,
        isUpdated: false,
        notificationProps: {},
    },
};

export const genericNotificationReducer = (
    state: {} = initialState,
    action: GenericNotificationAction
) => {
    if (!Object.keys(GenericNotificationType).includes(action.type)) {
        return state;
    }

    return { ...state, [action.type]: action.payload };
};
