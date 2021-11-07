import * as React from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import { Avatar } from '@mantine/core';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    padding: 2rem 0rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const AvatarContainer = styled.div`
    cursor: pointer;
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 0;
`;

const NameHeader = styled.h2`
    font-size: 2rem;
    font-weight: 800;
    color: ${(props) => props.theme.mainText};
`;

const UsernameHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${(props) => props.theme.subText};
`;

const BioDesc = styled.h2``;

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
                    radius={250}
                    size={250}
                />
            </AvatarContainer>
            <DescriptionContainer>
                <NameHeader>{queriedUser?.name}</NameHeader>
                <UsernameHeader>{queriedUser?.username}</UsernameHeader>
            </DescriptionContainer>
        </MainContainer>
    );
};

export default ProfilePanel;
