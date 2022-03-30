import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import Userfront from '@userfront/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';
import { ReactComponent as DarkLogoSVG } from '../../assets/dark_logo.svg';
import { Burger } from '@mantine/core';
import GeneralDrawer from '../general_components/GeneralDrawer';
import GeneralButton from '../../components/general_components/GeneralButton';
import UserDropdown from './navbar_components/UserDropdown';
import useLoginStatus from '../../utils/hooks/useLoginStatus';
import { Tooltip } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import { CaretLeft } from '@styled-icons/fluentui-system-filled/CaretLeft';

const LeftIcon = styled(CaretLeft)`
    height: 3rem;
    width: 2rem;
    color: #ffffff;
`;

const StyledNavbar = styled.nav<NavbarProps>`
    top: 0;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props) =>
        props.isBuilder ? '#2C2C2C' : props.theme.lightBackground};
    width: 100%;
    height: 3.75rem;
    // padding: 0.5rem 1rem;
    text-align: left;
    // border-bottom: 1px solid #d6d6d6;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
    z-index: 99;
`;

const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-left: -0.5rem;
    margin-left: 0.5rem;
    padding-right: 0.5rem;
    height: 3.75rem;
`;

const BuilderBackButtonContainer = styled.div`
    margin-right: 0.5rem;
    background: #525252;
    border-radius: 0.3rem;
    width: 1.8rem;
`;

const BuilderBackButton = styled(Link)``;

const StyledNavLogo = styled(NavLink)`
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    outline: none;
    border: none;
    background: transparent;

    &:focus {
        outline: none;
    }
`;

const LogoContainer = styled.div`
    position: relative;
    height: 2rem;
    width: 10rem;

    @media ${deviceMin.mobileS} {
        height: 2rem;
        width: 10rem;
    }

    @media ${deviceMin.mobileM} {
        height: 2.5rem;
        width: 10rem;
    }

    @media ${deviceMin.mobileL} {
        height: 2.5rem;
        width: 10rem;
    }

    @media ${deviceMin.browserSm} {
        height: 2.5rem;
        width: 10rem;
    }
`;

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
`;

const ButtonsContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.browserSm} {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const ButtonDivider = styled.div`
    width: 2rem;
`;

const BurgerContainer = styled.div`
    @media ${deviceMin.browserSm} {
        display: none;
    }
`;

const MobileButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0rem 1rem;
    row-gap: 1rem;
`;

//Interfaces:

interface IComponentProps {
    toggleAuthDrawerWithView: (state: boolean, view: string) => void;
    isUserLoggedIn: boolean;
}

interface NavbarProps {
    isBuilder: boolean;
}

//Userfront Initialization:

Userfront.init('5nxxrqn7');

const Navbar = ({
    toggleAuthDrawerWithView,
    isUserLoggedIn,
}: IComponentProps): JSX.Element => {
    const User = useSelector((state: RootStateOrAny) => state.user.user);
    const template = useSelector((state: RootStateOrAny) => state.template);
    const Location = useLocation();
    // const isUserLoggedIn = useLoginStatus();
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);

    // FIXME: Doesn't auto-logout when userfront's refresh token expires

    const renderAuthOptionsIfUserNotLoggedIn = () => {
        if (isUserLoggedIn) {
            const { email, image, username } = User;

            return (
                <UserDropdown email={email} image={image} username={username} />
            );
        } else if (!isUserLoggedIn && Location.pathname !== '/authenticate') {
            return (
                <>
                    <ButtonsContainer>
                        <GeneralButton
                            buttonLabel="Log in"
                            padding=".45rem .7rem"
                            buttonBackground="#ffffff"
                            buttonTextColor="#7678ED"
                            textShadow="none"
                            border="2px solid #7678ED"
                            onClick={() =>
                                toggleAuthDrawerWithView(true, 'LOGIN')
                            }
                        />
                        <ButtonDivider />
                        <GeneralButton
                            buttonLabel="Sign up"
                            padding=".6rem .7rem"
                            onClick={() =>
                                toggleAuthDrawerWithView(true, 'SIGNUP')
                            }
                        />
                    </ButtonsContainer>
                    <BurgerContainer>
                        <Burger
                            opened={isBurgerOpened}
                            onClick={() => setIsBurgerOpened((o) => !o)}
                            color="rgba(224, 113, 51, 1)"
                            size={25}
                        />
                    </BurgerContainer>
                </>
            );
        } else {
            return null;
        }
    };

    const checkIfBuilder = () => {
        if (Location.pathname.includes('builder')) return true;
        return false;
    };

    const renderLogoInBuilder = () => {
        if (checkIfBuilder()) return <DarkLogoSVG />;
        return <LogoSVG />;
    };

    const returnLogoLink = () => {
        if (checkIfBuilder()) {
            if (checkIfBuilder()) return '/builder/dashboard/recents';
        }
        return '/';
    };

    const renderBuilderBackButton = () => {
        if (checkIfBuilder()) {
            return (
                <BuilderBackButtonContainer>
                    <Tooltip
                        placement="start"
                        transition="rotate-left"
                        withArrow
                        label="Back to homepage"
                    >
                        <BuilderBackButton to="/">
                            <LeftIcon />
                        </BuilderBackButton>
                    </Tooltip>
                </BuilderBackButtonContainer>
            );
        }

        return null;
    };

    const controlRenderNavbar = () => {
        if (
            Location.pathname.includes('file') ||
            Location.pathname.includes('template/view')
        )
            return null;
        return (
            <StyledNavbar isBuilder={checkIfBuilder()}>
                <LeftWrapper>
                    {renderBuilderBackButton()}
                    <LogoContainer>
                        <StyledNavLogo to={returnLogoLink()}>
                            {renderLogoInBuilder()}
                        </StyledNavLogo>
                    </LogoContainer>
                </LeftWrapper>
                <AuthContainer>
                    {renderAuthOptionsIfUserNotLoggedIn()}
                </AuthContainer>
                <GeneralDrawer
                    openBoolean={isBurgerOpened}
                    closeFunc={() => setIsBurgerOpened(false)}
                    position="right"
                    size="50%"
                    padding={0}
                    title=""
                >
                    <MobileButtonsContainer>
                        <GeneralButton
                            buttonLabel="Log in"
                            padding=".45rem .7rem"
                            buttonBackground="#ffffff"
                            buttonTextColor="#7678ED"
                            textShadow="none"
                            border="2px solid #7678ED"
                            onClick={() => {
                                setIsBurgerOpened(false);
                                toggleAuthDrawerWithView(true, 'LOGIN');
                            }}
                        />

                        <GeneralButton
                            buttonLabel="Sign up"
                            padding=".6rem .7rem"
                            onClick={() => {
                                setIsBurgerOpened(false);
                                toggleAuthDrawerWithView(true, 'SIGNUP');
                            }}
                        />
                    </MobileButtonsContainer>
                </GeneralDrawer>
            </StyledNavbar>
        );
    };

    return <>{controlRenderNavbar()}</>;
};

export default Navbar;
