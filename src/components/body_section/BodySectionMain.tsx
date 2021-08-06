import * as React from 'react';

//Components:
import BodySection from './body_section_components/BodySection';

//Styles:
import styled from 'styled-components';
const MainBodySectionContainer = styled.div``;

//Interfaces:

const BodySectionMain = () => {
    return (
        <MainBodySectionContainer>
            <BodySection
                textHeader="Find Your Next Workout"
                textDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu, aliquam diam purus."
            />
        </MainBodySectionContainer>
    );
};

export default BodySectionMain;
