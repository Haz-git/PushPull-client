import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Components:
import ReactStars from 'react-rating-stars-component';
import { ReactComponent as TrainerSVG } from '../../../assets/workout_program_trainer.svg';

//Styles:
import styled from 'styled-components';

//Icons:

const MainContainer = styled.div`
    margin-bottom: 1rem;
    padding: 1rem 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 0.3rem;
    transition: all 0.3s ease-in-out;

    &:hover {
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
            rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
        background: #ffffff;
    }
`;

const SVGContainer = styled.div`
    height: 11rem;
    width: 11rem;
    border: 1px solid #ececec;

    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.browsersmp} {
        display: block;
        min-height: 11rem;
        min-width: 11rem;
        border: 1px solid #ececec;
    }
`;

const InfoContainer = styled.div`
    position: relative;
    margin-left: 2rem;

    @media ${deviceMin.mobileS} {
        margin-left: 0;
    }

    @media ${deviceMin.browsersmp} {
        margin-left: 2rem;
    }
`;

const ProgramTitle = styled.h2`
    font-size: 1.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;

    @media ${deviceMin.mobileS} {
        font-size: 1.1rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1.5rem;
    }
`;

const ProgramRatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0.75rem 0;

    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.browserSm} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
`;

const StarsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;

    @media ${deviceMin.mobileS} {
        margin-right: 0;
        margin-bottom: 0.5rem;
    }

    @media ${deviceMin.browserSm} {
        margin-bottom: 0;
        margin-right: 1rem;
    }
`;
const RatingText = styled.p`
    font-size: 1rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;

    @media ${deviceMin.mobileS} {
        font-size: 0.85rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1rem;
    }
`;

const ProgramDesc = styled.p`
    font-size: 1.1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 500;

    @media ${deviceMin.mobileS} {
        font-size: 0.9rem;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1.1rem;
    }
`;

const ProgramTagsContainer = styled.div`
    margin-top: 1rem;
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
    programAverageRating = 4.0,
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
                <ProgramRatingContainer>
                    <StarsContainer>
                        <ReactStars
                            count={5}
                            isHalf={true}
                            edit={false}
                            value={programAverageRating}
                            color="rgba(0, 0, 34, 0.7)"
                            activeColor="rgba(224, 113, 51, 1)"
                            size={20}
                        />
                    </StarsContainer>
                    <RatingText>
                        {programAverageRating}/5 rating from{' '}
                        {programReviewCount} reviews
                    </RatingText>
                </ProgramRatingContainer>
                <ProgramDesc>{programDesc}</ProgramDesc>
                <ProgramTagsContainer>Tags</ProgramTagsContainer>
            </InfoContainer>
        </MainContainer>
    );
};

export default WorkoutProgramComponent;
