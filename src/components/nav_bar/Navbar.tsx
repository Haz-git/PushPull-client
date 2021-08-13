import * as React from 'react';

//Styles:
import styled from 'styled-components';

const StyledNavbar = styled.nav`
    background: ${(props) => props.theme.lightBackground};
    width: 100%;
    padding: 1rem 1rem;
    /* box-shadow: ${(props) => props.theme.shadows.sm};
    z-index: 99999; */
`;

const StyledNavLogo = styled.h1`
    color: ${(props) => props.theme.mainText};
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 700;
`;

//Interfaces:

const Navbar = () => {
    return (
        <StyledNavbar>
            <StyledNavLogo>PushPull</StyledNavLogo>
        </StyledNavbar>
    );
};

export default Navbar;
