import { Dispatch } from 'redux';
import { uiLoaderAction } from './uiLoaderInterfaces';
import { uiLoaderActionType } from './action-types';

export const invokeLoaderState = (loaderType: string) => {
    return async (dispatch: Dispatch<uiLoaderAction>) => {
        switch (loaderType) {
            case 'START_TEMPLATE_BLOCK_LOADER':
                return dispatch({
                    type: uiLoaderActionType.START_TEMPLATE_BLOCK_LOADER,
                    payload: {
                        isLoading: true,
                    },
                });
            case 'MAIN_BUILD_TEMPLATE_VIEW':
                return dispatch({
                    type: uiLoaderActionType.START_MAINBUILDTEMPLATEVIEW_LOADER,
                    payload: {
                        isLoading: true,
                    },
                });
            case 'ADD_BLOCK_MODAL':
                return dispatch({
                    type: uiLoaderActionType.START_ADDBLOCKMODAL_LOADER,
                    payload: {
                        isLoading: true,
                    },
                });
            default:
                throw new Error('No loaderType was provided');
        }
    };
};

export const disableLoaderState = (loaderType: string) => {
    return async (dispatch: Dispatch<uiLoaderAction>) => {
        switch (loaderType) {
            case 'END_TEMPLATE_BLOCK_LOADER':
                return dispatch({
                    type: uiLoaderActionType.END_TEMPLATE_BLOCK_LOADER,
                    payload: {
                        isLoading: false,
                    },
                });
            case 'MAIN_BUILD_TEMPLATE_VIEW':
                return dispatch({
                    type: uiLoaderActionType.END_MAINBUILDTEMPLATEVIEW_LOADER,
                    payload: {
                        isLoading: false,
                    },
                });
            case 'ADD_BLOCK_MODAL':
                return dispatch({
                    type: uiLoaderActionType.END_ADDBLOCKMODAL_LOADER,
                    payload: {
                        isLoading: false,
                    },
                });
            default:
                throw new Error('No loaderType was provided');
        }
    };
};
