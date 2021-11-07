import * as React from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import { Avatar } from '@mantine/core';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
`;

const AvatarContainer = styled.div`
    margin-bottom: 1rem;
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
    font-size: 1.25rem;
    font-weight: 500;
    color: ${(props) => props.theme.mainText};
    width: 100%;
    word-break: break-all;
`;

//Interfaces:

const ProfilePanel = () => {
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
        </MainContainer>
    );
};

export default ProfilePanel;
