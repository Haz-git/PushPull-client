import { uiLoaderActionType } from './action-types';
import { uiLoaderAction } from './uiLoaderInterfaces';

const initialState: any = {
    mainBuildTemplateView: {
        isLoading: false,
    },
    addBlockModal: {
        isLoading: false,
    },
};

const uiLoaderReducer = (state: {} = initialState, action: uiLoaderAction) => {
    switch (action.type) {
        case uiLoaderActionType.START_ADDBLOCKMODAL_LOADER:
            return { ...state, addBlockModal: action.payload };
        case uiLoaderActionType.START_MAINBUILDTEMPLATEVIEW_LOADER:
            return { ...state, mainBuildTemplateView: action.payload };
        case uiLoaderActionType.END_ADDBLOCKMODAL_LOADER:
            return { ...state, addBlockModal: action.payload };
        case uiLoaderActionType.END_MAINBUILDTEMPLATEVIEW_LOADER:
            return { ...state, mainBuildTemplateView: action.payload };
        default:
            return state;
    }
};

export default uiLoaderReducer;
