import { TemplateActionType } from './action-types';
import { TemplateAction } from './templateInterfaces';

const initialState: any = {};

const templateReducer = (state: {} = initialState, action: TemplateAction) => {
    if (!Object.keys(TemplateActionType).includes(action.type)) {
        return state;
    }

    return {
        ...action.payload,
    };
};

export default templateReducer;
