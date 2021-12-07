import api from '../../api';
import { Dispatch } from 'redux';
import { TemplateAction } from './templateInterfaces';
import { TemplateActionType } from './action-types';

export const findTemplates = (
    statusCallback: (status: boolean) => void,
    projectUuid: string | null
) => {
    return async (dispatch: Dispatch<TemplateAction>) => {
        try {
            let response = await api.get(`/template/project/${projectUuid}`);

            console.log(response.data);

            dispatch({
                type: TemplateActionType.USER_FIND_TEMPLATE,
                payload: response.data.builder,
            });

            if (response?.data?.status === 'Success') {
                statusCallback(true);
            }
        } catch (err) {
            statusCallback(false);
        }
    };
};
