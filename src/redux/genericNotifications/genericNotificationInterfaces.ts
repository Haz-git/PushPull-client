import { ReactNode } from 'react';
import { GenericNotificationType } from './action-types';

export type NotificationProps = {
    title: string;
    message?: string;
    openDuration: number;
    color?: string;
    isLoading?: boolean;
    icon?: ReactNode;
};

interface DisplayGenericNotification {
    type: GenericNotificationType;
    payload: {
        shouldDisplay: boolean;
        isUpdated: boolean;
        notificationProps?: NotificationProps | {};
    };
}

export type GenericNotificationAction = DisplayGenericNotification;
