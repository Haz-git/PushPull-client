import * as React from 'react';

//Components:

//Styles:

//Interfaces:

interface IComponentProps {
    projectUuid: string;
    toggleDeleteProjectModal: (status: boolean, projectUuid?: string) => void;
}

const DeleteProjectForm = ({ projectUuid }: IComponentProps): JSX.Element => {
    return <div>Confirm Delete Project.</div>;
};

export default DeleteProjectForm;
