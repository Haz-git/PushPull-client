import * as React from 'react';

//Components:
import { SkeletonLoaderLine } from '../../general_components/WorkoutProgramSkeletonLoader';

//Styles:
import styled from 'styled-components';

const TemplateContainer = styled.div`
    height: 15rem;
    width: 100%;
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
`;

const TextSpace = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 1rem;
`;

//Interfaces:

const TemplateComponentSkeleton = () => {
    return (
        <TemplateContainer>
            <SkeletonLoaderLine height="10rem" width="100%" />
            <TextSpace>
                <SkeletonLoaderLine height="2.5rem" width="2.5rem" />
                <div>
                    <SkeletonLoaderLine
                        height="1rem"
                        width="12rem"
                        margin="0rem 0rem .5rem 1rem"
                    />
                    <SkeletonLoaderLine
                        height="1rem"
                        width="7rem"
                        margin="0rem 0rem 0rem 1rem"
                    />
                </div>
            </TextSpace>
        </TemplateContainer>
    );
};

export default TemplateComponentSkeleton;
