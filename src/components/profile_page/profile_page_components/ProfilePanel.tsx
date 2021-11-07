import * as React from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:

//Styles:

//Interfaces:

const ProfilePanel = () => {
    const dispatch = useDispatch();
    const queriedUser = useSelector((state: RootStateOrAny) => state?.profile);

    return <div>Profile Panel</div>;
};

export default ProfilePanel;
