import * as React from 'react';

//Components:

//Styles:

//Interfaces:
interface IComponentProps {
    createdBy: {
        createdDate: string;
        userfrontUserId: number;
        username: string;
        userImage: string;
    };
    projectColorHex: string;
    projectDesc: string;
    projectMembers: any[];
    projectTemplates: any[];
    projectName: string;
    updatedDate: string;
}

const ProjectComponent = ({
    createdBy,
    projectColorHex,
    projectDesc,
    projectMembers,
    projectTemplates,
    projectName,
    updatedDate,
}: IComponentProps): JSX.Element => {
    return <div>{projectName}</div>;
};

export default ProjectComponent;
