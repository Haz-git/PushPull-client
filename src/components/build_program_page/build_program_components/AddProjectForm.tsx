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

const MainContainer = styled.div`
    padding: 0rem 0.5rem 0rem 0.5rem;
`;

const FormContainer = styled.div``;

const InputContainer = styled.div`
    margin: 0rem 0rem 0.5rem 0rem;
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

    return (
        <MainContainer>
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
                        placeholder="Name your project"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setProjectName(e.target.value)
                        }
                        value={projectName}
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
                        placeholder="Project description can be changed at any time."
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
