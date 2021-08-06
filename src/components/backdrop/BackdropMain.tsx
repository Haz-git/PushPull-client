import * as React from 'react';

//Components:
import BackdropText from './backdrop_components/BackdropText';
import { ReactComponent as BackdropSVG } from '../../assets/backdrop_workout_pic.svg';
import SearchBar from '../general_components/SearchBar';

//Styles:
import styled from 'styled-components';

const BackdropMainContainer = styled.section`
    width: 100%;
    background: rgba(255, 183, 0, 1);
    padding: 2rem 0;
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 40% auto;
    align-items: center;
    justify-content: center;
`;

const SVGContainer = styled.div`
    margin-top: -6rem;
    height: 30rem;
    width: 30rem;
`;

const SearchBarContainer = styled.div`
    padding: 0 5rem;
    width: 100%;
`;

const BackdropMain = () => {
    return (
        <BackdropMainContainer>
            <GridWrapper>
                <BackdropText />
                <SVGContainer>
                    <BackdropSVG />
                </SVGContainer>
            </GridWrapper>
            <SearchBarContainer>
                <SearchBar />
            </SearchBarContainer>
        </BackdropMainContainer>
    );
};

export default BackdropMain;
