import * as React from 'react';

//Styles:
import styled from 'styled-components';

const StyledNavbar = styled.nav`
    background: ${(props) => props.theme.background};
    width: 100%;
    padding: 1rem 1rem;
    box-shadow: ${(props) => props.theme.shadows.sm};
`;

const StyledNavLogo = styled.h1`
    font-size: ${(props) => props.theme.fontSizes.xl};
    font-weight: 700;
`;

//Interfaces:

const Navbar = () => {
    return (
        <StyledNavbar>
            <StyledNavLogo>RankMyWorkout</StyledNavLogo>
        </StyledNavbar>
    );
};

export default Navbar;
