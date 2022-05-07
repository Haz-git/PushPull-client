import React, { ReactNode } from 'react';

//Redux:
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

//Router:
import history from '../utils/historyObject';
import { Router } from 'react-router-dom';

//Notification Providers:
import { NotificationAndStyleAdjuster } from '../components/notification_styles_adjuster/NotificationAndStyleAdjuster';
import { ErrorNotificationProvider } from '../components/error_handler/ErrorNotificationProvider';

//Styles:
import { NormalizeCSS } from '@mantine/core';

//Interfaces:
interface IComponentProps {
    children: ReactNode;
}

/**
 * Will be wrapping all of our tests.
 * Need to wrap tests in Provider + Persist + Router. Might need to add more later.
 * This is so rendered components can have access to store.
 */

export const TestWrapper = ({ children }: IComponentProps): JSX.Element => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NormalizeCSS />
                <Router history={history}>
                    <NotificationAndStyleAdjuster>
                        <ErrorNotificationProvider>
                            {children}
                        </ErrorNotificationProvider>
                    </NotificationAndStyleAdjuster>
                </Router>
            </PersistGate>
        </Provider>
    );
};
