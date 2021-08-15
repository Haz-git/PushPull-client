import * as React from 'react';

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
    /* box-shadow: ${(props) => props.theme.shadows.sm};
    z-index: 99999; */
`;

const StyledNavLogo = styled(Link)`
    outline: none;
    border: none;
    background: transparent;

    &:focus {
        outline: none;
    }
`;

const LogoContainer = styled.div`
    height: 2rem;
    width: 10rem;
`;

//Interfaces:

const Navbar = () => {
    return (
        <StyledNavbar>
            <StyledNavLogo to="/">
                <LogoContainer>
                    <LogoSVG />
                </LogoContainer>
            </StyledNavLogo>
        </StyledNavbar>
    );
};

export default Navbar;
