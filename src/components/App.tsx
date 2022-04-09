import * as React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import pMinDelay from 'p-min-delay';
import loadable from '@loadable/component';

//Redux:
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { checkIfUserLoggedIn, userSignout } from '../redux/auth/authActions';

//Context:
import { createContext } from 'react';

//Hooks:
import useLoginStatus from '../utils/hooks/useLoginStatus';

//Style Imports:
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/themes';

//Components:
import LoadingIndicatorWithDelay from './nprogress/LoadingIndicatorWithDelay';
import LoadProgress from '../components/nprogress/LoadProgress';
import { NotificationAndStyleAdjuster } from './notification_styles_adjuster/NotificationAndStyleAdjuster';
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
import { ErrorNotificationProvider } from './error_handler/ErrorNotificationProvider';
// import { MainViewTemplateView } from './view_template_page/MainViewTemplateView';

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
    () =>
        import(
            /* webpackPrefetch: true */ './add_review_page/MainAddReviewPageView'
        ),
    {
        fallback: (
            <LoadProgress
                darkMode={false}
                isAnimating={true}
                minimum={0}
                incrementDuration={500}
            />
        ),
    }
);

const MainBuildProgramView = loadable(
    () =>
        import(
            /* webpackPrefetch: true */ './build_program_page/MainBuildProgramView'
        ),
    {
        fallback: (
            <LoadProgress
                darkMode={true}
                isAnimating={true}
                minimum={0}
                incrementDuration={500}
            />
        ),
    }
);

const MainBuildTemplateView = loadable(
    () =>
        import(
            /* webpackPrefetch: true */ './build_template_page/MainBuildTemplateView'
        ),
    {
        fallback: (
            <LoadProgress
                loadingText="Generating Template..."
                darkMode={true}
                isAnimating={true}
                minimum={0}
                incrementDuration={500}
            />
        ),
    }
);

const MainViewTemplateView = loadable(
    () =>
        import(
            /* webpackPrefetch: true */ './view_template_page/MainViewTemplateView'
        ),
    {
        //resolveComponent is necessary for named exports. Loadable components defaults to unnamed exports
        resolveComponent: (components: any) => components.MainViewTemplateView,
        fallback: (
            <LoadProgress
                loadingText="Rendering Template..."
                darkMode={true}
                isAnimating={true}
                minimum={0}
                incrementDuration={500}
            />
        ),
    }
);

const App = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: RootStateOrAny) => state?.user?.isLoggedIn
    );
    const [stateBugReportModal, setStateBugReportModal] = useState(false);
    const [stateAuthDrawer, setStateAuthDrawer] = useState(false);
    const [stateAuthFormView, setStateAuthFormView] = useState('SIGNUP');

    useEffect(() => {
        dispatch(checkIfUserLoggedIn());
    }, [isLoggedIn]);

    const toggleAuthDrawerWithView = (state: boolean, view: string): void => {
        setStateAuthFormView(view);
        setStateAuthDrawer(state);
    };

    const closeAuthDrawerContainer = (): void => setStateAuthDrawer(false);
    const openBugReportModal = (): void => setStateBugReportModal(true);
    const closeBugReportModal = (): void => setStateBugReportModal(false);

    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <Router history={history}>
                    <NotificationAndStyleAdjuster>
                        <ErrorNotificationProvider>
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
                                toggleAuthDrawerWithView={
                                    toggleAuthDrawerWithView
                                }
                                isUserLoggedIn={isLoggedIn}
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
                                    isAuthenticated={isLoggedIn}
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
                                <Route
                                    exact
                                    path="/template/view/:templateId"
                                    component={MainViewTemplateView}
                                />
                                <PrivateRoute
                                    exact
                                    path="/builder/dashboard/:dashboardView"
                                    authPath="/authenticate"
                                    isAuthenticated={isLoggedIn}
                                    component={MainBuildProgramView}
                                    toggleAuthDrawerWithView={
                                        toggleAuthDrawerWithView
                                    }
                                />
                                <PrivateRoute
                                    exact
                                    path="/file/:fileUuid"
                                    authPath="/authenticate"
                                    isAuthenticated={isLoggedIn}
                                    component={MainBuildTemplateView}
                                    toggleAuthDrawerWithView={
                                        toggleAuthDrawerWithView
                                    }
                                />
                                <Route component={NotFound} />
                            </Switch>
                            <MainFooter bugReportHandler={openBugReportModal} />
                        </ErrorNotificationProvider>
                    </NotificationAndStyleAdjuster>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
