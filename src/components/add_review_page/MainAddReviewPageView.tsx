import * as React from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    @media ${deviceMin.mobileS} {
        height: 100%;
        overflow: hidden;
    }

    @media ${deviceMin.browserSm} {
        height: 100vh;
    }
`;

//Interfaces:

const MainAddReviewPageView = () => {
    return <MainContainer>Add Review Page</MainContainer>;
};

export default MainAddReviewPageView;
