import api from '../../api';
import { Dispatch } from 'redux';
import { TemplateAction } from './templateInterfaces';
import { TemplateActionType } from './action-types';

export const findTemplates = (
    projectTemplatesCallback: (status: boolean) => void,
    dashboardCallback: (status: boolean) => void,
    projectUuid: string | null
) => {
    return async (dispatch: Dispatch<TemplateAction>) => {
        try {
            let response = await api.get(`/template/project/${projectUuid}`);

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
    templateDetails: any
) => {
    return async (dispatch: Dispatch<TemplateAction>) => {
        try {
            let response = await api.put(`/template/update`, {
                templateDetails,
            });

            dispatch({
                type: TemplateActionType.USER_UPDATE_TEMPLATE,
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
