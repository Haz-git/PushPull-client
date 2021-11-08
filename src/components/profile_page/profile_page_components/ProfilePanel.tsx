import * as React from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import { Avatar } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import { Location } from '@styled-icons/typicons/Location';
import { Link } from '@styled-icons/typicons/Link';
import { SocialTwitter } from '@styled-icons/typicons/SocialTwitter';

//Styles:
import styled from 'styled-components';

const LocationIcon = styled(Location)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.subText};
`;

const LinkIcon = styled(Link)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.subText};
`;

const TwitterIcon = styled(SocialTwitter)`
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
    padding: 1rem 0;
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

const BioDesc = styled.p`
    margin-top: 1rem;
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
    color: ${(props) => props.theme.mainText};
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
            <DescriptionContainer>
                <NameHeader>{queriedUser?.name || 'Harry Zhou'}</NameHeader>
                <UsernameHeader>{queriedUser?.username}</UsernameHeader>
                <BioDesc>
                    {queriedUser?.data?.userBio ||
                        'UCSD M.S Candidate studying Human Biology with an emphasis in Molecular- and Micro- biology. Tech enthusiast, data wrangler, and software engineer.'}
                </BioDesc>
            </DescriptionContainer>
            <EditProfileContainer>
                {isUserOwnProfile && (
                    <GeneralButton
                        buttonLabel="Edit Profile"
                        padding=".6rem .5rem"
                    />
                )}
            </EditProfileContainer>
            <OptionalMainContainer>
                <OptionalContainer>
                    <LocationIcon />
                    <OptionalDescText>
                        {queriedUser?.data?.location || 'San Diego'}
                    </OptionalDescText>
                </OptionalContainer>
                <OptionalContainer>
                    <LinkIcon />
                    <OptionalDescText>
                        {queriedUser?.data?.website || 'test.com'}
                    </OptionalDescText>
                </OptionalContainer>
                <OptionalContainer>
                    <TwitterIcon />
                    <OptionalDescText>
                        {queriedUser?.data?.twitter || '@testTwitterhandle123'}
                    </OptionalDescText>
                </OptionalContainer>
            </OptionalMainContainer>
        </MainContainer>
    );
};

export default ProfilePanel;
