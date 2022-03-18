import * as React from 'react';
import { useEffect } from 'react';

//Components:
import { useNotifications } from '@mantine/notifications';

//Redux:
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { GenericNotificationType } from '../../redux/genericNotifications/action-types';

//Styles:

//Interfaces:

interface IComponentProps {
    children: React.ReactNode;
}

export const GenericNotificationProvider = ({
    children,
}: IComponentProps): JSX.Element => {
    const genericNotifications = useSelector(
        (state: RootStateOrAny) => state?.genericNotifications
    );
    const notifications = useNotifications();

    const findActiveNotification = (): any => {
        //Todo: find Types here
        return Object.values(genericNotifications).find(
            (notification: any) => notification.shouldDisplay === true
        );
    };

    const updateGenericNotification = (
        existingNotificationId: string,
        updatedNotificationObject: any
    ): void => {
        notifications.updateNotification(existingNotificationId, {
            id: updatedNotificationObject.notificationProps.id,
            color:
                updatedNotificationObject.notificationProps.color || 'orange',
            title: updatedNotificationObject.notificationProps.title,
            message: updatedNotificationObject.notificationProps.message || '',
            loading:
                updatedNotificationObject.notificationProps.isLoading || false,
            icon: updatedNotificationObject.notificationProps.icon || null, //Default = line, can use checkmark here.
            onClose: updatedNotificationObject.notificationProps.openDuration,
        });
    };

    const displayGenericNotification = (): string | void => {
        const activeNotification = findActiveNotification();
        if (!activeNotification) {
            return;
        }

        if (activeNotification && activeNotification.isUpdated === true) {
            return updateGenericNotification(
                activeNotification.notificationProps.id,
                activeNotification
            );
        }

        return notifications.showNotification({
            id: activeNotification.notificationProps.id,
            color: activeNotification.notificationProps.color || 'orange',
            title: activeNotification.notificationProps.title,
            message: activeNotification.notificationProps.message || '',
            loading: activeNotification.notificationProps.isLoading || false,
            icon: activeNotification.notificationProps.icon || null, //Default = line, can use checkmark here.
            onClose: activeNotification.notificationProps.openDuration,
        });
    };

    useEffect(() => {
        displayGenericNotification();
    }, [genericNotifications]);

    return <>{children}</>;
};
