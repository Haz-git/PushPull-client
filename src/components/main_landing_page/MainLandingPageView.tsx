import * as React from 'react';

//Components:
import Backdrop from '../backdrop/BackdropMain';
import BodySectionMain from '../body_section/BodySectionMain';
import MainFooter from '../footer/MainFooter';

//Styles:

const MainLandingPageView = () => {
    return (
        <>
            <Backdrop />
            <BodySectionMain />
            <MainFooter />
        </>
    );
};

export default MainLandingPageView;
