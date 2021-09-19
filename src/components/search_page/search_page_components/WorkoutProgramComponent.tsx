import * as React from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//utils:
import truncateString from '../../../utils/truncateString';

//Components:
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { ReactComponent as TrainerSVG } from '../../../assets/workout_program_trainer.svg';

//Styles:
import styled from 'styled-components';

//Icons:
import { Star } from '@styled-icons/evaicons-solid/Star';

const EmptyStar = styled(Star)`
    height: 1.6rem;
    width: 1.6rem;
    color: #c2c2c2;
`;

const FullStar = styled(Star)`
    height: 1.6rem;
    width: 1.6rem;
    color: rgba(224, 113, 51, 1);
`;

const MainContainer = styled(Link)`
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
    width: 100%;
    margin-left: 2rem;

    @media ${deviceMin.mobileS} {
        margin-left: 0;
    }

    @media ${deviceMin.browsersmp} {
        margin-left: 2rem;
    }
`;

const ProgramTitle = styled.h2`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
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

//Interfaces:

interface IComponentProps {
    programImage?: HTMLImageElement | SVGImageElement;
    programTitle?: string;
    programDesc?: string;
    programReviewCount?: number;
    programAverageRating?: number;
    programTags?: string[];
    programLink: string;
}

const WorkoutProgramComponent = ({
    programImage,
    programTitle = 'Workout Program',
    programDesc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    programReviewCount = 0,
    programAverageRating = 4.0,
    programTags = ['Beginner', 'Gym', 'Powerlifting'],
    programLink,
}: IComponentProps): JSX.Element => {
    const renderImage = () => {
        if (!programImage) {
            return <TrainerSVG />;
        }

        return programImage;
    };

    const renderRatingAndReviewCount = () => {
        if (programReviewCount > 0) {
            return (
                <>
                    <StarsContainer>
                        <Rating
                            start={0}
                            stop={5}
                            fractions={0.1}
                            readonly={true}
                            initialRating={programAverageRating}
                            emptySymbol={<EmptyStar />}
                            fullSymbol={<FullStar />}
                        />
                    </StarsContainer>
                    <RatingText>
                        {programAverageRating}/5 rating from{' '}
                        {programReviewCount} reviews
                    </RatingText>
                </>
            );
        } else {
            return (
                <RatingText style={{ fontStyle: 'italic' }}>
                    No Reviews Yet
                </RatingText>
            );
        }
    };

    return (
        <MainContainer to={programLink}>
            <SVGContainer>{renderImage()}</SVGContainer>
            <InfoContainer>
                <ProgramTitle>{programTitle}</ProgramTitle>
                <ProgramRatingContainer>
                    {renderRatingAndReviewCount()}
                </ProgramRatingContainer>
                <ProgramDesc>
                    {truncateString('WORKOUT_PROGRAM_DESC', programDesc)}
                </ProgramDesc>
            </InfoContainer>
        </MainContainer>
    );
};

export default WorkoutProgramComponent;
