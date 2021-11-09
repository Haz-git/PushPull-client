import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../redux/profile/profileActions';

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
    currName: string;
    currBio: string;
    currLocation: string;
    currWebsite: string;
    currTwitter: string;
}

const ProfilePanelUpdateForm = ({
    toggleUserUpdateForm,
    currName,
    currBio,
    currLocation,
    currWebsite,
    currTwitter,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();

    const [userProfileUpdateDetails, setUserProfileUpdateDetails] = useState({
        newName: currName,
        newBio: currBio,
        newLocation: currLocation,
        newWebsite: currWebsite,
        newTwitter: currTwitter,
    });

    const handleUserInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setUserProfileUpdateDetails({
            ...userProfileUpdateDetails,
            [e.target.name]: e.target.value,
        });
    };

    const fakeCallback = (status: boolean) => console.log(status);

    const handleUserSubmit = () => {
        dispatch(updateUserProfile(fakeCallback, userProfileUpdateDetails));
    };

    return (
        <MainContainer>
            <FormContainer>
                <TextInputContainer>
                    <TextInput
                        name="newName"
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
                        onChange={(e) => handleUserInput(e)}
                        maxLength={80}
                    />
                </TextInputContainer>
                <TextInputContainer>
                    <Textarea
                        name="newBio"
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
                        onChange={(e) => handleUserInput(e)}
                        maxLength={200}
                    />
                </TextInputContainer>
                <OptionalInputContainer>
                    <IconWrapper>
                        <LocationIcon />
                    </IconWrapper>
                    <OptionalInputWrapper>
                        <TextInput
                            name="newLocation"
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
                            onChange={(e) => handleUserInput(e)}
                            maxLength={100}
                        />
                    </OptionalInputWrapper>
                </OptionalInputContainer>
                <OptionalInputContainer>
                    <IconWrapper>
                        <LinkIcon />
                    </IconWrapper>
                    <OptionalInputWrapper>
                        <TextInput
                            name="newWebsite"
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
                            onChange={(e) => handleUserInput(e)}
                            maxLength={100}
                        />
                    </OptionalInputWrapper>
                </OptionalInputContainer>
                <OptionalInputContainer>
                    <IconWrapper>
                        <TwitterIcon />
                    </IconWrapper>
                    <OptionalInputWrapper>
                        <TextInput
                            name="newTwitter"
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
                            onChange={(e) => handleUserInput(e)}
                            maxLength={100}
                        />
                    </OptionalInputWrapper>
                </OptionalInputContainer>
            </FormContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Save"
                    onClick={() => {
                        handleUserSubmit();
                        toggleUserUpdateForm();
                    }}
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
