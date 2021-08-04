import * as React from 'react';

//Styles:
import styled from 'styled-components';

const StyledNavbar = styled.nav`
    background: ${(props) => props.theme.background};
    width: 100%;
    border: 1px solid black;
`;

//Interfaces:

const Navbar = () => {
    return (
        <StyledNavbar>
            <h1>RankMyWorkout</h1>
        </StyledNavbar>
    );
};

export default Navbar;
