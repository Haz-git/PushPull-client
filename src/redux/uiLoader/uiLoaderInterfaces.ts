import { loaderTypes } from './loader-types';

interface invokeLoader {
    type: loaderTypes;
    payload?: any;
}

interface disableLoader {
    type: loaderTypes;
    payload?: any;
}

export type uiLoaderAction = invokeLoader | disableLoader;
