import * as React from 'react';

//Components
import Navbar from './nav_bar';
import Backdrop from './backdrop';
import FeatureSectionOne from './body_section/FeatureSectionOne';
import FeatureSectionTwo from './body_section/FeatureSectionTwo';
import ReviewSectionThree from './body_section/ReviewSectionThree';
import GlobalSearchSectionFour from './body_section/GlobalSearchSectionFour';
import Footer from './footer';

//Styles:

const App = () => {
    return (
        <>
            <div>
                <Navbar />
                <Backdrop />
                <FeatureSectionOne />
                <FeatureSectionTwo />
                <ReviewSectionThree />
                <GlobalSearchSectionFour />
                <Footer />
            </div>
        </>
    );
};

export default App;
