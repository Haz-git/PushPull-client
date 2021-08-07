import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
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
        margin-top: 6rem;
    }

    @media ${deviceMin.laptopS} {
    }
`;

//Interfaces:

const BodySectionMain = () => {
    return (
        <MainBodySectionContainer>
            <BodySection
                textHeader="Find Your Next Workout"
                textDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur metus sit amet dui finibus sodales."
                primaryButton={
                    <GeneralButton
                        buttonLabel="Top Ranked"
                        onClick={() => console.log('test')}
                        fontSize="1.25rem"
                        padding="1rem 1rem"
                    />
                }
                SVGImage={<SquatSVG />}
            />
            <BodySection
                isReversed={true}
                textHeader="Add a Ranking"
                textDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur metus sit amet dui finibus sodales."
                primaryButton={
                    <GeneralButton
                        buttonLabel="Add Ranking"
                        onClick={() => console.log('test')}
                        fontSize="1.25rem"
                        padding="1rem 1rem"
                    />
                }
                SVGImage={<StyledRankingSVG />}
                backgroundColor="#0F0628"
                mainTextColor="rgba(255, 255, 255, 1)"
                subTextColor="rgba(255, 255, 255, .7)"
            />
        </MainBodySectionContainer>
    );
};

export default BodySectionMain;
