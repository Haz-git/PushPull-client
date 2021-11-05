import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import useLoginStatus from '../../utils/hooks/useLoginStatus';

//Styles:
import styled from 'styled-components';

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
    return <div>profile of {id}</div>;
};

export default ProfilePageView;
