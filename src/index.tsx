import React from 'react';
import ReactDOM from 'react-dom';
import { NormalizeCSS } from '@mantine/core';
import App from './components/App';

//Styles:

ReactDOM.render(
    <React.StrictMode>
        <NormalizeCSS />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
