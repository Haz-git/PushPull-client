import { ViewTemplateActionType } from './action-types';

interface queryViewTemplate {
    type: ViewTemplateActionType.QUERY_VIEW_TEMPLATE;
    payload?: any;
}

interface addViewTemplate {
    type: ViewTemplateActionType.ADD_VIEW_TEMPLATE;
    payload?: any;
}

interface updateViewTemplate {
    type: ViewTemplateActionType.UPDATE_VIEW_TEMPLATE;
    payload?: any;
}

interface deleteViewTemplate {
    type: ViewTemplateActionType.DELETE_VIEW_TEMPLATE;
    payload?: any;
}

export type ViewTemplateActions =
    | queryViewTemplate
    | addViewTemplate
    | updateViewTemplate
    | deleteViewTemplate;
