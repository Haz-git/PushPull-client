import { uiLoaderActionType } from './action-types';
import { uiLoaderAction } from './uiLoaderInterfaces';

const initialState: any = {};

const uiLoaderReducer = (state: {} = initialState, action: uiLoaderAction) => {
    switch (action.type) {
        case uiLoaderActionType.START_LOADER_STATE:
            return { ...action.payload };
        case uiLoaderActionType.END_LOADER_STATE:
            return { ...action.payload };
        default:
            return state;
    }
};

export default uiLoaderReducer;
