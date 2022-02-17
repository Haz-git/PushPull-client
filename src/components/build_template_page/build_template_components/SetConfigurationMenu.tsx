import * as React from 'react';

//Components:

//Styles:

//Interfaces:

interface IComponentProps {
    isOpen: boolean;
    totalSets: string;
}

export const SetConfigurationMenu = ({
    isOpen,
    totalSets,
}: IComponentProps): JSX.Element => {
    return <>{isOpen ? <>Menu</> : null}</>;
};
