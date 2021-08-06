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
import GeneralButton from './general_components/GeneralButton';

const App = () => {
    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <Navbar />
                <Backdrop />
                <BodySectionMain />
                <Footer />
                <GeneralButton />
            </ThemeProvider>
        </>
    );
};

export default App;
