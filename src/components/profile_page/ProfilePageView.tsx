import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import useLoginStatus from '../../utils/hooks/useLoginStatus';
import ProfilePanel from './profile_page_components/ProfilePanel';
import ActivityPanel from './profile_page_components/ActivityPanel';

//Styles:
import styled from 'styled-components';

const PrimaryWrapper = styled.div`
    padding-left: 20%;
    padding-right: 20%;
    margin: 0 auto;
`;

const MainContainer = styled.section`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 8fr;
    border: 1px solid black;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
        overflow: hidden;
    }

    @media ${deviceMin.tabletp} {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 8fr;
        overflow: visible;
    }
`;

const ProfilePanelView = styled.div`
    width: 18rem;
`;

const ActivityPanelView = styled.div``;

//Interfaces:

interface IComponentProps {
    match: {
        params: {
            id: any;
        };
    };
}

const ProfilePageView = ({
    match: {
        params: { id },
    },
}: IComponentProps): JSX.Element => {
    const isUserLoggedIn = useLoginStatus();
    const User = useSelector((state: RootStateOrAny) => state?.user?.user);

    const isUserOwnProfile = () => {
        if (isUserLoggedIn && User && User.username === id) return true;
        return false;
    };

    return (
        <PrimaryWrapper>
            <MainContainer>
                <ProfilePanelView>
                    <ProfilePanel />
                </ProfilePanelView>
                <ActivityPanelView>
                    <ActivityPanel />
                </ActivityPanelView>
            </MainContainer>
        </PrimaryWrapper>
    );
};

export default ProfilePageView;
