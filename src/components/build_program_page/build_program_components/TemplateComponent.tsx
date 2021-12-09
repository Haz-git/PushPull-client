import * as React from 'react';

//Components:

//Styles:

//Interfaces:
interface IComponentProps {
    templateFileTitle: string;
    createdAt: string;
    id: string;
    updatedAt: string;
}

const TemplateComponent = ({
    templateFileTitle,
    createdAt,
    id,
    updatedAt,
}: IComponentProps): JSX.Element => {
    return <div>test</div>;
};

export default TemplateComponent;
