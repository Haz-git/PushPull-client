import * as React from 'react';

//Components:
import { MainContainer } from './AddProjectForm';

//Styles:

//Interfaces:

interface IComponentProps {
    projectUuid: string;
}

const RenameProjectForm = ({ projectUuid }: IComponentProps): JSX.Element => {
    return <MainContainer>Rename Project Form.</MainContainer>;
};

export default RenameProjectForm;
