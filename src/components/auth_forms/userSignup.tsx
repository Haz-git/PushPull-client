import * as React from 'react';
import { useState } from 'react';

//Components:
import { ReactComponent as SignupSVG } from '../../assets/signup_animation.svg';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';
import GeneralButton from '../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';
import { TextInput } from '@mantine/core';
import { LogoFacebook } from '@styled-icons/ionicons-solid';
import { LogoGoogle } from '@styled-icons/ionicons-solid';

const FbLogo = styled(LogoFacebook)`
    color: #ffffff;
    height: 1.25rem;
    width: 1.25rem;
`;

const GLogo = styled(LogoGoogle)`
    color: #ffffff;
    height: 1.25rem;
    width: 1.25rem;
`;

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
    margin: 0.75rem 0;
`;

const ErrorContainer = styled.div`
    text-align: center;
`;

const ErrorText = styled.h2<IErrorText>`
    font-size: 0.9rem;
    color: ${(props) => props.theme.accentColors.red};
    font-weight: 700;
    visibility: ${(props) => (props.display === 'true' ? 'visible' : 'hidden')};
`;

const PrimaryHeading = styled.h1`
    font-size: 1.2rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

const SecondaryHeading = styled.h2`
    font-size: 1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
`;

const HeaderDivider = styled.div`
    height: 0.5rem;
`;

const InputContainer = styled.div`
    margin: 0.5rem 0;
`;

const ButtonContainer = styled.div`
    margin-top: 1rem;
`;

const OrRule = styled.h3`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #d3d3d3;
    line-height: 0.1em;
    margin: 1.5rem 0;
    font-size: 1rem;
    color: #c6c6c6;
    font-weight: 900;
`;

const OrText = styled.span`
    background: #fff;
    padding: 0 1rem;
`;

const ProviderContainer = styled.div`
    margin: 1rem 0;
`;

const ProviderDivider = styled.div`
    height: 1rem;
`;

const RedirectContainer = styled.div`
    text-align: center;
    margin-top: 1rem;
`;

const RedirectText = styled.h2`
    font-size: 1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
`;

const RedirectLink = styled.a`
    font-weight: 900;
    color: ${(props) => props.theme.accentColors.orange};
`;

//Interfaces:

interface IErrorText {
    display: string;
}

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

    const [alertMessage, setAlertMessage] = useState('alertMessageDefault');

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserSignupDetails({
            ...userSignupDetails,
            [e.target.name]: e.target.value,
        });
    };

    const isUsernameValid = () => {
        if (
            userSignupDetails.username !== '' &&
            userSignupDetails.username.length >= 3
        )
            return true;
        return false;
    };

    const isPasswordVerified = () => {
        if (userSignupDetails.password !== userSignupDetails.passwordVerify)
            return false;
        return true;
    };

    const checkAlertMessage = () => {
        if (alertMessage !== 'alertMessageDefault') return 'true';
        else return 'false';
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (alertMessage !== '') setAlertMessage('');

        if (!isPasswordVerified()) {
            return setAlertMessage(
                '"password" and "confirm password" must match'
            );
        }

        if (!isUsernameValid()) {
            return setAlertMessage(
                '"username" must be greater than 3 characters'
            );
        }

        Userfront.signup({
            method: 'password',
            email: userSignupDetails.email,
            password: userSignupDetails.password,
            username: userSignupDetails.username,
        }).catch((err: any) => {
            console.log(err);
            console.log(err.message);
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
                <ErrorContainer>
                    <ErrorText display={checkAlertMessage()}>
                        {alertMessage}
                    </ErrorText>
                </ErrorContainer>
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
                <RedirectContainer>
                    <RedirectText>
                        Already have an account?{' '}
                        <RedirectLink href="/login">Log in</RedirectLink>
                    </RedirectText>
                </RedirectContainer>
                {/* <OrRule>
                    <OrText>OR</OrText>
                </OrRule>
                <ProviderContainer>
                    <GeneralButton
                        buttonLabel="Sign up with Google"
                        buttonBackground="#0F9D58"
                        buttonIcon={<GLogo />}
                    />
                </ProviderContainer> */}
            </FormContainer>
        </MainContainer>
    );
};

export default UserSignup;
