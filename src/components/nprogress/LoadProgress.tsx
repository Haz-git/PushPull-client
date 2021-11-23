import * as React from 'react';

//Components:
imoprt { useNProgress } from '@tanem/react-nprogress';

//Styles:

//Interfaces:
interface IComponentProps {
    isAnimating: boolean;
}

const LoadProgress = ({ isAnimating }: IComponentProps): JSX.Element => {
    const { animationDuration, isFinished, Progress } = useNProgress({
        isAnimating
    });

    
    return <>Loading..</>;
};

export default LoadProgress;
