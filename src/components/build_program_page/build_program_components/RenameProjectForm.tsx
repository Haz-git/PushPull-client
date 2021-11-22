import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch } from 'react-redux';

//Components:

//Styles:
import {
    MainContainer,
    TextContainer,
    InputContainer,
    ButtonContainer,
} from './AddProjectForm';
import Text from '../../general_components/Text';
import { TextInput } from '@mantine/core';
import { Loader } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';

//Interfaces:

interface IComponentProps {
    projectUuid: string;
}

const RenameProjectForm = ({ projectUuid }: IComponentProps): JSX.Element => {
    const [newProjectName, setNewProjectName] = useState('');

    const [hasError, setHasError] = useState(false);

    return (
        <MainContainer>
            {hasError && (
                <TextContainer>
                    <Text
                        text="Please name your project between 4 - 100 characters."
                        textColor="#AF1432"
                    />
                </TextContainer>
            )}
            <InputContainer>
                <TextInput
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 500,
                        },
                    }}
                    required
                    label="New Project Name"
                    placeholder={'Rename your project'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (hasError) setHasError(false);
                        setNewProjectName(e.target.value);
                    }}
                    value={newProjectName}
                    error={hasError}
                />
            </InputContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Rename"
                    width="6rem"
                    buttonBackground="#41A312"
                    fontSize="1rem"
                    height="2rem"
                    iconMargin="0rem .3rem -.2rem 0rem"
                />
                <GeneralButton
                    buttonLabel="Cancel"
                    width="6rem"
                    buttonBackground="#ececec"
                    buttonTextColor="rgba(0, 0, 34, 1)"
                    textShadow="none"
                    disableShadow={true}
                    hoverShadow="none"
                    border="1px solid #c6c6c6"
                    fontSize="1rem"
                    height="2rem"
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default RenameProjectForm;
