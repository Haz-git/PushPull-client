import { TemplateActionType } from './action-types';
import { TemplateAction } from './templateInterfaces';

const initialState: any = {};

const templateReducer = (state: {} = initialState, action: TemplateAction) => {
    switch (action.type) {
        case TemplateActionType.USER_QUERY_TEMPLATE:
            return { ...action.payload };
        case TemplateActionType.USER_CLEAR_TEMPLATE:
            return { ...action.payload };
        default:
            return state;
    }
};

export default templateReducer;
