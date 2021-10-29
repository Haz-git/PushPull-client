import * as React from 'react';

//Components:
import UserAuthForm from './UserAuthForm';

//Styles:

//Interfaces:

const AuthPage = () => {
    return (
        <div>
            <UserAuthForm
                authStateRenderView="LOGIN"
                closeAuthDrawerContainer={() => console.log('No use')}
            />
        </div>
    );
};

export default AuthPage;
