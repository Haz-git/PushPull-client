import { ViewTemplateActionType } from './action-types';

interface queryViewTemplate {
    type: ViewTemplateActionType.queryViewTemplate;
    payload?: any;
}

interface addViewTemplate {
    type: ViewTemplateActionType.addViewTemplate;
    payload?: any;
}

interface updateViewTemplate {
    type: ViewTemplateActionType.updateViewTemplate;
    payload?: any;
}

interface deleteViewTemplate {
    type: ViewTemplateActionType.deleteViewTemplate;
    payload?: any;
}

export type ViewTemplateActions =
    | queryViewTemplate
    | addViewTemplate
    | updateViewTemplate
    | deleteViewTemplate;
