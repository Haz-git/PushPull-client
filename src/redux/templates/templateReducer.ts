import { TemplateActionType } from './action-types';
import { TemplateAction } from './templateInterfaces';

const initialState: any = {};

const templateReducer = (state: {} = initialState, action: TemplateAction) => {
    switch (action.type) {
        case TemplateActionType.UPDATE_TEMPLATE:
            return { ...action.payload };
        case TemplateActionType.QUERY_TEMPLATE:
            return { ...action.payload };
        case TemplateActionType.CLEAR_TEMPLATE:
            return { ...action.payload };
        case TemplateActionType.ADD_TOOLBAR_BLOCK:
            return { ...action.payload };
        case TemplateActionType.REORDER_EDITING_SURFACE_COLUMN:
            return { ...action.payload };
        case TemplateActionType.RENAME_EDITING_SURFACE_COLUMN:
            return { ...action.payload };
        case TemplateActionType.ADD_EDITING_SURFACE_BLOCK:
            return { ...action.payload };
        case TemplateActionType.UPDATE_EDITING_SURFACE_BLOCK:
            return { ...action.payload };
        case TemplateActionType.UPDATE_TOOLBAR_BLOCK:
            return { ...action.payload };
        case TemplateActionType.DELETE_EDITING_SURFACE_BLOCK:
            return { ...action.payload };
        case TemplateActionType.DELETE_TOOLBAR_BLOCK:
            return { ...action.payload };

        default:
            return state;
    }
};

export default templateReducer;
