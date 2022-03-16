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

    const displayGenericNotification = (): string | undefined => {
        const activeNotification = findActiveNotification();
        if (!activeNotification) {
            return;
        }

        return notifications.showNotification({
            color: activeNotification.notificationProps.color || 'orange',
            title: activeNotification.notificationProps.title,
            message: activeNotification.notificationProps.message || '',
            loading: activeNotification.notificationProps.isLoading || false,
            icon: activeNotification.notificationProps.icon || null, //Default = line, can use checkmark here.
        });
    };

    useEffect(() => {
        displayGenericNotification();
    }, [genericNotifications]);

    return <>{children}</>;
};
