import { Dispatch } from 'redux';
import { uiLoaderAction } from './uiLoaderInterfaces';
import { uiLoaderActionType } from './action-types';

export const invokeLoaderState = () => {
    return async (dispatch: Dispatch<uiLoaderAction>) => {
        dispatch({
            type: uiLoaderActionType.START_LOADER_STATE,
            payload: {
                isLoading: true,
            },
        });
    };
};

export const disableLoaderState = () => {
    return async (dispatch: Dispatch<uiLoaderAction>) => {
        dispatch({
            type: uiLoaderActionType.END_LOADER_STATE,
            payload: {
                isLoading: false,
            },
        });
    };
};
