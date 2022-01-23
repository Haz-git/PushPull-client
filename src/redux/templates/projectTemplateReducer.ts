import { TemplateActionType } from './action-types';
import { TemplateAction } from './templateInterfaces';

const initialState: any = [];

/*
    Will need to refactor this. Currently for the templates part of redux, we have two different reducers:
    1. one for querying all the templates registered under a specific view (or under a project) and what we do with them.
    2. Another for entering a template and operations inside that editing mode...
*/
const projectTemplateReducer = (
    state: Array<any> = initialState,
    action: TemplateAction
) => {
    switch (action.type) {
        case TemplateActionType.FIND_TEMPLATE_IN_PROJECT_DASHBOARD:
            return [...action.payload];
        case TemplateActionType.ADD_TEMPLATE_TO_PROJECT_DASHBOARD:
            return [...action.payload];
        case TemplateActionType.UPDATE_TEMPLATE_IN_PROJECT_DASHBOARD:
            return [...action.payload];
        case TemplateActionType.DELETE_TEMPLATE_FROM_PROJECT_DASHBOARD:
            return [...action.payload];
        default:
            return state;
    }
};

export default projectTemplateReducer;
