import React from 'react';
import ReactDOM from 'react-dom';
import { NormalizeCSS } from '@mantine/core';
import App from './components/App';

//Redux:
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store';

//Styles:

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NormalizeCSS />
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
