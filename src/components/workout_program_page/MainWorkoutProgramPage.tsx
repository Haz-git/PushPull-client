import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { findWorkoutProgram } from '../../redux/workoutPrograms/workoutProgramActions';
import { getReviews } from '../../redux/reviews/reviewActions';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import RatingColumn from './workout_program_page_components/RatingColumn';
import ReviewResults from './workout_program_page_components/ReviewResults';
import ReviewSkeletonLoader from './workout_program_page_components/ReviewSkeletonLoader';
import GeneralDrawer from '../general_components/GeneralDrawer';
import ReportWorkoutProgramForm from './workout_program_page_components/ReportWorkoutProgramForm';

//Utils:
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';
import renderDrawerSize from '../../utils/renderDrawerSize';

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

    const { width } = useWindowDimensions();
    //Dispatch Hook:
    const dispatch = useDispatch();

    //Handles loaders
    const [isWorkoutProgramLoaded, setIsWorkoutProgramLoaded] = useState(false);
    const [areReviewsLoaded, setAreReviewsLoaded] = useState(false);

    const handleReviewsLoadedStatus = (status: boolean) =>
        setAreReviewsLoaded(status);

    const handleWorkoutProgramLoadedStatus = (status: boolean) =>
        setIsWorkoutProgramLoaded(status);

    //Handles report drawer for RatingColumn:
    const [stateReportDrawer, setStateReportDrawer] = useState(false);

    const openReportDrawer = () => setStateReportDrawer(true);

    const closeReportDrawer = () => setStateReportDrawer(false);

    useEffect(() => {
        dispatch(findWorkoutProgram(id, handleWorkoutProgramLoadedStatus));
        dispatch(getReviews(handleReviewsLoadedStatus, id, 1));
    }, []);

    //Selector Hook:
    const { workoutPrograms } = useSelector(
        (state: RootStateOrAny) => state.workoutPrograms
    );

    return (
        <MainContainer>
            {isWorkoutProgramLoaded && areReviewsLoaded === true ? (
                <>
                    <GeneralDrawer
                        openBoolean={stateReportDrawer}
                        closeFunc={closeReportDrawer}
                        size={renderDrawerSize(width)}
                    >
                        <ReportWorkoutProgramForm />
                    </GeneralDrawer>
                    <RatingColumn
                        programRating={workoutPrograms.rating}
                        programTitle={workoutPrograms.workoutProgramTitle}
                        openReportDrawer={openReportDrawer}
                    />
                    <ReviewResults
                        programTitle={workoutPrograms.workoutProgramTitle}
                        programDesc={workoutPrograms.workoutProgramDesc}
                        programId={id}
                    />
                </>
            ) : (
                <>
                    <ReviewSkeletonLoader />
                </>
            )}
        </MainContainer>
    );
};

export default MainWorkoutProgramPage;
