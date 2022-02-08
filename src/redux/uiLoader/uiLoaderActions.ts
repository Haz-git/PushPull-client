import { Dispatch } from 'redux';
import { uiLoaderAction } from './uiLoaderInterfaces';
import { uiLoaderActionType } from './action-types';

export const invokeLoaderState = (loaderType: any): Function => {
    return async (dispatch: Dispatch<uiLoaderAction>) => {
        if (!Object.values(uiLoaderActionType).includes(loaderType)) {
            return;
        }

        return dispatch({
            type: loaderType,
            payload: {
                isLoading: true,
            },
        });
    };
};

export const disableLoaderState = (loaderType: any) => {
    return async (dispatch: Dispatch<uiLoaderAction>) => {
        if (!Object.values(uiLoaderActionType).includes(loaderType)) {
            return;
        }

        return dispatch({
            type: loaderType,
            payload: {
                isLoading: false,
            },
        });
    };
};
