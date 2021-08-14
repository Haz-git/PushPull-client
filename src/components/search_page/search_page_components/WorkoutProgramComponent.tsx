import * as React from 'react';

//Components:
import ReactStars from 'react-rating-stars-component';
import { ReactComponent as TrainerSVG } from '../../../assets/workout_program_trainer.svg';

//Styles:
import styled from 'styled-components';

//Icons:
import { Star as StarEmpty } from '@styled-icons/fluentui-system-regular/Star';
import { StarHalf } from '@styled-icons/fluentui-system-filled/StarHalf';
import { Star as StarFull } from '@styled-icons/fluentui-system-filled/Star';

const StarEmptyIcon = styled(StarEmpty)`
    height: 2rem;
    width: 2rem;
`;

const StarHalfIcon = styled(StarHalf)`
    height: 2rem;
    width: 2rem;
`;

const StarFullIcon = styled(StarFull)`
    height: 2rem;
    width: 2rem;
`;

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
    position: relative;
    margin-left: 2rem;
`;

const ProgramTitle = styled.h2`
    font-size: 1.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

const ProgramRatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0.75rem 0;
`;

const StarsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;
`;
const RatingText = styled.p`
    font-size: 1rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

const ProgramDesc = styled.p`
    font-size: 1.1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 500;
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
                            size="50px"
                            emptyIcon={<StarEmptyIcon />}
                            halfIcon={<StarHalfIcon />}
                            fullIcon={<StarFullIcon />}
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
