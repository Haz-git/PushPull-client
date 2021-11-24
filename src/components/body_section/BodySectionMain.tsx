import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';
import { v4 as uuid } from 'uuid';

//Components:
import historyObject from '../../utils/historyObject';
import BodySection from './body_section_components/BodySection';
import GeneralButton from '../general_components/GeneralButton';
import { ReactComponent as SquatSVG } from '../../assets/body_section_squat.svg';
import { ReactComponent as RankingSVG } from '../../assets/body_section_ranking.svg';
import { ReactComponent as ReviewSVG } from '../../assets/body_section_review.svg';

//Styles:
import styled from 'styled-components';
const MainBodySectionContainer = styled.div``;

const StyledRankingSVG = styled(RankingSVG)`
    margin-top: 6rem;

    @media ${deviceMin.mobileS} {
        margin-top: 1rem;
    }

    @media ${deviceMin.browserSm} {
        margin-top: -3rem;
    }

    @media ${deviceMin.laptopHalf} {
        margin-top: 3rem;
    }

    @media ${deviceMin.laptopS} {
        margin-top: 6rem;
    }
`;

//Interfaces:

const BodySectionMain = () => {
    return (
        <MainBodySectionContainer>
            <BodySection
                textHeader="Find Your Next Workout"
                textDesc=" No matter where you are in your fitness journey, PushPull can help! Check out our collection of workout programs, ranked and created by viewers like you."
                primaryButton={
                    <GeneralButton
                        buttonLabel="Search Workouts"
                        onClick={() => historyObject.push('/search')}
                        fontSize="1.25rem"
                        padding="1rem 1rem"
                    />
                }
                SVGImage={<SquatSVG />}
            />
            <BodySection
                isReversed={true}
                textHeader="Add a Ranking"
                textDesc="Have a program that you really love, or one you never want to try again? Let our community know by giving it a ranking!"
                primaryButton={
                    <GeneralButton
                        buttonLabel="Add Ranking"
                        onClick={() => historyObject.push('/search')}
                        fontSize="1.25rem"
                        padding="1rem 1rem"
                    />
                }
                SVGImage={<StyledRankingSVG />}
                backgroundColor="#0F0628"
                mainTextColor="rgba(255, 255, 255, 1)"
                subTextColor="rgba(255, 255, 255, .7)"
            />
            <BodySection
                textHeader="Can't Find Your Workout?"
                textDesc="If your custom workout program doesn't exist here, build it, suggest it, and add it to our growing list!"
                primaryButton={
                    <GeneralButton
                        buttonLabel="Build Program"
                        onClick={() =>
                            historyObject.push(`builder/dashboard/recents`)
                        }
                        fontSize="1.25rem"
                        padding="1rem 1rem"
                    />
                }
                SVGImage={<ReviewSVG />}
            />
        </MainBodySectionContainer>
    );
};

export default BodySectionMain;
