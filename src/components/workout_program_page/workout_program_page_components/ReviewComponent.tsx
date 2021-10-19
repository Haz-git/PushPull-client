import * as React from 'react';

//Components:
import { deviceMin } from '../../../devices/breakpoints';
import Rating from 'react-rating';
import { Accordion, AccordionItem } from '@mantine/core';
import { v4 } from 'uuid';
import GeneralButton from '../../general_components/GeneralButton';

import { decode } from 'html-entities';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

//Utils:
import capitalize from '../../../utils/capitalize';

//Styles:
import styled from 'styled-components';

//Icons:
import { Star } from '@styled-icons/evaicons-solid/Star';
import { ThumbLike } from '@styled-icons/fluentui-system-regular/ThumbLike';
import { ThumbDislike } from '@styled-icons/fluentui-system-regular/ThumbDislike';
import { FlagPride } from '@styled-icons/fluentui-system-filled/FlagPride';

const LikeIconEmpty = styled(ThumbLike)`
    height: 1.3rem;
    width: 1.3rem;
    color: #7678ed;
`;

const DislikeIconEmpty = styled(ThumbDislike)`
    height: 1.3rem;
    width: 1.3rem;
    color: #7678ed;
`;

const FlagIcon = styled(FlagPride)`
    height: 1.3rem;
    width: 1.3rem;
    color: red;
`;

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

const HeaderContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: block;
        position: relative;
    }

    @media ${deviceMin.browserSm} {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const HeaderFlagContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.browserSm} {
        display: block;
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
    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.browsersmp} {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
    }
`;

const RatingsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;

    @media ${deviceMin.mobileS} {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    @media ${deviceMin.browsersmp} {
        margin: 0;
    }
`;

const AuthorContainer = styled.div`
    @media ${deviceMin.mobileS} {
        margin: 0;
        margin-bottom: 0.5rem;
    }

    @media ${deviceMin.browsersmp} {
        margin-left: 0.5rem;
        margin-bottom: 0;
    }
`;

const DetailsContainer = styled.div`
    padding: 0rem 0;
`;

const ReviewRTEContainer = styled.div`
    color: ${(props) => props.theme.mainText};
`;

const ImprovementsContainer = styled.div`
    margin-top: 1rem;
`;

const MobileFlagContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.browserSm} {
        display: none;
    }
`;

const ButtonsContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 1rem 0;
    }

    @media ${deviceMin.browserSm} {
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
    }
`;

//Interfaces:
interface IStyledProps {
    color?: string;
    fontWeight?: string;
    fontSize?: string;
    starWidth?: string;
    starHeight?: string;
}

interface IComponentProps {
    reviewId: string;
    reviewerLevel: string;
    reviewTitle: string;
    reviewDesc: string;
    recommendedLevel: string;
    effectivenessRating: number;
    repeatableRating: number;
    accurateDifficulty: number;
    followLength: number;
    improvedStats: any;
    createdAt: string;
    openReviewReportDrawer: () => void;
}

