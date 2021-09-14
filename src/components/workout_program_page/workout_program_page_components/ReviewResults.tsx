import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { getReviews } from '../../../redux/reviews/reviewActions';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import { Accordion, AccordionItem } from '@mantine/core';
import ReviewComponent from './ReviewComponent';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 2rem 2rem;
`;

const ProgramHeaderContainer = styled.div``;

const ProgramTitle = styled.h1`
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
`;

const ProgramDescAccContainer = styled.div`
    margin: 1rem 0;
`;

const ProgramReviewsContainer = styled.div`
    margin-top: 2rem;
`;

const ReviewCountLabel = styled.h2`
    font-size: 1.5rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

const ReviewContainer = styled.div`
    margin-top: 2rem;
`;

//Interfaces:

interface IComponentProps {
    programTitle: string;
    programDesc: string;
    programReviewCount: number;
    programId: string;
}

const ReviewResults = ({
    programTitle,
    programDesc,
    programReviewCount,
    programId,
}: IComponentProps): JSX.Element => {
    //Dispatch Hook:
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);
    const handleLoadedStatus = (status: boolean) => setIsLoaded(status);

    useEffect(() => {
        dispatch(getReviews(handleLoadedStatus, programId, 1));
    }, []);

    //Selector Hook:
    const { reviews } = useSelector((state: RootStateOrAny) => state.reviews);

    return (
        <MainContainer>
            <ProgramHeaderContainer>
                <ProgramTitle>{programTitle}</ProgramTitle>
                <ProgramDescAccContainer>
                    <Accordion
                        initialItem={-1}
                        transitionDuration={400}
                        styles={{
                            label: {
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                color: 'rgba(0, 0, 34, .7)',
                            },
                            item: {
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: 500,
                                fontSize: '1.1rem',
                                color: 'rgba(0, 0, 34, .7)',
                                marginLeft: '-.85rem',
                                borderTop: '2px solid #e5e5e5',
                                borderBottom: '2px solid #e5e5e5',
                            },
                        }}
                    >
                        <AccordionItem label={`What's ${programTitle} about?`}>
                            {programDesc}
                        </AccordionItem>
                    </Accordion>
                </ProgramDescAccContainer>
            </ProgramHeaderContainer>
            <ProgramReviewsContainer>
                <ReviewCountLabel>{`${programReviewCount} Total Reviews`}</ReviewCountLabel>
                <ReviewContainer>
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                </ReviewContainer>
            </ProgramReviewsContainer>
        </MainContainer>
    );
};

export default ReviewResults;
