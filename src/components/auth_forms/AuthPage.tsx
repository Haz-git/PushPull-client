import * as React from 'react';

//Components:
import UserAuthForm from './UserAuthForm';
import { useLocation } from 'react-router';

//Styles:

//Interfaces:

const AuthPage = () => {
    //Location used here
    const { state }: any = useLocation();

    const hasRedirection = () => {
        if (state?.from?.pathname) return true;
        return false;
    };
    const returnRedirectPath = () => {
        if (hasRedirection()) {
            return state.from.pathname;
        }
    };

    return (
        <div>
            <UserAuthForm
                authStateRenderView="LOGIN"
                closeAuthDrawerContainer={() =>
                    console.log('Not provided...as intended.')
                }
                hasRedirection={hasRedirection()}
                redirectPath={returnRedirectPath()}
                isAuthPath={true}
            />
        </div>
    );
};

export default AuthPage;
