import * as React from 'react';
import { useState } from 'react';

//Components:
import { ReactComponent as SignupSVG } from '../../assets/signup_animation.svg';
import GeneralButton from '../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';
import { TextInput } from '@mantine/core';

const MainContainer = styled.section`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    justify-content: center;
`;

const SVGContainer = styled.div``;

const FormContainer = styled.div`
    width: 30rem;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 0.3rem;
    margin: 2rem auto;
`;

const InputContainer = styled.div`
    margin: 1rem 0;
`;

const ButtonContainer = styled.div`
    margin-top: 2rem;
`;

//Interfaces:

//UserFront IDP API initialization;
const windowObject = window as any;
const Userfront = windowObject.Userfront;

//Tenant ID could possibly be stored in an ENV var.
Userfront.init('5nxxrqn7');

const UserSignup = () => {
    const [userSignupDetails, setUserSignupDetails] = useState({
        email: '',
        username: '',
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
                username: userSignupDetails.username,
            },
        });
    };

    return (
        <MainContainer>
            <SVGContainer>
                <SignupSVG />
            </SVGContainer>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <TextInput
                            name="email"
                            type="email"
                            styles={{
                                label: {
                                    color: 'rgba(0, 0, 34, .7)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    marginBottom: '.25rem',
                                },
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            required
                            label="Email Address"
                            placeholder="youremail@something.com"
                            value={userSignupDetails.email}
                            onChange={handleUserInput}
                        />
                    </InputContainer>
                    <InputContainer>
                        <TextInput
                            name="username"
                            type="text"
                            styles={{
                                label: {
                                    color: 'rgba(0, 0, 34, .7)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    marginBottom: '.25rem',
                                },
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            required
                            label="Username"
                            placeholder="FitEntity420"
                            value={userSignupDetails.username}
                            onChange={handleUserInput}
                        />
                    </InputContainer>
                    <InputContainer>
                        <TextInput
                            name="password"
                            type="password"
                            styles={{
                                label: {
                                    color: 'rgba(0, 0, 34, .7)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    marginBottom: '.25rem',
                                },
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            required
                            label="Password"
                            value={userSignupDetails.password}
                            onChange={handleUserInput}
                        />
                    </InputContainer>
                    <InputContainer>
                        <TextInput
                            name="passwordVerify"
                            type="password"
                            styles={{
                                label: {
                                    color: 'rgba(0, 0, 34, .7)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    marginBottom: '.25rem',
                                },
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '.9rem',
                                    fontWeight: 500,
                                },
                            }}
                            required
                            label="Confirm Password"
                            value={userSignupDetails.passwordVerify}
                            onChange={handleUserInput}
                        />
                    </InputContainer>
                    <ButtonContainer>
                        <GeneralButton buttonLabel="Sign up" />
                    </ButtonContainer>
                </form>
            </FormContainer>
        </MainContainer>
    );
};

export default UserSignup;
