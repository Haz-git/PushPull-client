import { uiLoaderActionType } from './action-types';
import { uiLoaderAction } from './uiLoaderInterfaces';

const initialState: any = {
    statusTemplateBlocks: {
        isLoading: false,
    },
    mainBuildTemplateView: {
        isLoading: false,
    },
    addBlockModal: {
        isLoading: false,
    },
    globalSettingsModal: {
        isLoading: false,
    },
    viewerInteractionsSettingsModal: {
        isLoading: false,
    },
};

const uiLoaderReducer = (state: {} = initialState, action: uiLoaderAction) => {
    if (!Object.keys(uiLoaderActionType).includes(action.type)) {
        return state;
    }

    return { ...state, [action.type]: action.payload };
};

export default uiLoaderReducer;
