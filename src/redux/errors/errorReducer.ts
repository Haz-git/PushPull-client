import { ErrorAction, ErrorProps } from './errorInterfaces';
import { ErrorType } from './action-types';

const initialState: any = {
    queryTemplateError: {
        hasError: false,
        errorProps: {},
    },
    queryViewTemplateError: {
        hasError: false,
        errorProps: {},
    },
    saveViewTemplateError: {
        hasError: false,
        errorProps: {},
    },
    viewPreviewError: {
        hasError: false,
        errorProps: {},
    },
};

export const errorReducer = (state: {} = initialState, action: ErrorAction) => {
    if (!Object.keys(ErrorType).includes(action.type)) {
        return state;
    }

    return { ...state, [action.type]: action.payload };
};
