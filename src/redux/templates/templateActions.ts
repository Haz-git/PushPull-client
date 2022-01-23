import api from '../../api';
import { Dispatch } from 'redux';
import { TemplateAction } from './templateInterfaces';
import { TemplateActionType } from './action-types';
import { loaderTypes } from '../uiLoader/loader-types';

//Loader ui actions:
import {
    invokeLoaderState,
    disableLoaderState,
} from '../uiLoader/uiLoaderActions';

//Project Templates or View- specific template actions.

export const findTemplates = (
    projectTemplatesCallback: (status: boolean) => void,
    dashboardCallback: (status: boolean) => void,
    projectUuid: string | null,
    dashboardView: string | null
) => {
    return async (dispatch: Dispatch<TemplateAction>) => {
        try {
            let response;

            if (!projectUuid && dashboardView) {
                response = await api.get(`/template/project/${dashboardView}`);
            } else {
                response = await api.get(`/template/project/${projectUuid}`);
            }

            dispatch({
                type: TemplateActionType.FIND_TEMPLATE_IN_PROJECT_DASHBOARD,
                payload: response.data.templates,
            });

            if (response.data.status === 'Success') {
                projectTemplatesCallback(true);
                dashboardCallback(true);
            }
        } catch (err) {
            projectTemplatesCallback(false);
            dashboardCallback(false);
        }
    };
};

export const addTemplate = (
    statusCallback: (status: boolean) => void,
    templateDetails: any
) => {
    return async (dispatch: Dispatch<TemplateAction>) => {
        try {
            let response = await api.post(`/template/add`, { templateDetails });

            dispatch({
                type: TemplateActionType.ADD_TEMPLATE_TO_PROJECT_DASHBOARD,
                payload: response.data.templates,
            });

            if (response.data.status === 'Success') {
                statusCallback(false);
            }
        } catch (err) {
            console.log(err);
            statusCallback(true);
        }
    };
};

export const updateTemplate = (
    statusCallback: (status: boolean) => void,
    templateId: string,
    templateDetails: any,
    isInTemplateBuilderMode: true | false,
    projectUuid?: string | null,
    controlGlobalSettingsModal?: (state: boolean) => void
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            if (isInTemplateBuilderMode) {
                dispatch(invokeLoaderState(loaderTypes.GLOBAL_SETTINGS_MODAL));
            }

            let response = await api.put(`/template/update/${templateId}`, {
                templateDetails,
                projectUuid,
            });

            const templateBuilderObject = response.data.templates[0];
            const projectTemplateArray = response.data.templates;

            if (isInTemplateBuilderMode) {
                dispatch({
                    type: TemplateActionType.UPDATE_TEMPLATE,
                    payload: templateBuilderObject,
                });

                dispatch(disableLoaderState(loaderTypes.GLOBAL_SETTINGS_MODAL));

                if (controlGlobalSettingsModal) {
                    controlGlobalSettingsModal(false);
                }
            }

            dispatch({
                type: TemplateActionType.UPDATE_TEMPLATE_IN_PROJECT_DASHBOARD,
                payload: projectTemplateArray,
            });

            if (response.data.status === 'Success') {
                statusCallback(false);
            }
        } catch (err) {
            statusCallback(true);
        }
    };
};

export const deleteTemplate = (
    toggleNotif: () => string,
    updateNotif: (id: string, status: boolean) => void,
    templateId: string,
    projectUuid?: string | null
) => {
    return async (dispatch: Dispatch<TemplateAction>) => {
        const id = toggleNotif();

        try {
            let response = await api.delete(
                `/template/delete/${templateId}?projectId=${projectUuid}`
            );

            dispatch({
                type: TemplateActionType.DELETE_TEMPLATE_FROM_PROJECT_DASHBOARD,
                payload: response.data.templates,
            });

            if (response.data) {
                updateNotif(id, true);
            }
        } catch (err) {
            updateNotif(id, false);
        }
    };
};

//Template Builder - Specific actions:

export const queryTemplate = (templateId: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(invokeLoaderState(loaderTypes.MAIN_BUILD_TEMPLATE_VIEW));

            let response = await api.get(`/template/query/${templateId}`);

            dispatch({
                type: TemplateActionType.QUERY_TEMPLATE,
                payload: response.data.template,
            });

            if (response) {
                dispatch(
                    disableLoaderState(loaderTypes.MAIN_BUILD_TEMPLATE_VIEW)
                );
            }
        } catch (err) {
            dispatch(disableLoaderState(loaderTypes.MAIN_BUILD_TEMPLATE_VIEW));
        }
    };
};

export const clearTemplate = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({
            type: TemplateActionType.CLEAR_TEMPLATE,
            payload: {},
        });
    };
};

export const addToolbarBlock = (
    templateId: string,
    blockDetails: any,
    closeAddBlockModal: () => void
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            let response = await api.post(
                `/template/toolbar/add/${templateId}`,
                { blockDetails: blockDetails }
            );

            dispatch(invokeLoaderState(loaderTypes.ADD_BLOCK_MODAL));

            dispatch({
                type: TemplateActionType.ADD_TOOLBAR_BLOCK,
                payload: response.data.template,
            });

            if (response) {
                dispatch(disableLoaderState(loaderTypes.ADD_BLOCK_MODAL));
                closeAddBlockModal();
            }
        } catch (err) {
            console.log(err);
            dispatch(disableLoaderState(loaderTypes.ADD_BLOCK_MODAL));
        }
    };
};

export const deleteToolbarBlock = (
    templateId: string,
    blockId: string
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            let response = await api.delete(
                `/template/toolbar/delete/${templateId}?blockId=${blockId}`
            );

            dispatch({
                type: TemplateActionType.DELETE_TOOLBAR_BLOCK,
                payload: response.data.template,
            });
        } catch (err) {
            console.warn(err);
        }
    };
};

export const addEditingSurfaceBlock = (
    templateId: string,
    blockDetails: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            let response = await api.post(
                `/template/surface/add/${templateId}`,
                { blockDetails: blockDetails }
            );

            dispatch({
                type: TemplateActionType.ADD_EDITING_SURFACE_BLOCK,
                payload: response.data.template,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const deleteEditingSurfaceBlock = (
    templateId: string,
    blockId: string,
    weekId: string,
    columnPrefix: string | undefined
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            let response = await api.delete(
                `/template/surface/delete/${templateId}?blockId=${blockId}&weekId=${weekId}&columnPrefix=${columnPrefix}`
            );

            dispatch({
                type: TemplateActionType.DELETE_EDITING_SURFACE_BLOCK,
                payload: response.data.template,
            });
        } catch (err) {
            console.warn(err);
        }
    };
};

export const reorderEditingSurfaceColumn = (
    templateId: string,
    weekId: string | undefined,
    newColumnOrder: any[]
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await api.post(
                `/template/surface/reorder/${templateId}`,
                { reorderDetails: { weekId, newColumnOrder } }
            );

            dispatch({
                type: TemplateActionType.REORDER_EDITING_SURFACE_COLUMN,
                payload: response.data.template,
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const renameEditingSurfaceColumn = (
    templateId: string,
    weekId: string | undefined,
    oldColumnName: string,
    newColumnName: string
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // dispatch({
            //     type: TemplateActionType.RENAME_EDITING_SURFACE_COLUMN,
            //     payload: response.data.template,
            // });
        } catch (err) {
            console.error(err);
        }
    };
};
