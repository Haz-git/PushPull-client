import { Dispatch } from 'redux';
import { uiLoaderAction } from './uiLoaderInterfaces';
import { loaderTypes } from './loader-types';

export const invokeLoaderState = (loaderType: any): Function => {
    return async (dispatch: Dispatch<uiLoaderAction>) => {
        if (!Object.values(loaderTypes).includes(loaderType)) {
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

export const disableLoaderState = (loaderType: any): Function => {
    return async (dispatch: Dispatch<uiLoaderAction>) => {
        if (!Object.values(loaderTypes).includes(loaderType)) {
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
