import * as React from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import RatingColumn from './workout_program_page_components/RatingColumn';
import ReviewResults from './workout_program_page_components/ReviewResults';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 8fr;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
        overflow: hidden;
    }

    @media ${deviceMin.tabletp} {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 8fr;
    }
`;

//Interfaces:

const MainWorkoutProgramPage = () => {
    //This component should contain all of the views of the workout program page.
    return (
        <MainContainer>
            <RatingColumn />
            <ReviewResults />
        </MainContainer>
    );
};

export default MainWorkoutProgramPage;
