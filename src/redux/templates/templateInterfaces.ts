import { TemplateActionType } from './action-types';

interface findTemplate {
    type: TemplateActionType.USER_FIND_TEMPLATE;
    payload?: any;
}

interface addTemplate {
    type: TemplateActionType.USER_ADD_TEMPLATE;
    payload?: any;
}

interface updateTemplate {
    type: TemplateActionType.USER_UPDATE_TEMPLATE;
    payload?: any;
}
interface deleteTemplate {
    type: TemplateActionType.USER_DELETE_TEMPLATE;
    payload?: any;
}

interface queryTemplate {
    type: TemplateActionType.USER_QUERY_TEMPLATE;
    payload?: any;
}

export type TemplateAction =
    | findTemplate
    | addTemplate
    | updateTemplate
    | deleteTemplate
    | queryTemplate;
