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

//Styles:

import styled from 'styled-components';

const MainContainer = styled.div`
    z-index: 9999;
`;

const DropdownContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d3d3d3;
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;
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

const UserDropdown = ({
    email,
    image,
    username,
}: IComponentProps): JSX.Element => {
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
                <MenuItem>Log Out</MenuItem>
            </Menu>
        </MainContainer>
    );
};

export default UserDropdown;