const ReviewComponent = ({
    reviewId,
    reviewerLevel,
    reviewTitle,
    reviewDesc,
    recommendedLevel,
    effectivenessRating,
    repeatableRating,
    accurateDifficulty,
    followLength,
    improvedStats,
    createdAt,
    openReviewReportDrawer,
}: IComponentProps): JSX.Element => {
    //Destructures improved stats and renders out text for each stat:
    const renderImprovedStats = () => {
        if (Object.keys(improvedStats).length > 0) {
            let tempArr: any[] = [];

            for (const statObject of Object.values(improvedStats)) {
                tempArr.push(statObject);
            }

            return tempArr.map((statObject) => (
                <ReviewText
                    color="rgba(0, 0, 34, .7)"
                    fontWeight="400"
                    fontSize="1rem"
                    key={statObject.exerciseId}
                >
                    {`${capitalize(statObject.exerciseTitle)} : ${
                        statObject.initialWeight
                    } to ${statObject.finalWeight}`}
                </ReviewText>
            ));
        } else {
            return <ReviewText>Apparently, nothing was improved.</ReviewText>;
        }
    };

    //Computes the total rating from averages from three ratings.
    const computeTotalRating = () => {
        if (effectivenessRating && repeatableRating && accurateDifficulty) {
            let totalSum =
                effectivenessRating + repeatableRating + accurateDifficulty;
            let totalAvg = totalSum / 3;

            return Math.round(totalAvg);
        }
    };

    return (
        <MainContainer>
            <HeaderContainer>
                <ReviewHeader>{reviewTitle}</ReviewHeader>
                <HeaderFlagContainer>
                    <GeneralButton
                        buttonLabel="Flag"
                        fontWeight="700"
                        width="5rem"
                        buttonBackground="transparent"
                        buttonTextColor="red"
                        textShadow="none"
                        border="1px solid red"
                        hoverTransform="none"
                        hoverShadow="none"
                        disableShadow={true}
                        buttonIcon={<FlagIcon />}
                        padding=".5rem .7rem"
                        onClick={() => openReviewReportDrawer()}
                    />
                </HeaderFlagContainer>
            </HeaderContainer>
            <StarBox>
                <RatingsContainer>
                    <ReviewText
                        color="rgba(0, 0, 34, 1)"
                        fontWeight="600"
                        fontSize="1.25rem"
                    >
                        {`${computeTotalRating()} - `}
                    </ReviewText>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={0.1}
                        readonly={true}
                        initialRating={computeTotalRating()}
                        emptySymbol={
                            <EmptyStar starHeight="1.5rem" starWidth="1.5rem" />
                        }
                        fullSymbol={
                            <FullStar starHeight="1.5rem" starWidth="1.5rem" />
                        }
                    />
                </RatingsContainer>
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
                    {`Reviewer Level: ${capitalize(reviewerLevel)}`}
                </ReviewText>
                <ReviewText
                    color="rgba(0, 0, 34, .7)"
                    fontWeight="600"
                    fontSize="1rem"
                >
                    {`Followed program for: ${followLength} days`}
                </ReviewText>
                <ReviewText
                    color="rgba(0, 0, 34, .7)"
                    fontWeight="600"
                    fontSize="1rem"
                >
                    {`Recommends program for: ${capitalize(recommendedLevel)}`}
                </ReviewText>
            </DetailsContainer>
            <ImprovementsContainer>
                <Accordion
                    multiple={true}
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
                        {renderImprovedStats()}
                    </AccordionItem>
                    <AccordionItem label={`Author Review`}>
                        <ReviewRTEContainer>
                            <ReactQuill
                                theme="bubble"
                                value={decode(reviewDesc)}
                                readOnly={true}
                            />
                        </ReviewRTEContainer>
                    </AccordionItem>
                </Accordion>
            </ImprovementsContainer>
            <ButtonsContainer>
                <GeneralButton
                    buttonLabel="Useful (0)"
                    fontWeight="700"
                    width="10rem"
                    buttonBackground="transparent"
                    buttonTextColor="#7678ED"
                    textShadow="none"
                    border="1px solid #7678ED"
                    hoverTransform="none"
                    hoverShadow="none"
                    disableShadow={true}
                    buttonIcon={<LikeIconEmpty />}
                    padding=".5rem .7rem"
                />
                <GeneralButton
                    buttonLabel="Not Useful (0)"
                    fontWeight="700"
                    width="10rem"
                    buttonBackground="transparent"
                    buttonTextColor="#7678ED"
                    textShadow="none"
                    border="1px solid #7678ED"
                    hoverTransform="none"
                    hoverShadow="none"
                    disableShadow={true}
                    buttonIcon={<DislikeIconEmpty />}
                    padding=".5rem .7rem"
                />
                <MobileFlagContainer>
                    <GeneralButton
                        buttonLabel="Flag"
                        fontWeight="700"
                        width="5rem"
                        buttonBackground="transparent"
                        buttonTextColor="red"
                        textShadow="none"
                        border="1px solid red"
                        hoverTransform="none"
                        hoverShadow="none"
                        disableShadow={true}
                        buttonIcon={<FlagIcon />}
                        padding=".5rem .7rem"
                        onClick={() => openReviewReportDrawer()}
                    />
                </MobileFlagContainer>
            </ButtonsContainer>
        </MainContainer>
    );
};

export default ReviewComponent;
