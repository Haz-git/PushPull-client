import * as React from 'react';

//Components:
import Rating from 'react-rating';

//Styles:
import styled from 'styled-components';

//Icons:
import { Star } from '@styled-icons/evaicons-solid/Star';

const EmptyStar = styled(Star)`
    height: 3.5rem;
    width: 3.5rem;
    color: #c2c2c2;
`;

const FullStar = styled(Star)`
    height: 3.5rem;
    width: 3.5rem;
    color: rgba(224, 113, 51, 1);
`;

export const MainContainer = styled.section`
    padding: 3.5rem 2rem;
`;

export const FormTitleContainer = styled.div``;

export const FormTitle = styled.h1`
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

export const FormContainer = styled.div`
    margin-top: 2rem;
`;

export const FormInputContainer = styled.div`
    margin: 4rem 0;
`;

export const FormSubtitle = styled.h2`
    font-size: 1.6rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

export const FormDescContainer = styled.div`
    margin: 0.5rem 0;
`;

export const FormDesc = styled.h3`
    font-size: 1.2rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
`;

export const StarContainer = styled.div`
    margin: 1rem 0;
`;

/* 
    Since this StarRatingsForm will be the first form of the series for adding a review, this form will be the standardization for all forms under adding a review. In essence, we'll be exporting styles from this form frequently.

*/

const StarRatingsForm = () => {
    return (
        <MainContainer>
            <FormTitleContainer>
                <FormTitle>Star Ratings</FormTitle>
            </FormTitleContainer>
            <FormContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        How would you rate this program's reliability?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>
                            In other words, how repeatable is this program? Are
                            you able to perform this program back-to-back
                            without any repercussions?
                        </FormDesc>
                    </FormDescContainer>
                    <StarContainer>
                        <Rating
                            start={0}
                            stop={5}
                            fractions={2}
                            readonly={false}
                            initialRating={0}
                            emptySymbol={<EmptyStar />}
                            fullSymbol={<FullStar />}
                        />
                    </StarContainer>
                </FormInputContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        How would you rate this program's difficulty level?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>
                            Is this program accurate in terms of its difficulty
                            recommendation? Were you able to follow the
                            exercises and weight progression?
                        </FormDesc>
                    </FormDescContainer>
                    <StarContainer>
                        <Rating
                            start={0}
                            stop={5}
                            fractions={2}
                            readonly={false}
                            initialRating={0}
                            emptySymbol={<EmptyStar />}
                            fullSymbol={<FullStar />}
                        />
                    </StarContainer>
                </FormInputContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        How would you rate this program's effectiveness?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>
                            Did this program offer improvement in the proclaimed
                            areas? How well did you achieve your strength or
                            weight goals under this program?
                        </FormDesc>
                    </FormDescContainer>
                    <StarContainer>
                        <Rating
                            start={0}
                            stop={5}
                            fractions={2}
                            readonly={false}
                            initialRating={0}
                            emptySymbol={<EmptyStar />}
                            fullSymbol={<FullStar />}
                        />
                    </StarContainer>
                </FormInputContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default StarRatingsForm;
