import * as React from 'react';

//Components:

//Styles:

//Interfaces:

interface IComponentProps {
    startIndex: number;
    maxIndex: number;
    children: React.ReactNode;
}

const WizardForm = ({
    startIndex,
    maxIndex,
    children,
}: IComponentProps): JSX.Element => {
    console.log(children);
    return <div>{children}</div>;
};

export default WizardForm;
