import * as React from 'react';

//Components:
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';

//Styles:

//Interfaces:

const PrivateRoute = ({
    component,
    isAuthenticated,
    toggleAuthDrawerWithView,
    authPath,
    ...rest
}: any) => {
    const Location = useLocation();
    if (isAuthenticated) {
        return <Route {...rest} component={component} />;
    } else {
        return (
            <Redirect to={{ pathname: authPath, state: { from: Location } }} />
        );
    }
};

export default PrivateRoute;
