import * as React from 'react';
import { Switch, Router, Route } from 'react-router-dom';

//Styles:
import GlobalStyle from '../styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/themes';

//Components:
import history from '../utils/historyObject';
import Navbar from './nav_bar/Navbar';
import MainLandingPageView from './main_landing_page/MainLandingPageView';
import MainSearchPage from './search_page/MainSearchPage';

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
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
