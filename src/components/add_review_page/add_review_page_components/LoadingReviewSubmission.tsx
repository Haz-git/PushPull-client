import * as React from 'react';

//Components:
import { Overlay } from '@mantine/core';
import { ReactComponent as LoadingSVG } from '../../../assets/loading_animation.svg';
import { ReactComponent as FinishedSVG } from '../../../assets/done_animation.svg';

//Styles:

//Interfaces

interface IComponentProps {
    requestStatus: boolean;
}

const LoadingReviewSubmission = ({
    requestStatus,
}: IComponentProps): JSX.Element => {
    return <>test</>;
};

export default LoadingReviewSubmission;
