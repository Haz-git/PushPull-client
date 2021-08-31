import * as React from 'react';
import { Switch, Router, Route } from 'react-router-dom';

//Styles:
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

const App = () => {
    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <Router history={history}>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={MainLandingPageView} />
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
                    </Switch>
                    <MainFooter />
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
