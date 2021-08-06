import * as React from 'react';

//Styles:
import GlobalStyle from '../styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/themes';

//Components
import Navbar from './nav_bar/Navbar';
import Backdrop from './backdrop/BackdropMain';
import BodySectionMain from './body_section/BodySectionMain';
import Footer from './footer';

const App = () => {
    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <Navbar />
                <Backdrop />
                <BodySectionMain />
                <Footer />
            </ThemeProvider>
        </>
    );
};

export default App;
