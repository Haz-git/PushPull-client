import * as React from 'react';
import { useEffect, useState } from 'react';

//Components:

//Styles:

//Interfaces:

interface IComponentProps {
    children: React.ReactNode;
    delay: number;
}

const LoadingIndicatorWithDelay = ({
    children,
    delay,
}: IComponentProps): JSX.Element => {
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowLoadingIndicator(true), delay);

        return () => {
            clearTimeout(timer);
        };
    });

    return showLoadingIndicator ? <>{children}</> : <>null</>;
};

export default LoadingIndicatorWithDelay;
