import { loaderTypes } from './loader-types';

interface engageLoader {
    type: loaderTypes;
    payload: {
        isLoading: true | false;
    };
}

export type uiLoaderAction = engageLoader;
