import * as React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import { LocationIcon, LinkIcon, TwitterIcon } from './ProfilePanel';

const MainContainer = styled.div`
    width: 100%;
`;

const FormContainer = styled.form``;

const TextInputContainer = styled.div`
    margin-bottom: 0.5rem;
`;

const OptionalInputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem 0rem;
`;

const IconWrapper = styled.div`
    margin-right: 0.25rem;
`;

const OptionalInputWrapper = styled.div`
    flex-grow: 2;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-right: 2rem;
`;

//Interfaces:

interface IComponentProps {
    toggleUserUpdateForm: () => void;
}

const ProfilePanelUpdateForm = ({
    toggleUserUpdateForm,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <FormContainer>
                <TextInputContainer>
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
                        label="Name"
                        placeholder="Name"
                    />
                </TextInputContainer>
                <TextInputContainer>
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
                                height: '5rem',
                                maxHeight: '5rem',
                            },
                        }}
                        label="Bio"
                        placeholder="Tell everyone about you"
                        required
                    />
                </TextInputContainer>
                <OptionalInputContainer>
                    <IconWrapper>
                        <LocationIcon />
                    </IconWrapper>
                    <OptionalInputWrapper>
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
                            placeholder="Location"
                        />
                    </OptionalInputWrapper>
                </OptionalInputContainer>
                <OptionalInputContainer>
                    <IconWrapper>
                        <LinkIcon />
                    </IconWrapper>
                    <OptionalInputWrapper>
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
                            placeholder="Website"
                        />
                    </OptionalInputWrapper>
                </OptionalInputContainer>
                <OptionalInputContainer>
                    <IconWrapper>
                        <TwitterIcon />
                    </IconWrapper>
                    <OptionalInputWrapper>
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
                            placeholder="Twitter username"
                        />
                    </OptionalInputWrapper>
                </OptionalInputContainer>
            </FormContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Save"
                    onClick={() => toggleUserUpdateForm()}
                    width="5rem"
                    buttonBackground="#41A312"
                    fontSize="1rem"
                    height="2rem"
                />
                <GeneralButton
                    buttonLabel="Cancel"
                    width="5rem"
                    buttonBackground="#ececec"
                    buttonTextColor="rgba(0, 0, 34, 1)"
                    textShadow="none"
                    disableShadow={true}
                    hoverShadow="none"
                    border="1px solid #c6c6c6"
                    onClick={() => toggleUserUpdateForm()}
                    fontSize="1rem"
                    height="2rem"
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default ProfilePanelUpdateForm;
