import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { findWorkoutProgram } from '../../redux/workoutPrograms/workoutProgramActions';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import RatingColumn from './workout_program_page_components/RatingColumn';
import ReviewResults from './workout_program_page_components/ReviewResults';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    display: grid;
    grid-template-columns: 2fr 6fr;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
        overflow: hidden;
    }

    @media ${deviceMin.tabletp} {
        display: grid;
        grid-template-columns: 1fr 8fr;
    }
`;

//Interfaces:

interface IComponentProps {
    match: {
        params: {
            id: any;
        };
    };
}

const MainWorkoutProgramPage = ({
    match: {
        params: { id },
    },
}: IComponentProps): JSX.Element => {
    //This component should contain all of the views of the workout program page.

    //Dispatch Hook:
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);
    const handleLoadedStatus = (status: boolean) => setIsLoaded(status);

    useEffect(() => {
        dispatch(findWorkoutProgram(id, handleLoadedStatus));
    }, []);

    //Selector Hook:
    const { workoutPrograms } = useSelector(
        (state: RootStateOrAny) => state.workoutPrograms
    );

    console.log(workoutPrograms);

    return (
        <MainContainer>
            {isLoaded === true ? (
                <>
                    <RatingColumn programRating={workoutPrograms.rating} />
                    <ReviewResults
                        programTitle={workoutPrograms.workoutProgramTitle}
                        programDesc={workoutPrograms.workoutProgramDesc}
                        programReviewCount={workoutPrograms.Reviews}
                    />
                </>
            ) : (
                <div>LOADING</div>
            )}
        </MainContainer>
    );
};

export default MainWorkoutProgramPage;
