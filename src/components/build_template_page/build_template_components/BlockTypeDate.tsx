import * as React from 'react';

//Components:

//Styles:

//Interfaces:
interface IComponentProps {
    blockTitle: string;
}

const BlockTypeDate = ({ blockTitle }: IComponentProps): JSX.Element => {
    return <div>{blockTitle}</div>;
};

export default BlockTypeDate;
