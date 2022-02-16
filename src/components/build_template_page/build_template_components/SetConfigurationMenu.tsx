import * as React from 'react';

//Components:

//Styles:

//Interfaces:

interface IComponentProps {
    isOpen: boolean;
}

export const SetConfigurationMenu = ({
    isOpen,
}: IComponentProps): JSX.Element => {
    return <>{isOpen ? <>Menu</> : null}</>;
};
