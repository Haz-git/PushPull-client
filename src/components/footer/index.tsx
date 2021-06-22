import * as React from 'react';
import styled from 'styled-components';

//Styles:
const MainContainer = styled.div`
    border: 1px solid black;
    padding: 2em 1em;
`;

const index = () => {
    return (
        <MainContainer>
            This is the footer. Should contain 'About Us', 'Contact Us', Logo,
            and write a review(?)
        </MainContainer>
    );
};

export default index;
