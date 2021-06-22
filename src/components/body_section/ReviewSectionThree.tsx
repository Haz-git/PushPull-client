import * as React from 'react';
import styled from 'styled-components';

//Styles:
const MainContainer = styled.div`
    border: 1px solid black;
    padding: 2em 1em;
`;

const ReviewSectionThree = () => {
    return (
        <MainContainer>
            This section is still not determined. This will either list out:
            <li>Most reviewed ramen</li>
            <li>Highest rated instant ramen</li>
            ...or something else...
        </MainContainer>
    );
};

export default ReviewSectionThree;
