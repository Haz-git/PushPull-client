import * as React from 'react';

//Components:
import Rating from 'react-rating';
import { Accordion, AccordionItem } from '@mantine/core';

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
    border-radius: 0.3rem;
    border: 1px solid #e5e5e5;
    margin-bottom: 2rem;
    transition: all 0.3s ease-in-out;
    background: #f2f2f2;

    &:hover {
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
            rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
        background: #ffffff;
    }
`;

const ReviewHeader = styled.h2`
    font-size: 1.3rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
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
    padding: 0rem 0;
`;

const ImprovementsContainer = styled.div`
    margin-top: 1rem;
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
            <DetailsContainer>
                <ReviewText
                    color="rgba(0, 0, 34, .7)"
                    fontWeight="600"
                    fontSize="1rem"
                >
                    Reviewer level: Beginner
                </ReviewText>
                <ReviewText
                    color="rgba(0, 0, 34, .7)"
                    fontWeight="600"
                    fontSize="1rem"
                >
                    Followed program for: 5 weeks
                </ReviewText>
                <ReviewText
                    color="rgba(0, 0, 34, .7)"
                    fontWeight="600"
                    fontSize="1rem"
                >
                    Recommends program for: Beginners
                </ReviewText>
            </DetailsContainer>
            <ImprovementsContainer>
                <Accordion
                    initialItem={-1}
                    transitionDuration={400}
                    styles={{
                        label: {
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: 800,
                            fontSize: '1rem',
                            color: 'rgba(0, 0, 34, .7)',
                        },
                        item: {
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: 500,
                            fontSize: '1rem',
                            color: 'rgba(0, 0, 34, .7)',
                        },
                    }}
                >
                    <AccordionItem label={`Improved Stats`}>
                        <ReviewText
                            color="rgba(0, 0, 34, .7)"
                            fontWeight="400"
                            fontSize="1rem"
                        >
                            Bench: 100kg to 200kg
                        </ReviewText>
                    </AccordionItem>
                    <AccordionItem label={`Author Review`}>
                        <ReviewText
                            color="rgba(0, 0, 34, .7)"
                            fontWeight="400"
                            fontSize="1rem"
                        >
                            Sed pulvinar proin gravida hendrerit. Fringilla ut
                            morbi tincidunt augue interdum velit euismod in. Sed
                            cras ornare arcu dui vivamus arcu felis. Faucibus
                            interdum posuere lorem ipsum dolor sit amet
                            consectetur. Suscipit tellus mauris a diam maecenas.
                            Adipiscing bibendum est ultricies integer quis
                            auctor elit sed vulputate. Tristique nulla aliquet
                            enim tortor at auctor urna. Eu sem integer vitae
                            justo eget magna fermentum. Pellentesque elit eget
                            gravida cum sociis natoque penatibus et. Vel
                            pharetra vel turpis nunc eget lorem dolor sed
                            viverra. Ut placerat orci nulla pellentesque
                            dignissim enim sit amet venenatis. Lobortis
                            elementum nibh tellus molestie nunc. Ultricies
                            tristique nulla aliquet enim. Turpis massa sed
                            elementum tempus egestas sed sed risus pretium.
                            Egestas congue quisque egestas diam. Non quam lacus
                            suspendisse faucibus interdum posuere lorem ipsum.
                        </ReviewText>
                    </AccordionItem>
                </Accordion>
            </ImprovementsContainer>
        </MainContainer>
    );
};

export default ReviewComponent;
