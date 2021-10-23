import * as React from 'react';
import { useState } from 'react';

//Components:
import { ReactComponent as SignupSVG } from '../../assets/signup_animation.svg';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';
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
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const LogoContainer = styled.div`
    text-align: center;
    margin: 0 auto;
    width: 10rem;
`;

const HeadingContainer = styled.div`
    text-align: center;
    margin: 1rem 0;
`;

const PrimaryHeading = styled.h1`
    font-size: 1.2rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

const SecondaryHeading = styled.h2`
    font-size: 1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 800;
`;

const HeaderDivider = styled.div`
    height: 0.5rem;
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

    const [alertMessage, setAlertMessage] = useState('');

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserSignupDetails({
            ...userSignupDetails,
            [e.target.name]: e.target.value,
        });
    };

    const isPasswordVerified = () => {
        if (userSignupDetails.password !== userSignupDetails.passwordVerify)
            return false;
        return true;
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (alertMessage !== '') setAlertMessage('');

        if (!isPasswordVerified()) setAlertMessage('Passwords must match');

        Userfront.signup({
            method: 'password',
            email: userSignupDetails.email,
            password: userSignupDetails.password,
            data: {
                username: userSignupDetails.username,
            },
        }).catch((err: any) => {
            setAlertMessage(err.message);
        });
    };

    return (
        <MainContainer>
            <SVGContainer>
                <SignupSVG />
            </SVGContainer>
            <FormContainer>
                <LogoContainer>
                    <LogoSVG />
                </LogoContainer>
                <HeadingContainer>
                    <PrimaryHeading>
                        Create your PushPull Account
                    </PrimaryHeading>
                    <HeaderDivider />
                    <SecondaryHeading>
                        It's free and only takes a minute.
                    </SecondaryHeading>
                </HeadingContainer>
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
