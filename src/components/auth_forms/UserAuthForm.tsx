import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/authActions';

//Components:
import Userfront from '@userfront/react';
import historyObject from '../../utils/historyObject';
import GeneralDrawer from '../general_components/GeneralDrawer';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';
import GeneralButton from '../general_components/GeneralButton';
import { useNotifications } from '@mantine/notifications';
import { TextInput } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import { Dot } from '@styled-icons/bootstrap/Dot';

const DotIcon = styled(Dot)`
    height: 1.5rem;
    width: 1.5rem;
    color: ${(props) => props.theme.mainText};
`;

const FormContainer = styled.div<IFormContainerProps>`
    width: 100%;
    max-width: 35rem;
    background: ${(props) => props.formBackgroundColor};
    padding: 2rem 2rem;
    border-radius: 0.3rem;
    margin: 2rem auto;
    box-shadow: ${(props) => props.formShadow};
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
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 1rem;
`;

const RedirectText = styled.h2`
    font-size: 1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
`;

const RedirectLink = styled.button`
    border: none;
    background: transparent;
    font-weight: 900;
    color: ${(props) => props.theme.accentColors.orange};
    cursor: pointer;
`;

//Interfaces:

interface IErrorText {
    display: string;
}

interface IFormContainerProps {
    formBackgroundColor?: string;
    formShadow?: string;
}

interface IUserAuthFormProps {
    //Options will be 'SIGNUP' or 'LOGIN' or 'RESETSENDLINK' or 'RESETPASSWORD'
    authStateRenderView: string;
    closeAuthDrawerContainer: () => void;
    hasRedirection?: boolean;
    redirectPath?: string;
}

type IComponentProps = IFormContainerProps & IUserAuthFormProps;

//Tenant ID could possibly be stored in an ENV var.
Userfront.init('5nxxrqn7');

