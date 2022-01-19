import { TemplateActionType } from './action-types';

interface findTemplateInProjectDashboard {
    type: TemplateActionType.USER_FIND_TEMPLATE_IN_PROJECT_DASHBOARD;
    payload?: any;
}

interface addTemplateToProjectDashboard {
    type: TemplateActionType.USER_ADD_TEMPLATE_TO_PROJECT_DASHBOARD;
    payload?: any;
}

interface updateTemplateInProjectDashboard {
    type: TemplateActionType.USER_UPDATE_TEMPLATE_IN_PROJECT_DASHBOARD;
    payload?: any;
}

interface deleteTemplateFromProjectDashboard {
    type: TemplateActionType.USER_DELETE_TEMPLATE_FROM_PROJECT_DASHBOARD;
    payload?: any;
}
interface updateTemplate {
    type: TemplateActionType.USER_UPDATE_TEMPLATE;
    payload?: any;
}

interface queryTemplate {
    type: TemplateActionType.USER_QUERY_TEMPLATE;
    payload?: any;
}

interface clearTemplate {
    type: TemplateActionType.USER_CLEAR_TEMPLATE;
    payload?: any;
}

interface addToolbarBlock {
    type: TemplateActionType.USER_ADD_TOOLBAR_BLOCK;
    payload?: any;
}

interface addEditingSurfaceBlock {
    type: TemplateActionType.USER_ADD_EDITING_SURFACE_BLOCK;
    payload?: any;
}

interface updateEditingSurfaceBlock {
    type: TemplateActionType.USER_UPDATE_EDITING_SURFACE_BLOCK;
    payload?: any;
}

interface updateToolbarBlock {
    type: TemplateActionType.USER_UPDATE_TOOLBAR_BLOCK;
    payload?: any;
}

interface deleteEditingSurfaceBlock {
    type: TemplateActionType.USER_DELETE_EDITING_SURFACE_BLOCK;
    payload?: any;
}

interface deleteToolbarBlock {
    type: TemplateActionType.USER_DELETE_TOOLBAR_BLOCK;
    payload?: any;
}

export type TemplateAction =
    | findTemplateInProjectDashboard
    | addTemplateToProjectDashboard
    | updateTemplateInProjectDashboard
    | deleteTemplateFromProjectDashboard
    | updateTemplate
    | queryTemplate
    | clearTemplate
    | addToolbarBlock
    | addEditingSurfaceBlock
    | updateEditingSurfaceBlock
    | updateToolbarBlock
    | deleteEditingSurfaceBlock
    | deleteToolbarBlock;
