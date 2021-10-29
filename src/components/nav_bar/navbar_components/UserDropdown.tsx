import * as React from 'react';
import { useState } from 'react';
import Userfront from '@userfront/react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { useDispatch } from 'react-redux';
import { userSignout } from '../../../redux/auth/authActions';

//Components:
import GeneralButton from '../../../components/general_components/GeneralButton';
import { Avatar } from '@mantine/core';
import { Menu, MenuItem, MenuLabel, Divider, Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

//Styles:
import styled from 'styled-components';
import { Exit } from '@styled-icons/boxicons-regular/Exit';
import { CaretDown } from '@styled-icons/ionicons-outline/CaretDown';

const ExitIcon = styled(Exit)`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => props.theme.mainText};
`;

const CaretDownIcon = styled(CaretDown)`
    height: 1.25rem;
    width: 1.25rem;
    color: #c6c6c6;
`;

const MainContainer = styled.div`
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        background: #ececec;
    }

    @media ${deviceMin.mobileS} {
        max-width: 8rem;
    }

    @media ${deviceMin.browserSm} {
        max-width: 15rem;
    }
`;

const DropdownContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d3d3d3;
    border-radius: 0.3rem;
    padding: 0.5rem 0.5rem;
    column-gap: 0.75rem;
`;

const AvatarContainer = styled.div``;

const HeaderContainer = styled.div``;

const UserDetailText = styled.h3`
    font-size: 1rem;
    color: ${(props) => props.theme.mainText};
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
        max-width: 10rem;
    }
`;

//Interfaces:

interface IComponentProps {
    email: string;
    image: string;
    username: string;
}

Userfront.init('5nxxrqn7');

const UserDropdown = ({
    email,
    image,
    username,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const notifications = useNotifications();
    const [stateCollapse, setStateCollapse] = useState(false);

    return (
        <MainContainer>
            <Menu
                placement="center"
                control={
                    <DropdownContainer>
                        <AvatarContainer>
                            <Avatar
                                src={image}
                                size="sm"
                                alt="User image"
                                radius="sm"
                            />
                        </AvatarContainer>
                        <HeaderContainer>
                            <UserDetailText>{username}</UserDetailText>
                        </HeaderContainer>
                        <CaretDownIcon />
                    </DropdownContainer>
                }
                zIndex={999}
                size="sm"
            >
                <MenuItem
                    icon={<ExitIcon />}
                    onClick={() => {
                        Userfront.logout();
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
