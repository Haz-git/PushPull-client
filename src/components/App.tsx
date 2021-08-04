import * as React from 'react';

//Styles:
import GlobalStyle from '../styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/themes';

//Components
import Navbar from './nav_bar/Navbar';
import Backdrop from './backdrop';
import FeatureSectionOne from './body_section/FeatureSectionOne';
import FeatureSectionTwo from './body_section/FeatureSectionTwo';
import ReviewSectionThree from './body_section/ReviewSectionThree';
import GlobalSearchSectionFour from './body_section/GlobalSearchSectionFour';
import Footer from './footer';
import GeneralButton from './general_components/GeneralButton';

const App = () => {
    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <Navbar />
                <Backdrop />
                <FeatureSectionOne />
                <FeatureSectionTwo />
                <ReviewSectionThree />
                <GlobalSearchSectionFour />
                <Footer />
                <GeneralButton />
            </ThemeProvider>
        </>
    );
};

export default App;
