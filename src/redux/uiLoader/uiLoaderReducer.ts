import { uiLoaderActionType } from './action-types';
import { loaderTypes } from './loader-types';
import { uiLoaderAction } from './uiLoaderInterfaces';

const initialState: any = {
    LOAD_ALL_TEMPLATE_BLOCKS: {
        isLoading: false,
    },
    MAIN_BUILD_TEMPLATE_VIEW: {
        isLoading: false,
    },
    ADD_BLOCK_MODAL: {
        isLoading: false,
    },
    EDIT_BLOCK_MODAL: {
        isLoading: false,
    },
    GLOBAL_SETTINGS_MODAL: {
        isLoading: false,
    },
    VIEWER_INTERACTIONS_SETTINGS_MODAL: {
        isLoading: false,
    },
};

export const uiLoaderReducer = (
    state: {} = initialState,
    action: uiLoaderAction
) => {
    if (!Object.keys(loaderTypes).includes(action.type)) {
        return state;
    }

    return { ...state, [action.type]: action.payload };
};
