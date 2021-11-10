import * as React from 'react';

//Components:
import { SkeletonLoaderLine } from '../../general_components/WorkoutProgramSkeletonLoader';

//Styles:
import styled from 'styled-components';

const SkeletonContainer = styled.section``;

const ProfilePanelSkeleton = () => {
    return (
        <SkeletonContainer>
            <SkeletonLoaderLine width="100%" height="10rem" />
        </SkeletonContainer>
    );
};

export default ProfilePanelSkeleton;
