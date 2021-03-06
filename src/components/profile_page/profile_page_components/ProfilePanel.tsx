import * as React from 'react';
import { useState } from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import { Avatar } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import { Location } from '@styled-icons/typicons/Location';
import { Link } from '@styled-icons/typicons/Link';
import { SocialTwitter } from '@styled-icons/typicons/SocialTwitter';
import { Badge } from '@mantine/core';
import { EditOutline } from '@styled-icons/evaicons-outline';
import ProfilePanelUpdateForm from './ProfilePanelUpdateForm';

//Styles:
import styled from 'styled-components';

const EditIcon = styled(EditOutline)`
    height: 1.3rem;
    width: 1.3rem;
    color: #ffffff;
`;

export const LocationIcon = styled(Location)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.subText};
`;

export const LinkIcon = styled(Link)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.subText};
`;

export const TwitterIcon = styled(SocialTwitter)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.subText};
`;

export const MainContainer = styled.section`
    padding: 3rem 1rem 0rem 1rem;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
`;

export const AvatarContainer = styled.div`
    position: relative;
    border-radius: 100%;
`;

const AvatarBadgeContainer = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 1rem;
`;

const AvatarBadgeWrapper = styled.button`
    border: none;
    outline: none;
    background: transparent;
    color: #ffffff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.1rem;
    cursor: pointer;
`;

export const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 1rem 0rem 0.5rem 0rem;
`;

const NameHeader = styled.h1`
    font-size: 2rem;
    font-weight: 800;
    color: ${(props) => props.theme.mainText};
    width: 100%;
    word-break: break-all;
`;

const UsernameHeader = styled.h2`
    margin-top: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme.subText};
    width: 100%;
    word-break: break-all;
`;

const MainBadgeContainer = styled.div`
    width: 100%;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    column-gap: 0.25rem;
    row-gap: 0.25rem;
`;

const BadgeContainer = styled.div``;

export const BioDescContainer = styled.div`
    border-top: 1px solid #d6d6d6;
    padding-top: 1rem;
    margin: 0rem 0rem 1.5rem 0rem;
`;

const BioDesc = styled.p`
    font-size: 1.15rem;
    font-weight: 500;
    color: ${(props) => props.theme.mainText};
    width: 100%;
    word-break: break-word;
`;

export const EditProfileContainer = styled.div``;

export const OptionalMainContainer = styled.div`
    margin: 1rem 0rem;
`;

export const OptionalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0.25rem 0rem;
`;

const OptionalDescText = styled.p`
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => props.theme.subText};
    width: 100%;
    margin-left: 0.5rem;
`;

const WebsiteLink = styled.a`
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => props.theme.subText};
    margin-left: 0.5rem;
    cursor: pointer;
    text-decoration: none;
`;

//Interfaces:

interface IComponentProps {
    isUserOwnProfile: boolean;
    toggleAvatarModal: (state: boolean) => void;
}

