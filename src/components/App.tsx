import * as React from 'react';
import { useState } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import loadable from '@loadable/component';

//Context:
import { createContext } from 'react';

//Hooks:
import useLoginStatus from '../utils/hooks/useLoginStatus';

//Style Imports:
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/themes';

//Components:
import LoadProgress from '../components/nprogress/LoadProgress';
import CustomNotifProvider from '../components/custom_notif_provider/CustomNotifProvider';
import PrivateRoute from './protect_route/PrivateRoute';
import history from '../utils/historyObject';
import Navbar from './nav_bar/Navbar';
import MainFooter from './footer/MainFooter';
import MainLandingPageView from './main_landing_page/MainLandingPageView';
import MainSearchPage from './search_page/MainSearchPage';
import MainWorkoutProgramPage from './workout_program_page/MainWorkoutProgramPage';
import GeneralModal from './general_components/GeneralModal';
import FeedbackForm from './general_components/FeedbackForm';
import PasswordResetForm from './auth_forms/PasswordResetForm';
import ProfilePageView from './profile_page/ProfilePageView';
import NotFound from './not_found_page/NotFound';

//Signup Drawer
import GeneralDrawer from './general_components/GeneralDrawer';
import UserAuthForm from './auth_forms/UserAuthForm';
import AuthPage from './auth_forms/AuthPage';

//Styles:
const BugReportModalContainer = styled.div``;

const SignupDrawerContainer = styled.div``;

export const AuthContext = createContext<any>(null); //Default value set to null

//Code-splitting, Loadable Components to decrease package size:
const MainAddReviewPageView = loadable(
    () => import('./add_review_page/MainAddReviewPageView'),
    {
        fallback: (
            <LoadProgress
                isLoadBuilderMode={false}
                isAnimating={true}
                minimum={0}
                incrementDuration={500}
            />
        ),
    }
);

const MainBuildProgramView = loadable(
    () => import('./build_program_page/MainBuildProgramView'),
    {
        fallback: (
            <LoadProgress
                isLoadBuilderMode={true}
                isAnimating={true}
                minimum={0}
                incrementDuration={500}
            />
        ),
    }
);

const App = () => {
    const [stateBugReportModal, setStateBugReportModal] = useState(false);
    const [stateAuthDrawer, setStateAuthDrawer] = useState(false);
    const [stateAuthFormView, setStateAuthFormView] = useState('SIGNUP');

    const isUserLoggedIn = useLoginStatus();

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
                <Router history={history}>
                    <CustomNotifProvider>
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
                                path="/authenticate"
                                component={AuthPage}
                            />
                            <Route
                                exact
                                path="/program/:id"
                                render={(props) => (
                                    <AuthContext.Provider
                                        value={{ toggleAuthDrawerWithView }}
                                    >
                                        <MainWorkoutProgramPage
                                            {...props}
                                            toggleAuthDrawerWithView={
                                                toggleAuthDrawerWithView
                                            }
                                        />
                                    </AuthContext.Provider>
                                )}
                            />
                            <Route
                                exact
                                path="/user/:id"
                                component={ProfilePageView}
                            />
                            <PrivateRoute
                                exact
                                path="/add-review/:id"
                                authPath="/authenticate"
                                isAuthenticated={isUserLoggedIn}
                                component={MainAddReviewPageView}
                                toggleAuthDrawerWithView={
                                    toggleAuthDrawerWithView
                                }
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
                            <PrivateRoute
                                exact
                                path="/builder/dashboard"
                                authPath="/authenticate"
                                isAuthenticated={isUserLoggedIn}
                                component={MainBuildProgramView}
                                toggleAuthDrawerWithView={
                                    toggleAuthDrawerWithView
                                }
                            />
                            <Route component={NotFound} />
                        </Switch>
                        <MainFooter bugReportHandler={openBugReportModal} />
                    </CustomNotifProvider>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
