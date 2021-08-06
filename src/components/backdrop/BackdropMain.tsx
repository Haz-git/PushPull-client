import * as React from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import BackdropText from './backdrop_components/BackdropText';
import { ReactComponent as BackdropSVG } from '../../assets/backdrop_workout_pic.svg';
import SearchBar from '../general_components/SearchBar';

//Styles:
import styled from 'styled-components';

const BackdropMainContainer = styled.section`
    width: 100%;
    background: rgba(241, 135, 1, 1);
    padding: 2rem 0;
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 40% auto;
    align-items: center;
    justify-content: center;

    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.laptopHalf} {
        display: grid;
        grid-template-columns: 40% auto;
        align-items: center;
        justify-content: center;
    }
`;

const SVGContainer = styled.div`
    margin-top: -6rem;
    height: 30rem;
    width: 30rem;

    @media ${deviceMin.mobileS} {
        height: 17rem;
        width: 17rem;
        margin: -1rem auto;
    }

    @media ${deviceMin.browserSm} {
        height: 22rem;
        width: 22rem;
        margin: -1rem auto;
    }

    @media ${deviceMin.laptopHalf} {
        margin-top: -6rem;
        height: 24rem;
        width: 24rem;
    }

    @media ${deviceMin.laptopS} {
        margin-top: -6rem;
        height: 30rem;
        width: 30rem;
    }
`;

const SearchBarContainer = styled.div`
    padding: 0 5rem;
    width: 100%;

    @media ${deviceMin.mobileS} {
        padding: 1rem 1rem;
    }

    @media ${deviceMin.laptopS} {
        padding: 0 5rem;
        width: 100%;
    }
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
