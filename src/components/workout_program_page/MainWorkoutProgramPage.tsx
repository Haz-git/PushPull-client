import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { findWorkoutProgram } from '../../redux/workoutPrograms/workoutProgramActions';
import { getReviews } from '../../redux/reviews/reviewActions';

//Components:
import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { deviceMin } from '../../devices/breakpoints';
import RatingColumn from './workout_program_page_components/RatingColumn';
import ReviewResults from './workout_program_page_components/ReviewResults';
import ReviewSkeletonLoader from './workout_program_page_components/ReviewSkeletonLoader';
import GeneralDrawer from '../general_components/GeneralDrawer';
import ReportWorkoutProgramForm from './workout_program_page_components/ReportWorkoutProgramForm';
import ReportReviewForm from './workout_program_page_components/ReportReviewForm';

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
    toggleAuthDrawerWithView: (state: boolean, view: string) => void;
}

const MainWorkoutProgramPage = ({
    match: {
        params: { id },
    },

    toggleAuthDrawerWithView,
}: IComponentProps): JSX.Element => {
    //This component should contain all of the views of the workout program page.
    const { width } = useWindowDimensions();
    //Dispatch Hook:
    const dispatch = useDispatch();

    //Handles loaders for loading in reviews and workoutprogram stats:
    const [isWorkoutProgramLoaded, setIsWorkoutProgramLoaded] = useState(false);
    const [areReviewsLoaded, setAreReviewsLoaded] = useState(false);
    const [areReviewsSorted, setAreReviewsSorted] = useState(false);

    const handleReviewsSortedStatus = (status: boolean) =>
        setAreReviewsSorted(status);
    const handleReviewsLoadedStatus = (status: boolean) =>
        setAreReviewsLoaded(status);
    const handleWorkoutProgramLoadedStatus = (status: boolean) =>
        setIsWorkoutProgramLoaded(status);

    //Retrieves reviews based on sort:
    const [reviewSort, setReviewSort] = useState('updatedAt');
    const handleReviewSort = (sort: string) => {
        setReviewSort(sort);
    };

    //Handles report drawer for workoutprogram:
    const [stateReportDrawer, setStateReportDrawer] = useState(false);
    const openReportDrawer = () => setStateReportDrawer(true);
    const closeReportDrawer = () => setStateReportDrawer(false);

    //Handles report drawer for reviews:
    const [stateReviewReportDrawer, setStateReviewReportDrawer] =
        useState(false);
    const openReviewReportDrawer = () => setStateReviewReportDrawer(true);
    const closeReviewReportDrawer = () => setStateReviewReportDrawer(false);

    useEffect(() => {
        dispatch(findWorkoutProgram(id, handleWorkoutProgramLoadedStatus));
        dispatch(getReviews(handleReviewsLoadedStatus, id, 1, reviewSort));
    }, []);

    useEffect(() => {
        dispatch(getReviews(handleReviewsSortedStatus, id, 1, reviewSort));
    }, [reviewSort]);

    //Selector Hook:
    const { workoutPrograms } = useSelector(
        (state: RootStateOrAny) => state.workoutPrograms
    );

    return (
        <>
            <BrowserView>
                <GeneralDrawer
                    title={`Flag This Program`}
                    openBoolean={stateReportDrawer}
                    closeFunc={closeReportDrawer}
                    size={renderDrawerSize(width)}
                    position="left"
                >
                    <ReportWorkoutProgramForm />
                </GeneralDrawer>
                <GeneralDrawer
                    title={`Flag this Review`}
                    openBoolean={stateReviewReportDrawer}
                    closeFunc={closeReviewReportDrawer}
                    size={renderDrawerSize(width)}
                    position="left"
                >
                    <ReportReviewForm />
                </GeneralDrawer>
            </BrowserView>
            <MobileOnlyView>
                <GeneralDrawer
                    title={`Flag This Program`}
                    openBoolean={stateReportDrawer}
                    closeFunc={closeReportDrawer}
                    size="100%"
                    position="bottom"
                >
                    <ReportWorkoutProgramForm />
                </GeneralDrawer>
                <GeneralDrawer
                    title={`Flag this Review`}
                    openBoolean={stateReviewReportDrawer}
                    closeFunc={closeReviewReportDrawer}
                    size="100%"
                    position="bottom"
                >
                    <ReportReviewForm />
                </GeneralDrawer>
            </MobileOnlyView>
            <MainContainer>
                {isWorkoutProgramLoaded && areReviewsLoaded === true ? (
                    <>
                        <RatingColumn
                            programRating={workoutPrograms.rating}
                            programTitle={workoutPrograms.workoutProgramTitle}
                            openReportDrawer={openReportDrawer}
                            programId={id}
                            accurateScore={
                                workoutPrograms.avgAccurateDifficultyRating
                            }
                            effectiveScore={
                                workoutPrograms.avgEffectivenessRating
                            }
                            reliableScore={workoutPrograms.avgRepeatableRating}
                            reviewerAdvCount={workoutPrograms.reviewerAdvCount}
                            reviewerBegCount={workoutPrograms.reviewerBegCount}
                            reviewerIntCount={workoutPrograms.reviewerIntCount}
                            recAdvCount={workoutPrograms.recAdvCount}
                            recBegCount={workoutPrograms.recBegCount}
                            recIntCount={workoutPrograms.recIntCount}
                            avgFollowLength={workoutPrograms.avgFollowLength}
                            toggleAuthDrawerWithView={toggleAuthDrawerWithView}
                        />
                        <ReviewResults
                            programTitle={workoutPrograms.workoutProgramTitle}
                            programDesc={workoutPrograms.workoutProgramDesc}
                            programId={id}
                            openReviewReportDrawer={openReviewReportDrawer}
                            handleReviewSort={handleReviewSort}
                            currReviewSort={reviewSort}
                            handleReviewsSortedStatus={
                                handleReviewsSortedStatus
                            }
                            areReviewsSorted={areReviewsSorted}
                        />
                    </>
                ) : (
                    <>
                        <ReviewSkeletonLoader />
                    </>
                )}
            </MainContainer>
        </>
    );
};

export default MainWorkoutProgramPage;
