import api from '../../api';
import { Dispatch } from 'redux';
import { TemplateAction } from './templateInterfaces';
import { uiLoaderAction } from '../uiLoader/uiLoaderInterfaces';
import { TemplateActionType, ProjectTemplateActionType } from './action-types';
import { loaderTypes } from '../uiLoader/loader-types';

//Loader ui actions:
import {
    invokeLoaderState,
    disableLoaderState,
} from '../uiLoader/uiLoaderActions';
import { toggleModal } from '../modals/modalActions';
import { ModalActionTypes } from '../modals/action-types';

//Error Types:
import { ErrorType } from '../errors/action-types';
import { toggleErrorNotification } from '../errors/errorActions';

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
                type: ProjectTemplateActionType.FIND_TEMPLATE_IN_PROJECT_DASHBOARD,
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
                type: ProjectTemplateActionType.ADD_TEMPLATE_TO_PROJECT_DASHBOARD,
                payload: response.data.templates,
            });

            if (response.data.status === 'Success') {
                statusCallback(false);
            }
        } catch (err) {
            console.warn(err);
            statusCallback(true);
        }
    };
};

export const updateTemplate = (
    statusCallback: (status: boolean) => void,
    templateId: string,
    templateDetails: any,
    isInTemplateBuilderMode: true | false,
    isInProjectDashboard: true | false,
    projectUuid?: string | null,
    controlGlobalSettingsModal?: ((state: boolean) => void) | null,
    uiLoaderType?: loaderTypes | null
) => {
    return async (dispatch: Dispatch<any>) => {
        /***
         * CLEANME: This function manages update request for templates in both the project dashboard and within the template builder mode. Ideally, each operation should be abstracted to their own action creator. Half-a-year-ago Harry was crazy...
         *
         * Managed to debug annoying bug with the two isInTemplateBuilderMode and isInProjectDashboard flags, but this is pretty hacky and will need cleanup.
         */

        try {
            if (uiLoaderType) {
                dispatch(invokeLoaderState(uiLoaderType));
            }

            let response = await api.put(`/template/update/${templateId}`, {
                templateDetails,
                isInTemplateBuilderMode,
                isInProjectDashboard,
            });

            if (isInTemplateBuilderMode && !isInProjectDashboard) {
                //On global template modifications we want to update both the template in the template builder and the array in the project dashboard.
                dispatch({
                    type: TemplateActionType.UPDATE_TEMPLATE,
                    payload: response.data.template,
                });

                if (controlGlobalSettingsModal) {
                    controlGlobalSettingsModal(false);
                }
            }

            if (!isInProjectDashboard && isInTemplateBuilderMode) {
                dispatch({
                    type: ProjectTemplateActionType.UPDATE_TEMPLATE_IN_PROJECT_DASHBOARD,
                    payload: response.data.templates,
                });
            }

            if (uiLoaderType) {
                dispatch(disableLoaderState(uiLoaderType));
            }

            if (response.data.status === 'Success') {
                statusCallback(false);
            }
        } catch (err) {
            console.warn(err);
            statusCallback(true);
            if (uiLoaderType) {
                dispatch(disableLoaderState(uiLoaderType));
            }
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
            const response = await api.delete(
                `/template/delete/${templateId}?projectId=${projectUuid}`
            );

            dispatch({
                type: ProjectTemplateActionType.DELETE_TEMPLATE_FROM_PROJECT_DASHBOARD,
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

            const response = await api.get(`/template/query/${templateId}`);

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
            //TODO: Differentiate errors based on query Error VS Unauthorized Error.

            dispatch(
                toggleErrorNotification(ErrorType.queryTemplateError, {
                    message: 'Unable to query template',
                    openDuration: 0,
                })
            );

            dispatch(disableLoaderState(loaderTypes.MAIN_BUILD_TEMPLATE_VIEW));
        }
    };
};

export const clearTemplate = () => {
    return async (dispatch: Dispatch<TemplateAction>) => {
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
            dispatch(invokeLoaderState(loaderTypes.ADD_BLOCK_MODAL));

            const response = await api.post(
                `/template/toolbar/add/${templateId}`,
                { blockDetails: blockDetails }
            );

            dispatch({
                type: TemplateActionType.ADD_TOOLBAR_BLOCK,
                payload: response.data.template,
            });

            if (response) {
                dispatch(disableLoaderState(loaderTypes.ADD_BLOCK_MODAL));
                closeAddBlockModal();
            }
        } catch (err) {
            console.warn(err);
            dispatch(disableLoaderState(loaderTypes.ADD_BLOCK_MODAL));
        }
    };
};

export const updateToolbarBlock = (
    templateId: string,
    blockId: string,
    blockDetails: any
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(invokeLoaderState(loaderTypes.EDIT_BLOCK_MODAL));

            const response = await api.post(
                `/template/toolbar/update/${templateId}?blockId=${blockId}`,
                { blockDetails }
            );

            if (response) {
                dispatch({
                    type: TemplateActionType.UPDATE_TOOLBAR_BLOCK,
                    payload: response.data.template,
                });

                dispatch(disableLoaderState(loaderTypes.EDIT_BLOCK_MODAL));
                dispatch(toggleModal(ModalActionTypes.editBlock, 'CLOSE'));
            }
        } catch (err) {
            console.error(err);
        }
    };
};

