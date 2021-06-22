import * as React from 'react';
import styled from 'styled-components';

//Styles:
const SearchBarStyle = styled.input`
    text-align: center;
    color: white;
    border: 1px solid black;
    border-radius: 0.4em;
    padding: 1em 2em;
    outline: none;

    &:focus {
        text-decoration: none;
        outline: none;
    }
`;

const SearchBar = () => {
    return <SearchBarStyle placeholder="Search Ramen" />;
};

export default SearchBar;
