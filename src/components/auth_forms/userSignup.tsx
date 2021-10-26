import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import { ReactComponent as SignupSVG } from '../../assets/signup_animation.svg';
import UserSignupForm from './userSignupForm';

//Styles:
import styled from 'styled-components';
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

    @media ${deviceMin.mobileS} {
        display: block;
        padding: 0 0.5rem;
        position: relative;
    }

    @media ${deviceMin.laptopL} {
        display: grid;
        grid-template-columns: 63% 37%;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
    }
`;

const SVGContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.laptopL} {
        display: block;
    }
`;

//Interfaces:

const UserSignup = () => {
    return (
        <MainContainer>
            <SVGContainer>
                <SignupSVG />
            </SVGContainer>
            <UserSignupForm />
        </MainContainer>
    );
};

export default UserSignup;
