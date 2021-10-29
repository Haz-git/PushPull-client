import * as React from 'react';
import { useEffect } from 'react';
import Userfront from '@userfront/react';
import { useNotifications } from '@mantine/notifications';

//Redux:
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/authActions';

//Components:
import Backdrop from '../backdrop/BackdropMain';
import BodySectionMain from '../body_section/BodySectionMain';

//Styles:

//Interfaces:

Userfront.init('5nxxrqn7');

const MainLandingPageView = () => {
    const dispatch = useDispatch();
    const notifications = useNotifications();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        const token = urlParams.get('token');
        const uuid = urlParams.get('uuid');
        if (token && uuid) {
            Userfront.login({
                method: 'link',
                token: token,
                uuid: uuid,
            })
                .then((promise: any) => {
                    dispatch(userLogin(Userfront.user));

                    notifications.showNotification({
                        title: `Welcome, ${Userfront.user.username}`,
                        message: `You've been logged in. Your email has been confirmed.`,
                        color: 'orange',
                        autoClose: 20000,
                    });
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <>
            <Backdrop />
            <BodySectionMain />
        </>
    );
};

export default MainLandingPageView;
