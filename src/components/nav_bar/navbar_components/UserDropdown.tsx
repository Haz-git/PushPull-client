import * as React from 'react';
import { useState } from 'react';
import Userfront from '@userfront/react';
import { deviceMin } from '../../../devices/breakpoints';
import { isMobileOnly } from 'react-device-detect';

//Redux:
import { useDispatch } from 'react-redux';
import { userSignout } from '../../../redux/auth/authActions';

//Components:
import historyObject from '../../../utils/historyObject';
import GeneralButton from '../../../components/general_components/GeneralButton';
import { Avatar } from '@mantine/core';
import { Menu, MenuItem, MenuLabel, Divider, Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { useLocation } from 'react-router-dom';

//Styles:
import styled from 'styled-components';
import { Exit } from '@styled-icons/boxicons-regular/Exit';
import { UserCircle } from '@styled-icons/boxicons-regular/UserCircle';
import { CaretDown } from '@styled-icons/ionicons-outline/CaretDown';

const ExitIcon = styled(Exit)`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => props.theme.mainText};
`;

const ProfileIcon = styled(UserCircle)`
    height: 1.35rem;
    width: 1.35rem;
    color: ${(props) => props.theme.mainText};
`;

const CaretDownIcon = styled(CaretDown)<StyledProps>`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => (props.isBuilder ? '#ffffff' : '#c6c6c6')};
`;

const MainContainer = styled.div<StyledProps>`
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        background: ${(props) => (props.isBuilder ? 'none' : '#ececec')};
    }

    @media ${deviceMin.mobileS} {
        max-width: 8rem;
    }

    @media ${deviceMin.browserSm} {
        max-width: 15rem;
    }
`;

const DropdownContainer = styled.div<StyledProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${(props) =>
        props.isBuilder ? '1px solid #ffffff' : '1px solid #d3d3d3'};
    border-radius: 0.3rem;
    padding: 0.5rem 0.5rem;
    column-gap: 0.75rem;
`;

const AvatarContainer = styled.div``;

const HeaderContainer = styled.div``;

const UserDetailText = styled.h3<StyledProps>`
    font-size: 1rem;
    color: ${(props) => (props.isBuilder ? '#ffffff' : props.theme.mainText)};
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media ${deviceMin.mobileS} {
        max-width: 2rem;
    }

    @media ${deviceMin.mobileM} {
        max-width: 3rem;
    }

    @media ${deviceMin.browserSm} {
        max-width: 9.5rem;
    }
`;

//Interfaces:

interface IComponentProps {
    email: string;
    image: string;
    username: string;
}

interface StyledProps {
    isBuilder: boolean;
}

//Userfront init()
Userfront.init('5nxxrqn7');

const UserDropdown = ({
    email,
    image,
    username,
}: IComponentProps): JSX.Element => {
    const location = useLocation();
    const dispatch = useDispatch();
    const notifications = useNotifications();
    const [stateCollapse, setStateCollapse] = useState(false);

    const checkIfMobile = () => {
        if (isMobileOnly) return 'sm';
        return 'lg';
    };

    const checkIfBuilder = () => {
        if (location.pathname.includes('builder')) return true;
        return false;
    };

    return (
        <MainContainer isBuilder={checkIfBuilder()}>
            <Menu
                placement="start"
                control={
                    <DropdownContainer isBuilder={checkIfBuilder()}>
                        <AvatarContainer>
                            <Avatar
                                src={image}
                                size="sm"
                                alt="User image"
                                radius="xl"
                            />
                        </AvatarContainer>
                        <HeaderContainer>
                            <UserDetailText isBuilder={checkIfBuilder()}>
                                {username}
                            </UserDetailText>
                        </HeaderContainer>
                        <CaretDownIcon isBuilder={checkIfBuilder()} />
                    </DropdownContainer>
                }
                zIndex={999}
                size={checkIfMobile()}
            >
                <MenuItem
                    icon={<ProfileIcon />}
                    onClick={() => historyObject.push(`/user/${username}`)}
                >
                    User Profile
                </MenuItem>
                <Divider />
                <MenuItem
                    icon={<ExitIcon />}
                    onClick={() => {
                        Userfront.logout({ redirect: false });
                        dispatch(userSignout());
                        notifications.showNotification({
                            title: `You've Been Signed Out`,
                            message: `We'll see you next time.`,
                            color: 'orange',
                            autoClose: 15000,
                        });
                    }}
                >
                    Log Out
                </MenuItem>
            </Menu>
        </MainContainer>
    );
};

export default UserDropdown;
