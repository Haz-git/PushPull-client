import React from 'react';
import { useLocation } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import GlobalStyle from '../../styles/globalStyles';
import GlobalStylesBuilder from '../../styles/globalStylesBuilder';
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

interface IComponentProps {
    children: React.ReactNode;
}

const CustomNotifProvider = ({ children }: IComponentProps): JSX.Element => {
    const Location = useLocation();
    const { width } = useWindowDimensions();

    const checkIfBuilder = () => {
        if (Location.pathname.includes('builder')) return true;
        return false;
    };

    const repositionNotif = () => {
        if (width <= 1024) return 'bottom-left';
        return 'bottom-center';
    };

    const renderNotificationProviderOnURL = () => {
        if (!checkIfBuilder()) {
            return (
                <>
                    <GlobalStyle />
                    <NotificationsProvider
                        position="bottom-left"
                        zIndex={99999}
                        limit={5}
                    >
                        {children}
                    </NotificationsProvider>
                </>
            );
        }

        return (
            <>
                <GlobalStylesBuilder />
                <NotificationsProvider
                    position={repositionNotif()}
                    zIndex={99999}
                    limit={5}
                >
                    {children}
                </NotificationsProvider>
            </>
        );
    };
    return <>{renderNotificationProviderOnURL()}</>;
};

export default CustomNotifProvider;
