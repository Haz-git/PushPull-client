import { TemplateActionType, ProjectTemplateActionType } from './action-types';

interface findTemplateInProjectDashboard {
    type: ProjectTemplateActionType.FIND_TEMPLATE_IN_PROJECT_DASHBOARD;
    payload?: any;
}

interface addTemplateToProjectDashboard {
    type: ProjectTemplateActionType.ADD_TEMPLATE_TO_PROJECT_DASHBOARD;
    payload?: any;
}

interface updateTemplateInProjectDashboard {
    type: ProjectTemplateActionType.UPDATE_TEMPLATE_IN_PROJECT_DASHBOARD;
    payload?: any;
}

interface deleteTemplateFromProjectDashboard {
    type: ProjectTemplateActionType.DELETE_TEMPLATE_FROM_PROJECT_DASHBOARD;
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

interface renameEditingSurfaceColumn {
    type: TemplateActionType.RENAME_EDITING_SURFACE_COLUMN;
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

interface addSheet {
    type: TemplateActionType.ADD_SHEET;
    payload?: any;
}

interface updateSheet {
    type: TemplateActionType.UPDATE_SHEET;
    payload?: any;
}

interface deleteSheet {
    type: TemplateActionType.DELETE_SHEET;
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
    | renameEditingSurfaceColumn
    | reorderEditingSurfaceColumn
    | addEditingSurfaceBlock
    | updateEditingSurfaceBlock
    | updateToolbarBlock
    | deleteEditingSurfaceBlock
    | deleteToolbarBlock
    | addSheet
    | updateSheet
    | deleteSheet;