const ProfilePanel = ({
    isUserOwnProfile,
    toggleAvatarModal,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const queriedUser = useSelector((state: RootStateOrAny) => state?.profile);

    const [isUpdateUserFormOpen, setIsUpdateUserFormOpen] = useState(false);

    const toggleUserUpdateForm = () =>
        setIsUpdateUserFormOpen(!isUpdateUserFormOpen);

    const renderOptionalData = (type: string, data: any) => {
        switch (type) {
            case 'LOCATION':
                return (
                    <OptionalContainer>
                        <LocationIcon />
                        <OptionalDescText>{data}</OptionalDescText>
                    </OptionalContainer>
                );
            case 'WEBSITE':
                return (
                    <OptionalContainer>
                        <LinkIcon />
                        <WebsiteLink
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.${data}`}
                        >
                            {data}
                        </WebsiteLink>
                    </OptionalContainer>
                );
            case 'TWITTER':
                return (
                    <OptionalContainer>
                        <TwitterIcon />
                        <OptionalDescText>{data}</OptionalDescText>
                    </OptionalContainer>
                );
            default:
                throw new Error(
                    'No optional data type was entered, or something went wrong.'
                );
        }
    };

    const renderOptionalDetails = () => {
        const { location, website, twitter } = queriedUser?.data || {}; //short circuit if undefined

        if (!location && !website && !twitter) return null;

        return (
            <OptionalMainContainer>
                <>{renderOptionalData('LOCATION', location)}</>
                <>{renderOptionalData('WEBSITE', website)}</>
                <>{renderOptionalData('TWITTER', twitter)}</>
            </OptionalMainContainer>
        );
    };

    const renderBadges = () => {
        const { badges } = queriedUser?.data || {};

        if (!badges) return null;

        //Example Gradient: { from: 'teal', to: 'blue', deg: 30 }

        return (
            <MainBadgeContainer>
                {badges.map((badge: any) => (
                    <Badge
                        variant="gradient"
                        gradient={badge.badgeGrad}
                        size="lg"
                        styles={{
                            root: {
                                boxShadow:
                                    'rgba(0, 0, 0, 0.1) 0px 1px 1px, rgba(0, 0, 0, 0.23) 0px 2px 4px',
                            },
                        }}
                    >
                        {badge.badgeTitle}
                    </Badge>
                ))}
            </MainBadgeContainer>
        );
    };

    const renderBioDesc = () => {
        const { userBio } = queriedUser?.data || {};

        if (userBio)
            return (
                <BioDescContainer>
                    <BioDesc>{userBio}</BioDesc>
                </BioDescContainer>
            );
    };

    const renderEditProfileButton = () => {
        if (isUserOwnProfile)
            return (
                <EditProfileContainer>
                    <GeneralButton
                        buttonLabel="Edit Profile"
                        padding=".6rem .5rem"
                        onClick={() => toggleUserUpdateForm()}
                    />
                </EditProfileContainer>
            );
    };

    const renderUserDetailsOrUpdateForm = () => {
        if (!isUpdateUserFormOpen) {
            return (
                <>
                    <DescriptionContainer>
                        <NameHeader>{queriedUser?.name}</NameHeader>
                        <UsernameHeader>{queriedUser?.username}</UsernameHeader>
                    </DescriptionContainer>
                    <MainBadgeContainer>{renderBadges()}</MainBadgeContainer>
                    <>{renderBioDesc()}</>
                    <>{renderEditProfileButton()}</>
                    <>{renderOptionalDetails()}</>
                </>
            );
        }

        return (
            <ProfilePanelUpdateForm
                toggleUserUpdateForm={toggleUserUpdateForm}
                currName={queriedUser?.name || ''}
                currBio={queriedUser?.data?.userBio || ''}
                currLocation={queriedUser?.data?.location || ''}
                currWebsite={queriedUser?.data?.website || ''}
                currTwitter={queriedUser?.data?.twitter || ''}
            />
        );
    };

    const renderAvatarBadge = () => {
        if (isUserOwnProfile)
            return (
                <AvatarBadgeContainer>
                    <Badge
                        variant="gradient"
                        gradient={{ from: 'teal', to: 'blue', deg: 105 }}
                        size="lg"
                    >
                        <AvatarBadgeWrapper
                            onClick={() => toggleAvatarModal(true)}
                        >
                            <EditIcon />
                            Edit
                        </AvatarBadgeWrapper>
                    </Badge>
                </AvatarBadgeContainer>
            );
    };

    return (
        <MainContainer>
            <AvatarContainer>
                <Avatar
                    src={queriedUser?.image || null}
                    alt="queried user profile image"
                    radius={280}
                    size={280}
                    styles={{
                        root: {
                            border: '2px solid black',
                        },
                    }}
                />
                {renderAvatarBadge()}
            </AvatarContainer>
            {renderUserDetailsOrUpdateForm()}
        </MainContainer>
    );
};

export default ProfilePanel;
