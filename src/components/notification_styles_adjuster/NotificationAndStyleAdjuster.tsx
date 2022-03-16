import React from 'react';
import { useLocation } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import GlobalStyle from '../../styles/globalStyles';
import GlobalStylesBuilder from '../../styles/globalStylesBuilder';
import { GlobalStylesViewTemplate } from '../../styles/globalStylesViewTemplate';
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

interface IComponentProps {
    children: React.ReactNode;
}

/**
 * This component repositions the general location of Mantine's notification hook based on page.
 * In addition to repositioning, custom styles for each page are also wrapped.
 *
 * Purpose -- Mantine's NotificationsProvider does not allow specific notification changes.
 * CLEANME: Component can be abstracted further. Naming is debatable.
 *
 * GenericNotificationProvider will also wrap here to catch any non-error notifications.
 */

export const NotificationAndStyleAdjuster = ({
    children,
}: IComponentProps): JSX.Element => {
    const Location = useLocation();
    const { width } = useWindowDimensions();

    const isBuilderOrFileView = (): boolean => {
        return (
            Location.pathname.includes('builder') ||
            Location.pathname.includes('file')
        );
    };

    const isTemplateView = (): boolean => {
        return Location.pathname.includes('template/view');
    };

    const repositionNotification = (): any => {
        return width <= 1024 ? 'bottom-left' : 'bottom-center';
    };

    const renderNotificationProviderOnURL = (): JSX.Element => {
        if (isBuilderOrFileView()) {
            return (
                <>
                    <GlobalStylesBuilder />
                    <NotificationsProvider
                        position={repositionNotification()}
                        limit={1}
                        zIndex={89}
                    >
                        {children}
                    </NotificationsProvider>
                </>
            );
        }

        if (isTemplateView()) {
            return (
                <>
                    <GlobalStylesViewTemplate />
                    <NotificationsProvider
                        position={repositionNotification()}
                        limit={2}
                        zIndex={89}
                    >
                        {children}
                    </NotificationsProvider>
                </>
            );
        }

        return (
            <>
                <GlobalStyle />
                <NotificationsProvider
                    position="bottom-left"
                    limit={2}
                    zIndex={89}
                >
                    {children}
                </NotificationsProvider>
            </>
        );
    };
    return <>{renderNotificationProviderOnURL()}</>;
};
