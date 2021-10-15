import * as React from 'react';
import { useState } from 'react';
import { Switch, Router, Route } from 'react-router-dom';

//Style Imports:
import styled from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/themes';

//Components:
import history from '../utils/historyObject';
import Navbar from './nav_bar/Navbar';
import MainFooter from './footer/MainFooter';
import MainLandingPageView from './main_landing_page/MainLandingPageView';
import MainSearchPage from './search_page/MainSearchPage';
import MainWorkoutProgramPage from './workout_program_page/MainWorkoutProgramPage';
import MainAddReviewPageView from './add_review_page/MainAddReviewPageView';
import GeneralModal from './general_components/GeneralModal';
import FeedbackForm from './general_components/FeedbackForm';

//Styles:
const BugReportModalContainer = styled.div``;

const App = () => {
    const [stateBugReportModal, setStateBugReportModal] = useState(false);
    const openBugReportModal = () => setStateBugReportModal(true);
    const closeBugReportModal = () => setStateBugReportModal(false);

    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <>
                    <BugReportModalContainer>
                        <GeneralModal
                            openBoolean={stateBugReportModal}
                            closeFunc={closeBugReportModal}
                            title="Send Feedback"
                        >
                            <FeedbackForm />
                        </GeneralModal>
                    </BugReportModalContainer>
                    <Router history={history}>
                        <Navbar />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={MainLandingPageView}
                            />
                            <Route
                                exact
                                path="/search"
                                component={MainSearchPage}
                            />
                            <Route
                                exact
                                path="/program/:id"
                                component={MainWorkoutProgramPage}
                            />
                            <Route
                                exact
                                path="/add-review/:id"
                                component={MainAddReviewPageView}
                            />
                        </Switch>
                    </Router>
                    <MainFooter bugReportHandler={openBugReportModal} />
                </>
            </ThemeProvider>
        </>
    );
};

export default App;