export const deleteToolbarBlock = (
    templateId: string,
    blockId: string
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await api.delete(
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
            const response = await api.post(
                `/template/surface/add/${templateId}`,
                { blockDetails: blockDetails }
            );

            dispatch({
                type: TemplateActionType.ADD_EDITING_SURFACE_BLOCK,
                payload: response.data.template,
            });
        } catch (err) {
            console.warn(err);
        }
    };
};

export const updateEditingSurfaceBlock = (
    templateId: string,
    sheetId: string | null,
    blockId: string,
    columnPrefix: string | null,
    blockDetails: any
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const isMissingRequiredArguments =
                !templateId || !sheetId || !blockId || !blockDetails;

            if (isMissingRequiredArguments) {
                throw new Error('Missing one or more required arguments');
            }

            dispatch(invokeLoaderState(loaderTypes.EDIT_BLOCK_MODAL));

            const response = await api.post(
                `/template/surface/update/${templateId}?sheetId=${sheetId}&blockId=${blockId}&columnPrefix=${columnPrefix}`,
                { blockDetails }
            );

            if (response) {
                dispatch({
                    type: TemplateActionType.UPDATE_EDITING_SURFACE_BLOCK,
                    payload: response.data.template,
                });

                dispatch(disableLoaderState(loaderTypes.EDIT_BLOCK_MODAL));
                dispatch(toggleModal(ModalActionTypes.editBlock, 'CLOSE'));
            }
        } catch (err) {
            console.error(err);
        }
    };
};

export const deleteEditingSurfaceBlock = (
    templateId: string,
    blockId: string,
    sheetId: string | null,
    columnPrefix: string | undefined
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            if (!sheetId) {
                throw new Error('No SheetId');
            }

            const response = await api.delete(
                `/template/surface/delete/${templateId}?blockId=${blockId}&sheetId=${sheetId}&columnPrefix=${columnPrefix}`
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
    sheetId: string | undefined | null,
    newColumnOrder: any[]
): Function => {
    return async (dispatch: Dispatch<any>) => {
        if (!sheetId) {
            throw new Error('sheet Id was not defined');
        }
        try {
            const response = await api.post(
                `/template/surface/reorder-column/${templateId}`,
                { reorderDetails: { sheetId, newColumnOrder } }
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
    sheetId: string | null,
    oldColumnName: string,
    newColumnName: string
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            if (!sheetId) {
                throw new Error('SheetId not provided.');
            }

            const response = await api.post(
                `/template/surface/rename-column/${templateId}`,
                {
                    renameDetails: {
                        sheetId,
                        oldColumnName,
                        newColumnName,
                    },
                }
            );

            dispatch({
                type: TemplateActionType.RENAME_EDITING_SURFACE_COLUMN,
                payload: response.data.template,
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const addSheet = (templateId: string): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await api.post(
                `/template/surface/add-sheet/${templateId}`
            );

            dispatch({
                type: TemplateActionType.ADD_SHEET,
                payload: response.data.template,
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const updateSheet = (
    templateId: string,
    sheetId: string,
    updateObject: any
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await api.post(
                `/template/surface/update-sheet/${templateId}?sheetId=${sheetId}`,
                { ...updateObject }
            );

            dispatch({
                type: TemplateActionType.UPDATE_SHEET,
                payload: response.data.template,
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const deleteSheet = (templateId: string, sheetId: string): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await api.delete(
                `/template/surface/delete-sheet/${templateId}?sheetId=${sheetId}`
            );

            dispatch({
                type: TemplateActionType.DELETE_SHEET,
                payload: response.data.template,
            });
        } catch (err) {
            console.error(err);
        }
    };
};
