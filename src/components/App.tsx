import * as React from 'react';
import styled from 'styled-components';

//Components
import GlobalStyle from '../globalstyle';
import Navbar from './nav_bar';
import Backdrop from './backdrop';
import FeatureSectionOne from './body_section/FeatureSectionOne';
import FeatureSectionTwo from './body_section/FeatureSectionTwo';
import ReviewSectionThree from './body_section/ReviewSectionThree';
import GlobalSearchSectionFour from './body_section/GlobalSearchSectionFour';
import Footer from './footer';

//Styles:
const MainWrapper = styled.section``;

const App = () => {
    return (
        <>
            <GlobalStyle />
            <MainWrapper>
                <Navbar />
                <Backdrop />
                <FeatureSectionOne />
                <FeatureSectionTwo />
                <ReviewSectionThree />
                <GlobalSearchSectionFour />
                <Footer />
            </MainWrapper>
        </>
    );
};

export default App;
