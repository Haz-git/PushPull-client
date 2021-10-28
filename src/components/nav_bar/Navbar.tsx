import * as React from 'react';
import { useState } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';
import { Burger } from '@mantine/core';
import GeneralDrawer from '../general_components/GeneralDrawer';
import GeneralButton from '../../components/general_components/GeneralButton';
import UserDropdown from './navbar_components/UserDropdown';
import historyObject from '../../utils/historyObject';

//Styles:
import styled from 'styled-components';

const StyledNavbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props) => props.theme.lightBackground};
    width: 100%;
    padding: 1rem 1rem;
    text-align: left;
    top: 0;
    position: sticky;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
    z-index: 999;
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

const windowObject = window as any;
const Userfront = windowObject.Userfront;

Userfront.init('5nxxrqn7');

const Navbar = ({ toggleAuthDrawerWithView }: IComponentProps): JSX.Element => {
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);

    console.log(Userfront.user);

    const renderAuthOptionsIfUserNotLoggedIn = () => {
        if (Userfront.user.email) {
            return (
                <ButtonsContainer>
                    <UserDropdown />
                </ButtonsContainer>
            );
        } else {
            return (
                <ButtonsContainer>
                    <GeneralButton
                        buttonLabel="Log in"
                        padding=".45rem .7rem"
                        buttonBackground="#ffffff"
                        buttonTextColor="#7678ED"
                        textShadow="none"
                        border="2px solid #7678ED"
                        onClick={() => toggleAuthDrawerWithView(true, 'LOGIN')}
                    />
                    <ButtonDivider />
                    <GeneralButton
                        buttonLabel="Sign up"
                        padding=".6rem .7rem"
                        onClick={() => toggleAuthDrawerWithView(true, 'SIGNUP')}
                    />
                    <GeneralButton
                        buttonLabel="Logout"
                        padding=".6rem .7rem"
                        onClick={() => Userfront.logout()}
                    />
                </ButtonsContainer>
            );
        }
    };

    return (
        <StyledNavbar>
            <LogoContainer>
                <LogoSVG />
                <StyledNavLogo to="/" />
            </LogoContainer>
            {renderAuthOptionsIfUserNotLoggedIn()}
            <BurgerContainer>
                <Burger
                    opened={isBurgerOpened}
                    onClick={() => setIsBurgerOpened((o) => !o)}
                    color="rgba(224, 113, 51, 1)"
                    size={25}
                />
            </BurgerContainer>
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
