import * as React from 'react';

//Styles:
import styled from 'styled-components';

const StyledNavbar = styled.nav`
    background: ${(props) => props.theme.background};
    width: 100%;
    padding: 1rem 1rem;
`;

const StyledNavLogo = styled.h1`
    font-size: 1rem;
    font-weight: 700;
`;

//Interfaces:

const Navbar = () => {
    return (
        <StyledNavbar>
            <StyledNavLogo>RankmyWorkout</StyledNavLogo>
        </StyledNavbar>
    );
};

export default Navbar;
