import * as React from 'react';
import { useState } from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import { TextInput } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { Textarea } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import {
    MainContainer,
    FormTitleContainer,
    FormTitle,
    FormContainer,
    FormInputContainer,
    FormSubtitle,
    FormDescContainer,
    FormDesc,
} from './StarRatingsForm';

const UserInputContainer = styled.div`
    margin: 2rem 0rem;
`;

const UserHeaderInputContainer = styled.div``;

const UserDescInputContainer = styled.div`
    margin: 2rem 0rem;
`;

const RTELabel = styled.label`
    color: rgba(0, 0, 34, 0.7);
    font-family: Lato, san-serif;
    font-size: 1.05rem;
    font-weight: 700;
`;

const RTEContainer = styled.div`
    margin-top: 0.3rem;
`;

//Interfaces:

interface IComponentProps {
    handleUserInput: (name: string, val: string) => void;
    currentHeaderVal: string;
    currentEditorVal: string;
}

const MoreDetailsForm = ({
    handleUserInput,
    currentHeaderVal,
    currentEditorVal,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <FormTitleContainer>
                <FormTitle>More Details</FormTitle>
            </FormTitleContainer>
            <FormContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        How was this workout program in general?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>
                            Now's the time to let people know of the specific
                            details!
                        </FormDesc>
                    </FormDescContainer>
                    <UserInputContainer>
                        <UserHeaderInputContainer>
                            <TextInput
                                styles={{
                                    root: {
                                        maxWidth: '30rem',
                                    },
                                    label: {
                                        color: 'rgba(0, 0, 34, .7)',
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '1.05rem',
                                        fontWeight: 700,
                                        marginBottom: '.25rem',
                                    },
                                    input: {
                                        color: 'rgba(0, 0, 34, 1)',
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '1.05rem',
                                        fontWeight: 700,
                                    },
                                }}
                                required
                                label="Review Header"
                                placeholder="Insert Engaging Header Here..."
                                onChange={(e) =>
                                    handleUserInput(
                                        'reviewTitle',
                                        e.target.value
                                    )
                                }
                                value={currentHeaderVal}
                            />
                        </UserHeaderInputContainer>
                        <UserDescInputContainer>
                            <RTELabel>Review Description</RTELabel>
                            <RTEContainer>
                                <RichTextEditor
                                    value={currentEditorVal}
                                    onChange={(val) =>
                                        handleUserInput('reviewDesc', val)
                                    }
                                    sticky={true}
                                    styles={{
                                        root: {
                                            height: '30rem',
                                            maxHeight: '30rem',
                                            overflow: 'scroll',
                                            maxWidth: '55rem',
                                        },
                                    }}
                                />
                            </RTEContainer>
                        </UserDescInputContainer>
                    </UserInputContainer>
                </FormInputContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default MoreDetailsForm;
