import * as React from 'react';
import { useState } from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section``;

//Interfaces:

//UserFront IDP API initialization;
const windowObject = window as any;
const Userfront = windowObject.Userfront;

//Tenant ID could possibly be stored in an ENV var.
Userfront.init('5nxxrqn7');

const UserSignup = () => {
    const [userSignupDetails, setUserSignupDetails] = useState({
        email: '',
        userName: '',
        password: '',
        passwordVerify: '',
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserSignupDetails({
            ...userSignupDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        Userfront.signup({
            method: 'password',
            email: userSignupDetails.email,
            password: userSignupDetails.password,
            data: {
                userName: userSignupDetails.userName,
            },
        });
    };

    return (
        <MainContainer>
            <form onSubmit={handleSubmit}>
                <label>
                    Email Address
                    <input
                        name="email"
                        type="email"
                        value={userSignupDetails.email}
                        onChange={handleUserInput}
                    />
                </label>
            </form>
        </MainContainer>
    );
};

export default UserSignup;
