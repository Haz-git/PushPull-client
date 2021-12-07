import { TemplateActionType } from './action-types';
import { TemplateAction } from './templateInterfaces';

const initialState: any = [];

const templateReducer = (
    state: Array<any> = initialState,
    action: TemplateAction
) => {
    switch (action.type) {
        case TemplateActionType.USER_FIND_TEMPLATE:
            return [...action.payload];
        case TemplateActionType.USER_ADD_TEMPLATE:
            return [...action.payload];
        case TemplateActionType.USER_UPDATE_TEMPLATE:
            return [...action.payload];
        case TemplateActionType.USER_DELETE_TEMPLATE:
            return [...action.payload];
        default:
            return state;
    }
};

export default templateReducer;
