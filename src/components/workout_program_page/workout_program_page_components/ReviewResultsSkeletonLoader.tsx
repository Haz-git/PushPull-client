import * as React from 'react';

//Components:
import { SkeletonLoaderLine } from '../../general_components/WorkoutProgramSkeletonLoader';

//Styles:
import styled from 'styled-components';

const SkeletonContainer = styled.div``;

const ReviewResultsSkeletonLoader = () => {
    return (
        <SkeletonContainer>
            <SkeletonLoaderLine
                width="100%"
                height="20rem"
                margin="0rem 0rem 2rem 0rem"
            />
            <SkeletonLoaderLine
                width="100%"
                height="20rem"
                margin="0rem 0rem 2rem 0rem"
            />
        </SkeletonContainer>
    );
};

export default ReviewResultsSkeletonLoader;
