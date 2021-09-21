import * as React from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import WizardForm from '../general_components/WizardForm';

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
    return (
        <MainContainer>
            <WizardForm>
                <div>TEST</div>
                <div>MULTIPLE</div>
                <div>CHILDREN</div>
                <div>HERE</div>
            </WizardForm>
        </MainContainer>
    );
};

export default MainAddReviewPageView;