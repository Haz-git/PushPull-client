import * as React from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:

//Styles:
import styled from 'styled-components';

export const MainContainer = styled.section`
    padding: 3rem 1rem 0rem 2rem;
    display: flex;
    flex-direction: column;
`;

export const PanelHeaderContainer = styled.div`
    margin-bottom: 2rem;
`;

const PanelHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme.mainText};
    width: 100%;
`;

export const PanelBlock = styled.div`
    margin-bottom: 2rem;
`;

const SubPanelHeader = styled.h3`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${(props) => props.theme.subText};
    width: 100%;
    margin-bottom: 0.5rem;
`;

export const WorkoutProgramContainer = styled.div`
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
    padding: 2rem 2rem;
`;

export const PostedReviewContainer = styled.div`
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
    padding: 2rem 2rem;
`;

const DefaultText = styled.p`
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.subText};
    width: 100%;
`;

//Interfaces:

const ActivityPanel = () => {
    const queriedUser = useSelector((state: RootStateOrAny) => state?.profile);

    const renderWorkoutPrograms = () => {
        const { workoutPrograms } = queriedUser?.data || {};

        if (!workoutPrograms)
            return (
                <DefaultText>{`${queriedUser.username} has no activity here yet.`}</DefaultText>
            );

        return <DefaultText>Activity here</DefaultText>;
    };

    const renderPostedReviews = () => {
        const { postedReviews } = queriedUser?.data || {};

        if (!postedReviews)
            return (
                <DefaultText>{`${queriedUser.username} has no activity here yet.`}</DefaultText>
            );

        return <DefaultText>Activity here</DefaultText>;
    };

    return (
        <MainContainer>
            <PanelHeaderContainer>
                <PanelHeader>Activity Hub</PanelHeader>
            </PanelHeaderContainer>
            <PanelBlock>
                <SubPanelHeader>Custom Workout Programs</SubPanelHeader>
                <WorkoutProgramContainer>
                    {renderWorkoutPrograms()}
                </WorkoutProgramContainer>
            </PanelBlock>
            <PanelBlock>
                <SubPanelHeader>Posted Reviews</SubPanelHeader>
                <PostedReviewContainer>
                    {renderPostedReviews()}
                </PostedReviewContainer>
            </PanelBlock>
        </MainContainer>
    );
};

export default ActivityPanel;
