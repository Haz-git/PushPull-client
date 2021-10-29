import * as React from 'react';

//Components:
import { Route, Redirect, RouteProps } from 'react-router-dom';

//Styles:

//Interfaces:

const PrivateRoute = ({
    component,
    isAuthenticated,
    toggleAuthDrawerWithView,
    authPath,
    ...rest
}: any) => {
    if (isAuthenticated) {
        return <Route {...rest} component={component} />;
    } else {
        return <Redirect to={{ pathname: authPath }} />;
    }
};

export default PrivateRoute;
