import * as React from 'react';
import { useEffect } from 'react';

//Components:
import { useNotifications } from '@mantine/notifications';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Styles:
import { CancelIcon } from '../build_program_page/build_program_components/AddProjectForm';

//Interfaces:
import { ErrorProps } from '../../redux/errors/errorInterfaces';

type ActiveErrorType = {
    hasError: boolean;
    errorProps: ErrorProps;
};
interface IComponentProps {
    children: React.ReactNode;
}

export const ErrorNotificationProvider = ({
    children,
}: IComponentProps): JSX.Element => {
    const errors = useSelector((state: RootStateOrAny) => state?.errors);
    const notifications = useNotifications();

    const findActiveError = (): any => {
        //Check if hasError: true for any errors in store.
        //TODO: ActiveErrorType throws error.
        return Object.values(errors).find(
            (error: any) => error.hasError === true
        );
    };

    const displayErrorNotification = () => {
        const activeErrorObject = findActiveError();
        console.log(activeErrorObject);
        if (!activeErrorObject) {
            return;
        }

        return notifications.showNotification({
            color: 'red',
            title: activeErrorObject.errorProps.errorMessage,
            message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
            autoClose: activeErrorObject.errorProps.openDuration,
            icon: <CancelIcon />,
        });
    };

    useEffect(() => {
        displayErrorNotification();
    }, [errors]);

    return (
        <>
            <>{children}</>
        </>
    );
};
