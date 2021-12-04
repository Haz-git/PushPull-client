import * as React from 'react';

//utils:
import { deviceMin } from '../../../devices/breakpoints';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Components:
import { ReactComponent as NoProjectSVG } from '../../../assets/no_project_found.svg';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding: 1rem 1rem;
`;

const SVGContainer = styled.div`
    margin: 5rem 0rem;

    @media ${deviceMin.mobileS} {
        height: 10rem;
        width: 10rem;
    }

    @media ${deviceMin.mobileM} {
        height: 13rem;
        width: 13rem;
    }

    @media ${deviceMin.mobileL} {
        height: 15rem;
        width: 15rem;
    }

    @media ${deviceMin.tabletp} {
        height: 18rem;
        width: 18rem;
    }
`;

const TextContainer = styled.div`
    padding: 1rem 1rem;
    background: #ececec;
    border-radius: 0.4rem;
`;

const ProjectNotFound = () => {
    const { width } = useWindowDimensions();

    const renderNotFoundText = () => {
        if (width <= 320) return '1rem';
        if (width <= 375) return '1.1rem';
        if (width <= 415) return '1.2rem';
        if (width >= 768) return '1.3rem';
    };

    return (
        <MainContainer>
            <SVGContainer>
                <NoProjectSVG />
            </SVGContainer>
            <TextContainer>
                <Text
                    text="Your project could not be found. It was deleted, or your project link is incorrect."
                    fontSize={`${renderNotFoundText()}`}
                    fontWeight="800"
                />
            </TextContainer>
        </MainContainer>
    );
};

export default ProjectNotFound;
