import * as React from 'react';

//Components:

//Styles:

//Interfaces:

interface IComponentProps {
    currProject: any;
}

const ProjectInfo = ({ currProject }: IComponentProps): JSX.Element => {
    console.log(currProject);

    return <div>Test</div>;
};

export default ProjectInfo;
