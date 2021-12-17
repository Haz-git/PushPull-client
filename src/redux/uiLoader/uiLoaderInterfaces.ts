import { uiLoaderActionType } from './action-types';

interface invokeLoader {
    type: uiLoaderActionType.START_LOADER_STATE;
    payload?: any;
}

interface disableLoader {
    type: uiLoaderActionType.END_LOADER_STATE;
    payload?: any;
}

export type uiLoaderAction = invokeLoader | disableLoader;
