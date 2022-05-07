import React, { ReactNode } from 'react';

//Redux:
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

//Router:
import history from '../utils/historyObject';
import { Router } from 'react-router-dom';

//Styles:
import { NormalizeCSS } from '@mantine/core';

//Interfaces:
interface IComponentProps {
    children: ReactNode;
}

/**
 *
 *
 *
 */

export const TestWrapper = ({ children }: IComponentProps): JSX.Element => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NormalizeCSS />
                <Router history={history}>{children}</Router>
            </PersistGate>
        </Provider>
    );
};
