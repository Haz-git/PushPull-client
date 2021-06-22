import * as React from 'react';
import styled from 'styled-components';

//Components:
import SearchBar from '../general_components/SearchBar';

//Styles:
const MainContainer = styled.section`
    border: 1px solid black;
    padding: 1em 1em;
    text-align: center;
    margin: 0 auto;
`;

const index = () => {
    return (
        <MainContainer>
            Craving a bowl of instant ramen?
            <SearchBar />
        </MainContainer>
    );
};

export default index;
