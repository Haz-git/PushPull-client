import React from 'react';

//Components:

//Redux:

//Styles:

//Interfaces:

interface IComponentProps {
    children: React.ReactNode;
}

export const GenericNotificationProvider = ({
    children,
}: IComponentProps): JSX.Element => {
    return <div>{children}</div>;
};
