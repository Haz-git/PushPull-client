import * as React from 'react';

//Components:
import Rating from 'react-rating';

//Styles:
import styled from 'styled-components';
import { Star } from '@styled-icons/evaicons-solid/Star';

const EmptyStar = styled(Star)<IStyledProps>`
    height: ${(props) => props.starHeight};
    width: ${(props) => props.starWidth};
    color: #c2c2c2;
`;

const FullStar = styled(Star)<IStyledProps>`
    height: ${(props) => props.starHeight};
    width: ${(props) => props.starWidth};
    color: rgba(224, 113, 51, 1);
`;

const MainContainer = styled.div`
    padding: 1.5rem 1.5rem;
    background: #ffffff;
    border-radius: 0.3rem;
    border: 1px solid #ececec;
`;

const ReviewHeader = styled.h2`
    font-size: 1.2rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

const ReviewText = styled.p<IStyledProps>`
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    font-weight: ${(props) => props.fontWeight};
`;

const StarBox = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
`;

const AuthorContainer = styled.div`
    margin-left: 0.5rem;
`;

const DetailsContainer = styled.div`
    padding: 0.5rem 0;
`;

//Interfaces:
interface IStyledProps {
    color?: string;
    fontWeight?: string;
    fontSize?: string;
    starWidth?: string;
    starHeight?: string;
}

const ReviewComponent = () => {
    return (
        <MainContainer>
            <ReviewHeader>This workout is bonkers!</ReviewHeader>
            <StarBox>
                <ReviewText
                    color="rgba(0, 0, 34, 1)"
                    fontWeight="600"
                    fontSize="1.25rem"
                >
                    3.5 -
                </ReviewText>
                <Rating
                    start={0}
                    stop={5}
                    fractions={0.1}
                    readonly={true}
                    initialRating={3.5}
                    emptySymbol={
                        <EmptyStar starHeight="1.5rem" starWidth="1.5rem" />
                    }
                    fullSymbol={
                        <FullStar starHeight="1.5rem" starWidth="1.5rem" />
                    }
                />
                <AuthorContainer>
                    <ReviewText
                        color="rgba(0, 0, 34, .7)"
                        fontWeight="400"
                        fontSize=".9rem"
                    >
                        Anonymous Python on 9/10/2021
                    </ReviewText>
                </AuthorContainer>
            </StarBox>
            <DetailsContainer></DetailsContainer>
        </MainContainer>
    );
};

export default ReviewComponent;
