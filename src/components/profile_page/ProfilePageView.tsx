import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { findUserProfile } from '../../redux/profile/profileActions';

//Components:
import useLoginStatus from '../../utils/hooks/useLoginStatus';
import ProfilePanel from './profile_page_components/ProfilePanel';
import ActivityPanel from './profile_page_components/ActivityPanel';
import ProfilePanelSkeleton from './profile_page_components/ProfilePanelSkeleton';
import UserNotFound from './profile_page_components/UserNotFound';
import UpdateProfileAvatarForm from './profile_page_components/UpdateProfileAvatarForm';
import GeneralModal from '../general_components/GeneralModal';

//Styles:
import styled from 'styled-components';
import ActivityPanelSkeleton from './profile_page_components/ActivityPanelSkeleton';

const PrimaryWrapper = styled.div`
    @media ${deviceMin.mobileS} {
    }

    @media ${deviceMin.tabletp} {
        padding-left: 5%;
        padding-right: 5%;
        margin: 0 auto;
    }

    @media ${deviceMin.laptop} {
        padding-left: 10%;
        padding-right: 10%;
        margin: 0 auto;
    }

    @media ${deviceMin.laptopL} {
        padding-left: 10%;
        padding-right: 10%;
        margin: 0 auto;
    }

    @media ${deviceMin.desktopS} {
        padding-left: 20%;
        padding-right: 20%;
        margin: 0 auto;
    }
`;

const MainContainer = styled.section`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 8fr;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
        overflow: hidden;
    }

    @media ${deviceMin.tabletp} {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 8fr;
        overflow: visible;
        padding: 0rem 0rem 2rem 0rem;
    }
`;

const ProfilePanelView = styled.div`
    width: 20rem;
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
    const dispatch = useDispatch();
    const isUserLoggedIn = useLoginStatus();
    const User = useSelector((state: RootStateOrAny) => state?.user?.user);

    const [isProfilePanelLoaded, setIsProfilePanelLoaded] = useState(false);
    const [isUserNotFound, setIsUserNotFound] = useState(false);
    const [stateAvatarModal, setStateAvatarModal] = useState(false);

    const setStateProfilePanel = (state: boolean) =>
        setIsProfilePanelLoaded(state);

    const setStateIsUserNotFound = (state: boolean) => setIsUserNotFound(state);

    const handleAvatarModal = (state: boolean) => setStateAvatarModal(state);

    useEffect(() => {
        if (isProfilePanelLoaded) setIsProfilePanelLoaded(false);
        if (isUserNotFound) setIsUserNotFound(false);
        dispatch(
            findUserProfile(setStateProfilePanel, setStateIsUserNotFound, id)
        );
    }, [id]);

    const isUserOwnProfile = () => {
        //Determines if this is the user's own profile and if he/she's logged in. If this is true, we can omit the request to grab user profile, and use User state.
        if (isUserLoggedIn && User && User.username === id) return true;
        return false;
    };

    const renderProfilePanelIfLoaded = () => {
        if (isProfilePanelLoaded)
            return (
                <ProfilePanel
                    isUserOwnProfile={isUserOwnProfile()}
                    toggleAvatarModal={(state: boolean) =>
                        setStateAvatarModal(state)
                    }
                />
            );
        return <ProfilePanelSkeleton />;
    };

    const renderActivityPanelIfLoaded = () => {
        if (isProfilePanelLoaded) return <ActivityPanel />;
        return <ActivityPanelSkeleton />;
    };

    const renderProfilePageIfUserFound = () => {
        if (!isUserNotFound) {
            return (
                <>
                    <GeneralModal
                        openBoolean={stateAvatarModal}
                        closeFunc={() => setStateAvatarModal(false)}
                        title="Update Avatar"
                        size="lg"
                    >
                        <UpdateProfileAvatarForm
                            toggleModal={handleAvatarModal}
                        />
                    </GeneralModal>
                    <MainContainer>
                        <ProfilePanelView>
                            {renderProfilePanelIfLoaded()}
                        </ProfilePanelView>
                        <ActivityPanelView>
                            {renderActivityPanelIfLoaded()}
                        </ActivityPanelView>
                    </MainContainer>
                </>
            );
        }

        return <UserNotFound requestedUser={id} />;
    };

    return <PrimaryWrapper>{renderProfilePageIfUserFound()}</PrimaryWrapper>;
};

export default ProfilePageView;
