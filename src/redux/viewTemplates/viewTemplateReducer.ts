import { ViewTemplateActionType } from './action-types';
import { ViewTemplateActions } from './viewTemplateInterfaces';

const initialState: any = {};

export const templateReducer = (
    state: {} = initialState,
    action: ViewTemplateActions
) => {
    if (!Object.keys(ViewTemplateActionType).includes(action.type)) {
        return state;
    }

    return {
        ...action.payload,
    };
};
