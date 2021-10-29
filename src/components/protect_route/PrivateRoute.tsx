import * as React from 'react';

//Components:
import { Route, Redirect } from 'react-router-dom';
import useLoginStatus from '../../utils/hooks/useLoginStatus';

//Styles:

//Interfaces:

interface IComponentProps {
    children: any;
    rest: any;
}

const PrivateRoute = ({ children, ...rest }: IComponentProps): JSX.Element => {
    const isLoggedIn = useLoginStatus();
    return (
        <Route
            {...rest}
            render={() => {
                return isLoggedIn === true ? (
                    children
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
};

export default PrivateRoute;
