import * as React from 'react';
import { useState } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';

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
import PasswordResetForm from './auth_forms/PasswordResetForm';

//Signup Drawer
import GeneralDrawer from './general_components/GeneralDrawer';
import UserAuthForm from './auth_forms/UserAuthForm';

//Styles:
const BugReportModalContainer = styled.div``;

const SignupDrawerContainer = styled.div``;

const App = () => {
    const [stateBugReportModal, setStateBugReportModal] = useState(false);
    const [stateAuthDrawer, setStateAuthDrawer] = useState(false);
    const [stateAuthFormView, setStateAuthFormView] = useState('SIGNUP');

    const toggleAuthDrawerWithView = (state: boolean, view: string) => {
        setStateAuthFormView(view);
        setStateAuthDrawer(state);
    };

    const closeAuthDrawerContainer = () => setStateAuthDrawer(false);

    const openBugReportModal = () => setStateBugReportModal(true);
    const closeBugReportModal = () => setStateBugReportModal(false);

    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <>
                    <SignupDrawerContainer>
                        <GeneralDrawer
                            openBoolean={stateAuthDrawer}
                            closeFunc={() => setStateAuthDrawer(false)}
                            title=""
                            padding={0}
                            size={isMobileOnly ? '100%' : '35rem'}
                            position={isMobileOnly ? 'bottom' : 'right'}
                        >
                            <UserAuthForm
                                formBackgroundColor="transparent"
                                formShadow="none"
                                authStateRenderView={stateAuthFormView}
                                closeAuthDrawerContainer={
                                    closeAuthDrawerContainer
                                }
                            />
                        </GeneralDrawer>
                    </SignupDrawerContainer>
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
                        <Navbar
                            toggleAuthDrawerWithView={toggleAuthDrawerWithView}
                        />
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
                                render={(props) => (
                                    <MainWorkoutProgramPage
                                        {...props}
                                        toggleAuthDrawerWithView={
                                            toggleAuthDrawerWithView
                                        }
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/add-review/:id"
                                component={MainAddReviewPageView}
                            />
                            <Route
                                exact
                                path="/password/reset"
                                render={(props) => (
                                    <PasswordResetForm
                                        {...props}
                                        closeAuthDrawerContainer={
                                            closeAuthDrawerContainer
                                        }
                                    />
                                )}
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
