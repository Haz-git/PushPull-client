import * as React from 'react';
import { useState } from 'react';
import Userfront from '@userfront/react';

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

const ExitIcon = styled(Exit)`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => props.theme.mainText};
`;

const MainContainer = styled.div`
    cursor: pointer;
    z-index: 9999;
`;

const DropdownContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d3d3d3;
    border-radius: 0.3rem;
    padding: 0.5rem 0.5rem;
    column-gap: 1rem;
`;

const AvatarContainer = styled.div``;

const HeaderContainer = styled.div``;

const UserDetailText = styled.h3`
    font-size: 1rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 800;
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
                    </DropdownContainer>
                }
                zIndex={999}
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
                            autoClose: 20000,
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
