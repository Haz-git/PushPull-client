import * as React from 'react';

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
`;

const SVGContainer = styled.div`
    height: 20rem;
    width: 20rem;
    margin: 5rem 0rem;
`;

const TextContainer = styled.div`
    padding: 1rem 1rem;
    background: #ececec;
    border-radius: 0.4rem;
`;

const ProjectNotFound = () => {
    return (
        <MainContainer>
            <SVGContainer>
                <NoProjectSVG />
            </SVGContainer>
            <TextContainer>
                <Text
                    text="Your project could not be found. It was deleted, or your project link is incorrect."
                    fontSize="1.5rem"
                    fontWeight="800"
                />
            </TextContainer>
        </MainContainer>
    );
};

export default ProjectNotFound;
