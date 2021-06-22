import * as React from 'react';
import styled from 'styled-components';

//Styles:
const MainContainer = styled.div`
    border: 1px solid black;
    padding: 2em 1em;
`;

const FeatureSectionTwo = () => {
    return (
        <MainContainer>
            This body section should showcase a feature of the app: preferably
            also on a difference device to suggest its responsiveness in another
            device. This feature would be to find new instant ramen to try.
            Ramen of the month?
        </MainContainer>
    );
};

export default FeatureSectionTwo;
