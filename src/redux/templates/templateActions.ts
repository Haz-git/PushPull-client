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
                type: TemplateActionType.USER_FIND_TEMPLATE,
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
                type: TemplateActionType.USER_ADD_TEMPLATE,
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
    projectUuid?: string | null
) => {
    return async (dispatch: Dispatch<TemplateAction>) => {
        try {
            let response = await api.put(`/template/update/${templateId}`, {
                templateDetails,
                projectUuid,
            });

            dispatch({
                type: TemplateActionType.USER_UPDATE_TEMPLATE,
                payload: response.data.templates,
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
                type: TemplateActionType.USER_DELETE_TEMPLATE,
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
            let response = await api.get(`/template/query/${templateId}`);

            dispatch(invokeLoaderState(loaderTypes.MAIN_BUILD_TEMPLATE_VIEW));

            dispatch({
                type: TemplateActionType.USER_QUERY_TEMPLATE,
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
            type: TemplateActionType.USER_CLEAR_TEMPLATE,
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
                type: TemplateActionType.USER_ADD_TOOLBAR_BLOCK,
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

            console.log(response);
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
                type: TemplateActionType.USER_ADD_EDITING_SURFACE_BLOCK,
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
    weekId: string
): Function => {
    return async (dispatch: Dispatch<any>) => {
        try {
            let response = await api.delete(
                `/template/surface/delete/${templateId}?blockId=${blockId}&weekId=${weekId}`
            );

            console.log(response);
        } catch (err) {
            console.warn(err);
        }
    };
};
