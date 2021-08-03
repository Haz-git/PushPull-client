import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider, NormalizeCSS } from '@mantine/core';
import App from './components/App';

//Styles:
import themeObject from './theme';

ReactDOM.render(
    <React.StrictMode>
        <MantineProvider theme={themeObject}>
            <NormalizeCSS />
            <App />
        </MantineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
