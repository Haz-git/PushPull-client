import { uiLoaderActionType } from './action-types';

interface invokeLoader {
    type:
        | uiLoaderActionType.START_ADDBLOCKMODAL_LOADER
        | uiLoaderActionType.START_MAINBUILDTEMPLATEVIEW_LOADER;
    payload?: any;
}

interface disableLoader {
    type:
        | uiLoaderActionType.END_ADDBLOCKMODAL_LOADER
        | uiLoaderActionType.END_MAINBUILDTEMPLATEVIEW_LOADER;
    payload?: any;
}

export type uiLoaderAction = invokeLoader | disableLoader;
