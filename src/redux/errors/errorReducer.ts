import { ErrorAction, ErrorProps } from './errorInterfaces';
import { ErrorType } from './action-types';

const initialState: any = {
    QUERY_TEMPLATE: {
        hasError: false,
        errorProps: {},
    },
    QUERY_VIEW_TEMPLATE: {
        hasError: false,
        errorProps: {},
    },
    SAVE_VIEW_TEMPLATE: {
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
