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
import ProfilePanelUpdateForm from './ProfilePanelUpdateForm';

//Styles:
import styled from 'styled-components';

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

const MainContainer = styled.section`
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
`;

const AvatarContainer = styled.div`
    cursor: pointer;
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 1rem 0rem 0.5rem 0rem;
`;

const NameHeader = styled.h2`
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

const BioDescContainer = styled.div`
    margin: 0.5rem 0rem 1.5rem 0rem;
`;

const BioDesc = styled.p`
    font-size: 1.15rem;
    font-weight: 500;
    color: ${(props) => props.theme.mainText};
    width: 100%;
    word-break: break-word;
`;

const EditProfileContainer = styled.div``;

const OptionalMainContainer = styled.div`
    margin: 1rem 0rem;
`;

const OptionalContainer = styled.div`
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

//Interfaces:

interface IComponentProps {
    isUserOwnProfile: boolean;
}

const ProfilePanel = ({ isUserOwnProfile }: IComponentProps): JSX.Element => {
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
                        <OptionalDescText>{data}</OptionalDescText>
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

        return badges.map((badge: any) => (
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
        ));
    };

    const renderUserDetailsOrUpdateForm = () => {
        if (!isUpdateUserFormOpen) {
            return (
                <>
                    <DescriptionContainer>
                        <NameHeader>
                            {queriedUser?.name || 'Harry Zhou'}
                        </NameHeader>
                        <UsernameHeader>{queriedUser?.username}</UsernameHeader>
                    </DescriptionContainer>
                    <MainBadgeContainer>{renderBadges()}</MainBadgeContainer>
                    <BioDescContainer>
                        <BioDesc>
                            {queriedUser?.data?.userBio ||
                                'UCSD M.S Candidate studying Human Biology with an emphasis in Molecular- and Micro- biology. Tech enthusiast, data wrangler, and software engineer.'}
                        </BioDesc>
                    </BioDescContainer>
                    <EditProfileContainer>
                        {isUserOwnProfile && (
                            <GeneralButton
                                buttonLabel="Edit Profile"
                                padding=".6rem .5rem"
                                onClick={() => toggleUserUpdateForm()}
                            />
                        )}
                    </EditProfileContainer>
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

    return (
        <MainContainer>
            <AvatarContainer>
                <Avatar
                    src={queriedUser?.image || null}
                    alt="queried user profile image"
                    radius={280}
                    size={280}
                />
            </AvatarContainer>
            {renderUserDetailsOrUpdateForm()}
        </MainContainer>
    );
};

export default ProfilePanel;
