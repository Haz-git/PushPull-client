import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

//Interfaces:

interface IComponentProps {
    shouldShowCollapseLayout: boolean;
    configuredSets: any;
}

export const BlockTypeExerciseDataCollapse = ({
    shouldShowCollapseLayout,
    configuredSets,
}: IComponentProps): JSX.Element => {
    console.log(configuredSets);
    return <>{shouldShowCollapseLayout ? <>Test</> : null}</>;
};
