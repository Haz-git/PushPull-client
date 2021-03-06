import { Dispatch } from 'redux';
import { ErrorType } from './action-types';
import { ErrorAction, ErrorProps } from './errorInterfaces';

export const toggleErrorNotification = (
    errorType: ErrorType,
    errorProps: ErrorProps
): any => {
    //Todo: find type
    return async (dispatch: Dispatch<ErrorAction>) => {
        if (!Object.values(ErrorType).includes(errorType)) {
            return;
        }

        return dispatch({
            type: errorType,
            payload: {
                hasError: true,
                errorProps,
            },
        });
    };
};

export const resetErrorNotification = (errorType: ErrorType): any => {
    return async (dispatch: Dispatch<ErrorAction>) => {
        if (!Object.values(ErrorType).includes(errorType)) {
            return;
        }

        return dispatch({
            type: errorType,
            payload: {
                hasError: false,
                errorProps: {},
            },
        });
    };
};
