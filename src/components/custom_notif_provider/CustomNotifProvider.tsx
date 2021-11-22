import React from 'react';
import { useLocation } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import GlobalStyle from '../../styles/globalStyles';
import GlobalStylesBuilder from '../../styles/globalStylesBuilder';

interface IComponentProps {
    children: React.ReactNode;
}

const CustomNotifProvider = ({ children }: IComponentProps): JSX.Element => {
    const Location = useLocation();

    const checkIfBuilder = () => {
        if (Location.pathname.includes('builder')) return true;
        return false;
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
                    position="bottom-center"
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
