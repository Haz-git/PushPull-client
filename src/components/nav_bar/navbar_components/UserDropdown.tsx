import * as React from 'react';
import { useState } from 'react';
import Userfront from '@userfront/react';

//Redux:
import { useDispatch } from 'react-redux';
import { userSignout } from '../../../redux/auth/authActions';

//Components:
import GeneralButton from '../../../components/general_components/GeneralButton';
import { Menu, MenuItem, MenuLabel, Divider, Text } from '@mantine/core';

//Styles:

import styled from 'styled-components';

const MainContainer = styled.div`
    z-index: 9999;
`;

const DropdownContainer = styled.div`
    border: 1px solid black;
    padding: 0;
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
                control={<DropdownContainer>test</DropdownContainer>}
                zIndex={999}
            >
                <MenuItem>Log Out</MenuItem>
            </Menu>
        </MainContainer>
    );
};

export default UserDropdown;