const UserAuthForm = ({
    formBackgroundColor = '#ffffff',
    formShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    authStateRenderView,
    closeAuthDrawerContainer,
    hasRedirection = false,
    redirectPath = '',
}: IComponentProps): JSX.Element => {
    const notifications = useNotifications();
    const dispatch = useDispatch();

    const [AuthFormRenderView, setAuthFormRenderView] =
        useState(authStateRenderView);

    const [userSignupDetails, setUserSignupDetails] = useState({
        email: '',
        username: '',
        password: '',
        passwordVerify: '',
    });

    const [userLoginDetails, setUserLoginDetails] = useState({
        email: '',
        password: '',
    });

    const [userPasswordResetDetails, setUserPasswordResetDetails] = useState({
        email: '',
    });

    const [userNewPasswordDetails, setUserNewPasswordDetails] = useState({
        password: '',
        passwordVerify: '',
    });

    const [alertMessage, setAlertMessage] = useState('alertMessageDefault');

    const handleUserSignupInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUserSignupDetails({
            ...userSignupDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleUserLoginInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUserLoginDetails({
            ...userLoginDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleUserPasswordResetInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUserPasswordResetDetails({
            ...userPasswordResetDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleUserNewPasswordInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUserNewPasswordDetails({
            ...userNewPasswordDetails,
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

    const isNewPasswordVerified = () => {
        if (
            userNewPasswordDetails.password !==
            userNewPasswordDetails.passwordVerify
        )
            return false;
        return true;
    };

    const checkAlertMessage = () => {
        if (alertMessage !== 'alertMessageDefault') return 'true';
        else return 'false';
    };

    const handleSignupSubmission = (e: React.FormEvent): void => {
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
            redirect: false,
        })
            .then((value: any) => {
                notifications.showNotification({
                    title: 'Wooo! Your Account Has Been Created!',
                    message: `Welcome to Pushpull, ${value.username}. Please verify your account by email.`,
                    color: 'orange',
                    autoClose: 20000,
                });

                setUserSignupDetails({
                    email: '',
                    password: '',
                    passwordVerify: '',
                    username: '',
                });

                setAuthFormRenderView('LOGIN');
            })
            .catch((err: any) => {
                setAlertMessage(err.message);
            });
    };

    const handleLoginSubmission = (e: React.FormEvent) => {
        e.preventDefault();

        Userfront.login({
            method: 'password',
            emailOrUsername: userLoginDetails.email,
            password: userLoginDetails.password,
            redirect: false,
        })
            .then((promise: any) => {
                setUserLoginDetails({ email: '', password: '' });
                dispatch(userLogin(Userfront.user));

                notifications.showNotification({
                    title: `Welcome Back, ${Userfront.user.username}`,
                    message: `You've been successfully logged in.`,
                    color: 'orange',
                    autoClose: 20000,
                });

                if (hasRedirection && redirectPath)
                    return historyObject.push(redirectPath);
                else closeAuthDrawerContainer();
            })
            .catch((err: any) => {
                setAlertMessage(err.message);
            });
    };

    const handlePasswordResetLinkSubmission = (e: React.FormEvent) => {
        e.preventDefault();

        Userfront.sendResetLink(userPasswordResetDetails.email)
            .then((promise: any) => {
                notifications.showNotification({
                    title: 'An Email Has Been Sent!',
                    message: `Please check your inbox and follow the link.`,
                    color: 'orange',
                    autoClose: 20000,
                });

                setUserPasswordResetDetails({ email: '' });

                closeAuthDrawerContainer();
            })
            .catch((err: any) => {
                setAlertMessage(err.message);
            });
    };

    const handlePasswordResetSubmission = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isNewPasswordVerified()) {
            return setAlertMessage(
                '"new password" and "confirm new password" must match'
            );
        }

        Userfront.resetPassword({ password: userNewPasswordDetails.password })
            .then((promise: any) => {
                notifications.showNotification({
                    title: 'Your Password Has Been Reset!',
                    message: `Make sure you keep it safe.`,
                    color: 'orange',
                    autoClose: 20000,
                });

                setUserNewPasswordDetails({ password: '', passwordVerify: '' });
            })
            .catch((err: any) => {
                setAlertMessage(err.message);
            });
    };

    const renderAuthFormView = () => {
        if (authStateRenderView !== undefined && authStateRenderView !== null) {
            switch (AuthFormRenderView) {
                case 'SIGNUP':
                    return (
                        <>
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
                            <form onSubmit={handleSignupSubmission}>
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
                                        onChange={handleUserSignupInput}
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
                                        onChange={handleUserSignupInput}
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
                                        onChange={handleUserSignupInput}
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
                                        onChange={handleUserSignupInput}
                                    />
                                </InputContainer>
                                <ButtonContainer>
                                    <GeneralButton buttonLabel="Sign up" />
                                </ButtonContainer>
                            </form>
                            <RedirectContainer>
                                <RedirectText>
                                    Already have an account?{' '}
                                    <RedirectLink
                                        onClick={() =>
                                            setAuthFormRenderView('LOGIN')
                                        }
                                    >
                                        Log in
                                    </RedirectLink>
                                </RedirectText>
                            </RedirectContainer>
                        </>
                    );
                case 'LOGIN':
                    return (
                        <>
                            <HeadingContainer>
                                <PrimaryHeading>
                                    Login to PushPull
                                </PrimaryHeading>
                                <HeaderDivider />
                                <SecondaryHeading>
                                    Welcome, glad to see you back.
                                </SecondaryHeading>
                            </HeadingContainer>
                            <ErrorContainer>
                                <ErrorText display={checkAlertMessage()}>
                                    {alertMessage}
                                </ErrorText>
                            </ErrorContainer>
                            <form onSubmit={handleLoginSubmission}>
                                <InputContainer>
                                    <TextInput
                                        name="email"
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
                                        label="Email Address or Username"
                                        placeholder=""
                                        value={userLoginDetails.email}
                                        onChange={handleUserLoginInput}
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
                                        value={userLoginDetails.password}
                                        onChange={handleUserLoginInput}
                                    />
                                </InputContainer>
                                <ButtonContainer>
                                    <GeneralButton buttonLabel="Login" />
                                </ButtonContainer>
                            </form>
                            <RedirectContainer>
                                <RedirectText>
                                    Forgot your{' '}
                                    <RedirectLink
                                        onClick={() =>
                                            setAuthFormRenderView(
                                                'RESETSENDLINK'
                                            )
                                        }
                                    >
                                        Password?
                                    </RedirectLink>
                                </RedirectText>
                            </RedirectContainer>
                            <RedirectContainer>
                                <RedirectText>
                                    Don't have an account?{' '}
                                    <RedirectLink
                                        onClick={() =>
                                            setAuthFormRenderView('SIGNUP')
                                        }
                                    >
                                        Create one
                                    </RedirectLink>
                                </RedirectText>
                            </RedirectContainer>
                        </>
                    );
                case 'RESETSENDLINK':
                    return (
                        <>
                            <HeadingContainer>
                                <PrimaryHeading>
                                    Forgot Password?
                                </PrimaryHeading>
                                <HeaderDivider />
                                <SecondaryHeading>
                                    We'll email you a link to reset your
                                    password.
                                </SecondaryHeading>
                            </HeadingContainer>
                            <ErrorContainer>
                                <ErrorText display={checkAlertMessage()}>
                                    {alertMessage}
                                </ErrorText>
                            </ErrorContainer>
                            <form onSubmit={handlePasswordResetLinkSubmission}>
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
                                        value={userPasswordResetDetails.email}
                                        onChange={handleUserPasswordResetInput}
                                    />
                                </InputContainer>
                                <ButtonContainer>
                                    <GeneralButton buttonLabel="Send Reset Link" />
                                </ButtonContainer>
                            </form>
                            <RedirectContainer>
                                <RedirectLink
                                    onClick={() =>
                                        setAuthFormRenderView('LOGIN')
                                    }
                                >
                                    Log in
                                </RedirectLink>
                                <DotIcon />
                                <RedirectLink
                                    onClick={() =>
                                        setAuthFormRenderView('SIGNUP')
                                    }
                                >
                                    Sign up
                                </RedirectLink>
                            </RedirectContainer>
                        </>
                    );
                case 'RESETPASSWORD':
                    return (
                        <>
                            <HeadingContainer>
                                <PrimaryHeading>Reset Password</PrimaryHeading>
                                <HeaderDivider />
                                <SecondaryHeading>
                                    Enter and confirm your new password below.
                                </SecondaryHeading>
                            </HeadingContainer>
                            <ErrorContainer>
                                <ErrorText display={checkAlertMessage()}>
                                    {alertMessage}
                                </ErrorText>
                            </ErrorContainer>
                            <form onSubmit={handlePasswordResetSubmission}>
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
                                        label="New Password"
                                        value={userNewPasswordDetails.password}
                                        onChange={handleUserNewPasswordInput}
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
                                        label="Confirm New Password"
                                        value={
                                            userNewPasswordDetails.passwordVerify
                                        }
                                        onChange={handleUserNewPasswordInput}
                                    />
                                </InputContainer>
                                <ButtonContainer>
                                    <GeneralButton buttonLabel="Reset My Password" />
                                </ButtonContainer>
                            </form>
                        </>
                    );

                default:
                    throw new Error('No Render Control String Was Set');
            }
        }
    };

    return (
        <FormContainer
            formBackgroundColor={formBackgroundColor}
            formShadow={formShadow}
        >
            <LogoContainer>
                <LogoSVG />
            </LogoContainer>
            {renderAuthFormView()}

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
    );
};

export default UserAuthForm;
