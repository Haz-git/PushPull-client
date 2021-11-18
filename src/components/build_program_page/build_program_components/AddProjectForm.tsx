import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import { addProject } from '../../../redux/builder/builderActions';

//Components:
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { ColorInput } from '@mantine/core';
import Text from '../../general_components/Text';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';
import { Refresh } from '@styled-icons/evil/Refresh';

const RandomIcon = styled(Refresh)`
    height: 1.85rem;
    width: 1.85rem;
    color: rgba(0, 0, 34, 1);
`;

const MainContainer = styled.div`
    padding: 0rem 0.5rem 0rem 0.5rem;
`;

const FormContainer = styled.div``;

const InputContainer = styled.div`
    margin: 0rem 0rem 0.5rem 0rem;
`;

const RandomButton = styled.button`
    outline: none;
    border: none;
    background: inherit;
    padding: 0rem 0rem;
    border-radius: 0.2rem;

    :hover {
        background: #ececec;
        cursor: pointer;
    }
`;

const TextContainer = styled.div`
    margin: 0rem 0rem 0.5rem 0rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 0.5rem;
    padding: 1rem 0rem 0rem 0rem;
`;

//Interfaces:

interface IComponentProps {
    toggleProjectModal: (status: boolean) => void;
}

const AddProjectForm = ({
    toggleProjectModal,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();

    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [projectColor, setProjectColor] = useState('#ffffff');

    const [hasError, setHasError] = useState(false);

    const isProjectNameLengthOk = () => {
        if (projectName.length === 0) return false;
        if (projectName.length <= 3) return false;
        if (projectName.length >= 4 && projectName.length <= 100) return true;

        return false;
    };

    const generateRandomHexColor = () => {
        setProjectColor(
            '#'.concat(Math.floor(Math.random() * 16777215).toString(16))
        );
    };

    const handleNewProjectSubmission = () => {
        if (isProjectNameLengthOk()) {
            return dispatch(
                addProject((status: boolean) => console.log(status), {
                    projectName,
                    projectDesc,
                    projectColorHex: projectColor,
                })
            );
        }

        return setHasError(true);
    };

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
            <FormContainer>
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
                        label="Project Name"
                        placeholder={'Name your project'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (hasError) setHasError(false);
                            setProjectName(e.target.value);
                        }}
                        value={projectName}
                        error={hasError}
                    />
                </InputContainer>
                <InputContainer>
                    <Textarea
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
                                height: '8rem',
                            },
                        }}
                        label="Project Description"
                        placeholder="Project name, description, and color can be changed at any time."
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setProjectDesc(e.target.value)
                        }
                        value={projectDesc}
                    />
                </InputContainer>
                <InputContainer>
                    <ColorInput
                        styles={{
                            label: {
                                color: 'rgba(0, 0, 34, .7)',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 700,
                                marginBottom: '.25rem',
                            },
                        }}
                        placeholder="Pick color"
                        label="Project Color"
                        disallowInput
                        dropdownZIndex={9999}
                        onChange={(e: string) => setProjectColor(e)}
                        value={projectColor}
                        rightSection={
                            <RandomButton onClick={generateRandomHexColor}>
                                <RandomIcon />
                            </RandomButton>
                        }
                    />
                </InputContainer>
            </FormContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Save"
                    width="5rem"
                    buttonBackground="#41A312"
                    fontSize="1rem"
                    height="2rem"
                    iconMargin="0rem .3rem -.2rem 0rem"
                    onClick={handleNewProjectSubmission}
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
                    onClick={() => toggleProjectModal(false)}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default AddProjectForm;
