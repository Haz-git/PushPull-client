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

const CustomNotifProvider = ({ children }: IComponentProps): JSX.Element => {
    const Location = useLocation();
    const { width } = useWindowDimensions();

    const checkIfBuilderOrFile = (): boolean => {
        if (
            Location.pathname.includes('builder') ||
            Location.pathname.includes('file')
        )
            return true;
        return false;
    };

    const checkIfTemplateView = (): boolean => {
        if (Location.pathname.includes('template/view')) {
            return true;
        }

        return false;
    };

    const repositionNotif = (): any => {
        if (width <= 1024) return 'bottom-left';
        return 'bottom-center';
    };

    const renderNotificationProviderOnURL = (): JSX.Element => {
        if (checkIfBuilderOrFile()) {
            return (
                <>
                    <GlobalStylesBuilder />
                    <NotificationsProvider
                        position={repositionNotif()}
                        limit={5}
                        zIndex={89}
                    >
                        {children}
                    </NotificationsProvider>
                </>
            );
        }

        if (checkIfTemplateView()) {
            return (
                <>
                    <GlobalStylesViewTemplate />
                    <NotificationsProvider
                        position={repositionNotif()}
                        limit={5}
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
                    limit={5}
                    zIndex={89}
                >
                    {children}
                </NotificationsProvider>
            </>
        );
    };
    return <>{renderNotificationProviderOnURL()}</>;
};

export default CustomNotifProvider;
