import * as React from 'react';

//Components:
import { useNProgress } from '@tanem/react-nprogress';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    position: relative;
`;

const ProgressContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`;

//Interfaces:
interface IComponentProps {
    isAnimating: boolean;
}

const LoadProgress = ({ isAnimating }: IComponentProps): JSX.Element => {
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating,
    });
    console.log('test');

    return (
        <MainContainer>
            <ProgressContainer>LOADING!!!</ProgressContainer>
        </MainContainer>
    );
};

export default LoadProgress;
