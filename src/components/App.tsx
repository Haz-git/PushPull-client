import * as React from 'react';

//Styles:
import GlobalStyle from '../styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/themes';

//Components
import Navbar from './nav_bar/Navbar';
import Backdrop from './backdrop/BackdropMain';
import BodySectionMain from './body_section/BodySectionMain';
import MainFooter from './footer/MainFooter';

const App = () => {
    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <Navbar />
                <Backdrop />
                <BodySectionMain />
                <MainFooter />
            </ThemeProvider>
        </>
    );
};

export default App;
