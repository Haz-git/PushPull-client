import { TemplateActionType } from './action-types';

interface findTemplateInProjectDashboard {
    type: TemplateActionType.FIND_TEMPLATE_IN_PROJECT_DASHBOARD;
    payload?: any;
}

interface addTemplateToProjectDashboard {
    type: TemplateActionType.ADD_TEMPLATE_TO_PROJECT_DASHBOARD;
    payload?: any;
}

interface updateTemplateInProjectDashboard {
    type: TemplateActionType.UPDATE_TEMPLATE_IN_PROJECT_DASHBOARD;
    payload?: any;
}

interface deleteTemplateFromProjectDashboard {
    type: TemplateActionType.DELETE_TEMPLATE_FROM_PROJECT_DASHBOARD;
    payload?: any;
}
interface updateTemplate {
    type: TemplateActionType.UPDATE_TEMPLATE;
    payload?: any;
}

interface queryTemplate {
    type: TemplateActionType.QUERY_TEMPLATE;
    payload?: any;
}

interface clearTemplate {
    type: TemplateActionType.CLEAR_TEMPLATE;
    payload?: any;
}

interface addToolbarBlock {
    type: TemplateActionType.ADD_TOOLBAR_BLOCK;
    payload?: any;
}

interface reorderEditingSurfaceColumn {
    type: TemplateActionType.REORDER_EDITING_SURFACE_COLUMN;
    payload?: any;
}

interface addEditingSurfaceBlock {
    type: TemplateActionType.ADD_EDITING_SURFACE_BLOCK;
    payload?: any;
}

interface updateEditingSurfaceBlock {
    type: TemplateActionType.UPDATE_EDITING_SURFACE_BLOCK;
    payload?: any;
}

interface updateToolbarBlock {
    type: TemplateActionType.UPDATE_TOOLBAR_BLOCK;
    payload?: any;
}

interface deleteEditingSurfaceBlock {
    type: TemplateActionType.DELETE_EDITING_SURFACE_BLOCK;
    payload?: any;
}

interface deleteToolbarBlock {
    type: TemplateActionType.DELETE_TOOLBAR_BLOCK;
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
    | reorderEditingSurfaceColumn
    | addEditingSurfaceBlock
    | updateEditingSurfaceBlock
    | updateToolbarBlock
    | deleteEditingSurfaceBlock
    | deleteToolbarBlock;
