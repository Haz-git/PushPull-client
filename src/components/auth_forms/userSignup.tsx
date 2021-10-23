import * as React from 'react';
import { useState } from 'react';

//Components:

//Styles:

//Interfaces:

//UserFront IDP API initialization;
const windowObject = window as any;
const Userfront = windowObject.Userfront;

//Tenant ID could possibly be stored in an ENV var.
Userfront.init('5nxxrqn7');

const userSignup = () => {
    return <div>Sign up page</div>;
};

export default userSignup;
