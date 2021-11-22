import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch } from 'react-redux';

//Components:
import { MainContainer, TextContainer } from './AddProjectForm';
import Text from '../../general_components/Text';

//Styles:

//Interfaces

interface IComponentProps {
    projectUuid: string;
}

const RecolorProjectForm = ({ projectUuid }: IComponentProps): JSX.Element => {
    const [newProjectColor, setNewProjectColor] = useState('');

    return <div>Recolor Project...</div>;
};

export default RecolorProjectForm;
