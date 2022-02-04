import * as React from 'react';

//Components:
import { TextInput, Textarea, ColorInput } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div``;

const FormContainer = styled.div``;

const Divider = styled.div`
    height: 0.4rem;
`;

const ButtonContainer = styled.div`
    margin: 1rem 0rem 0rem 0rem;
`;

export const AddColorForm = () => {
    return (
        <MainContainer>
            <FormContainer>
                <TextInput
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.8rem',
                            fontWeight: 500,
                        },
                    }}
                    required
                    label="Color Label"
                    placeholder={'Label your color'}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //     if (hasError) setHasError(false);
                    //     setProjectName(e.target.value);
                    // }}
                    // value={projectName}
                    // error={hasError}
                    // disabled={isCreatingNewProject}
                />
                <Divider />
                <Textarea
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.8rem',
                            fontWeight: 500,
                            height: '4rem',
                        },
                    }}
                    label="Color Description"
                    placeholder="Describe what your color means.."
                    // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    //     setProjectDesc(e.target.value)
                    // }
                    // value={projectDesc}
                    // disabled={isCreatingNewProject}
                />
                <Divider />
                <ColorInput
                    required
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.8rem',
                            fontWeight: 500,
                        },
                    }}
                    placeholder="Pick your color"
                    label="Select Color"
                    disallowInput
                    dropdownZIndex={9999}
                    // onChange={(e: string) => setProjectColor(e)}
                    // value={projectColor}
                    // rightSection={
                    //     <RandomButton onClick={generateRandomHexColor}>
                    //         <RandomIcon />
                    //     </RandomButton>
                    // }
                    // disabled={isCreatingNewProject}
                />
            </FormContainer>
            <ButtonContainer>
                <GeneralButton buttonLabel="Save Color" padding=".5rem .2rem" />
            </ButtonContainer>
        </MainContainer>
    );
};
