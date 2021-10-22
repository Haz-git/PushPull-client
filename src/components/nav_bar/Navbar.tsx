import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';

//Styles:
import styled from 'styled-components';

const StyledNavbar = styled.nav`
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

//Interfaces:

const Navbar = () => {
    return (
        <StyledNavbar>
            <LogoContainer>
                <LogoSVG />
                <StyledNavLogo to="/" />
            </LogoContainer>
        </StyledNavbar>
    );
};

export default Navbar;
