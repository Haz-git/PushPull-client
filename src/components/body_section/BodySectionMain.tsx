import * as React from 'react';

//Components:
import BodySection from './body_section_components/BodySection';
import GeneralButton from '../general_components/GeneralButton';
import { ReactComponent as SquatSVG } from '../../assets/body_section_squat.svg';

//Styles:
import styled from 'styled-components';
const MainBodySectionContainer = styled.div``;

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
                    />
                }
                SVGImage={<SquatSVG />}
            />
        </MainBodySectionContainer>
    );
};

export default BodySectionMain;
