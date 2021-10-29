import * as React from 'react';

//Components:
import { Route, Redirect, RouteProps } from 'react-router-dom';

//Styles:

//Interfaces:

const PrivateRoute = ({
    component,
    isAuthenticated,
    toggleAuthDrawerWithView,
    ...rest
}: any) => {
    if (isAuthenticated) {
        return <Route {...rest} component={component} />;
    }
    return <>{toggleAuthDrawerWithView(true, 'LOGIN')}</>;
};

export default PrivateRoute;
