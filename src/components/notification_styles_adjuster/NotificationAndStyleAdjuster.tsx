import React from 'react';

//Components:
import { GenericNotificationProvider } from '../generic_notification_provider/GenericNotificationProvider';
import { NotificationsProvider } from '@mantine/notifications';

//Hooks:
import { useLocation } from 'react-router-dom';
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

//Styles:
import GlobalStyle from '../../styles/globalStyles';
import GlobalStylesBuilder from '../../styles/globalStylesBuilder';
import { GlobalStylesViewTemplate } from '../../styles/globalStylesViewTemplate';
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
        if (!isBuilderOrFileView() && !isTemplateView()) {
            return 'bottom-left';
        }

        return width <= 1024 ? 'bottom-left' : 'bottom-center';
    };

    const imposeStyle = (): JSX.Element => {
        //CLEAMME: This can be possibly extracted to a StyleProvider component of some sort.

        if (isBuilderOrFileView()) {
            return <GlobalStylesBuilder />;
        }

        if (isTemplateView()) {
            return <GlobalStylesViewTemplate />;
        }

        return <GlobalStyle />;
    };

    return (
        <>
            {imposeStyle()}
            <NotificationsProvider
                position={repositionNotification()}
                limit={1}
                zIndex={89}
            >
                <GenericNotificationProvider>
                    {children}
                </GenericNotificationProvider>
            </NotificationsProvider>
        </>
    );
};
