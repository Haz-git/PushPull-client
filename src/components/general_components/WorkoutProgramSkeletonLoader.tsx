import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:

//Styles:
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  to {
    background-position: 100% 0, 0 0;
  }
`;

const load = keyframes`
    from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
`;

const MainContainer = styled.div`
    margin-bottom: 1rem;
    padding: 1rem 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;

const SkeletonSVGContainer = styled.div`
    height: 11rem;
    width: 11rem;
    border: 1px solid #ececec;

    @media ${deviceMin.mobileS} {
        display: none;
    }

    @media ${deviceMin.browsersmp} {
        display: block;
        min-height: 11rem;
        min-width: 11rem;
        border: 1px solid #ececec;
    }
`;

const SkeletonTextContainer = styled.div`
    width: 100%;
    margin-left: 2rem;

    @media ${deviceMin.mobileS} {
        margin-left: 0;
    }

    @media ${deviceMin.browsersmp} {
        margin-left: 2rem;
    }
`;

const SkeletonLoaderLine = styled.div<IStyledProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin: ${(props) => props.margin};
    border-radius: 0.2rem;
    background: #dbdbdb;
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
`;

const SkeletonRatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0.75rem 0;

    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.browserSm} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
`;

//Interfaces:

interface IStyledProps {
    width?: string;
    height?: string;
    margin?: string;
}

const WorkoutProgramSkeletonLoader = (): JSX.Element => {
    return (
        <MainContainer>
            <SkeletonSVGContainer>
                <SkeletonLoaderLine width="11rem" height="11rem" margin="0 0" />
            </SkeletonSVGContainer>
            <SkeletonTextContainer>
                <SkeletonLoaderLine width="15rem" height="2rem" margin="0 0" />
                <SkeletonRatingContainer>
                    <SkeletonLoaderLine
                        width="1.5rem"
                        height="1.5rem"
                        margin="0 .25rem 0 0"
                    />
                    <SkeletonLoaderLine
                        width="1.5rem"
                        height="1.5rem"
                        margin="0 .25rem 0 0"
                    />
                    <SkeletonLoaderLine
                        width="1.5rem"
                        height="1.5rem"
                        margin="0 .25rem 0 0"
                    />
                    <SkeletonLoaderLine
                        width="1.5rem"
                        height="1.5rem"
                        margin="0 .25rem 0 0"
                    />
                    <SkeletonLoaderLine
                        width="1.5rem"
                        height="1.5rem"
                        margin="0 .25rem 0 0"
                    />
                    <SkeletonLoaderLine
                        width="8rem"
                        height="1.5rem"
                        margin="0 .25rem 0 1.5rem"
                    />
                </SkeletonRatingContainer>
                <SkeletonLoaderLine
                    width="100%"
                    height="1rem"
                    margin="0 0 .5rem 0"
                />
                <SkeletonLoaderLine
                    width="100%"
                    height="1rem"
                    margin="0 0 .5rem 0"
                />
                <SkeletonLoaderLine
                    width="100%"
                    height="1rem"
                    margin="0 0 .5rem 0"
                />
                <SkeletonLoaderLine
                    width="100%"
                    height="1rem"
                    margin="0 0 .5rem 0"
                />
            </SkeletonTextContainer>
        </MainContainer>
    );
};

export default WorkoutProgramSkeletonLoader;
