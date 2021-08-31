import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import { Link } from 'react-router-dom';
import scrollToTop from '../../../utils/scrollToTop';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    width: 15rem;
    padding: 1rem 1rem;
    border: 1px solid black;
`;

const ReturnButtonContainer = styled.div`
    border: 1px solid red;
`;

const ReturnButton = styled(Link)``;

//Interfaces:

const RatingColumn = () => {
    useEffect(() => {
        scrollToTop();
    }, []);

    return (
        <MainContainer>
            <ReturnButtonContainer>
                <ReturnButton to="/search">Return</ReturnButton>
            </ReturnButtonContainer>
        </MainContainer>
    );
};

export default RatingColumn;
