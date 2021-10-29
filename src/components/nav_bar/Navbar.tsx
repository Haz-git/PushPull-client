import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import Userfront from '@userfront/react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';
import { Burger } from '@mantine/core';
import GeneralDrawer from '../general_components/GeneralDrawer';
import GeneralButton from '../../components/general_components/GeneralButton';
import UserDropdown from './navbar_components/UserDropdown';
import useLoginStatus from '../../utils/hooks/useLoginStatus';

//Styles:
import styled from 'styled-components';

const StyledNavbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props) => props.theme.lightBackground};
    width: 100%;
    height: 3.75rem;
    padding: 0.5rem 1rem;
    text-align: left;
    top: 0;
    position: sticky;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
    z-index: 995;
`;

const StyledNavLogo = styled(Link)`
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

    @media ${deviceMin.browserSm} {
        height: 2rem;
        width: 10rem;
    }
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
}

//Userfront Initialization:

Userfront.init('5nxxrqn7');

const Navbar = ({ toggleAuthDrawerWithView }: IComponentProps): JSX.Element => {
    const User = useSelector((state: RootStateOrAny) => state.user.user);
    const Location = useLocation();
    const isUserLoggedIn = useLoginStatus();
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);

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

    return (
        <StyledNavbar>
            <LogoContainer>
                <LogoSVG />
                <StyledNavLogo to="/" />
            </LogoContainer>
            {renderAuthOptionsIfUserNotLoggedIn()}
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

export default Navbar;
