import * as React from 'react';

//Components:
import { ReactComponent as TrainerSVG } from '../../../assets/workout_program_trainer.svg';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;

const SVGContainer = styled.div`
    height: 11rem;
    width: 11rem;
    border: 1px solid #ececec;
`;

const InfoContainer = styled.div`
    margin-left: 2rem;
`;

const ProgramTitle = styled.h2`
    font-size: 1.4rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

const ProgramRatingContainer = styled.div`
    margin: 0.5rem 0;
`;

const ProgramDesc = styled.p`
    font-size: 1.1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 500;
`;

const ProgramTagsContainer = styled.div`
    margin: 0.5rem 0;
`;

//Interfaces:

interface IComponentProps {
    programImage?: HTMLImageElement | SVGImageElement;
    programTitle?: string;
    programDesc?: string;
    programReviewCount?: number;
    programAverageRating?: number;
    programTags?: string[];
}

const WorkoutProgramComponent = ({
    programImage,
    programTitle = 'Workout Program',
    programDesc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    programReviewCount = 20,
    programAverageRating = 4.5,
    programTags = ['Beginner', 'Gym', 'Powerlifting'],
}: IComponentProps): JSX.Element => {
    const renderImage = () => {
        if (!programImage) {
            return <TrainerSVG />;
        }

        return programImage;
    };

    return (
        <MainContainer>
            <SVGContainer>{renderImage()}</SVGContainer>
            <InfoContainer>
                <ProgramTitle>{programTitle}</ProgramTitle>
                <ProgramRatingContainer>rating</ProgramRatingContainer>
                <ProgramDesc>{programDesc}</ProgramDesc>
                <ProgramTagsContainer>Tags</ProgramTagsContainer>
            </InfoContainer>
        </MainContainer>
    );
};

export default WorkoutProgramComponent;
