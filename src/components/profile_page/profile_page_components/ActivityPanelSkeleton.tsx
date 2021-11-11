import * as React from 'react';

//Components:
import { SkeletonLoaderLine } from '../../general_components/WorkoutProgramSkeletonLoader';

//Styles:
import styled from 'styled-components';

import {
    MainContainer,
    PanelHeaderContainer,
    PanelBlock,
    WorkoutProgramContainer,
    PostedReviewContainer,
} from './ActivityPanel';

//Interfaces:

const ActivityPanelSkeleton = () => {
    return (
        <MainContainer>
            <PanelHeaderContainer>
                <SkeletonLoaderLine height="2.5rem" width="10rem" />
            </PanelHeaderContainer>
            <PanelBlock>
                <SkeletonLoaderLine
                    height="2rem"
                    width="15rem"
                    margin="0rem 0rem 1rem 0rem"
                />
                <WorkoutProgramContainer>
                    <SkeletonLoaderLine
                        height="4rem"
                        width="100%"
                        margin="0rem 0rem .75rem 0rem"
                    />
                    <SkeletonLoaderLine
                        height="4rem"
                        width="100%"
                        margin="0rem 0rem .75rem 0rem"
                    />
                    <SkeletonLoaderLine
                        height="4rem"
                        width="100%"
                        margin="0rem 0rem .75rem 0rem"
                    />
                </WorkoutProgramContainer>
            </PanelBlock>
            <PanelBlock>
                <SkeletonLoaderLine
                    height="2rem"
                    width="15rem"
                    margin="0rem 0rem 1rem 0rem"
                />
                <PostedReviewContainer>
                    <SkeletonLoaderLine
                        height="4rem"
                        width="100%"
                        margin="0rem 0rem .75rem 0rem"
                    />
                    <SkeletonLoaderLine
                        height="4rem"
                        width="100%"
                        margin="0rem 0rem .75rem 0rem"
                    />
                    <SkeletonLoaderLine
                        height="4rem"
                        width="100%"
                        margin="0rem 0rem .75rem 0rem"
                    />
                </PostedReviewContainer>
            </PanelBlock>
        </MainContainer>
    );
};

export default ActivityPanelSkeleton;
