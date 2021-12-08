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

            if (response.data.templates.length > 0) {
                //If templates are 0, dispatch will throw not iterable error. We will not dispatch in this case.
                dispatch({
                    type: TemplateActionType.USER_FIND_TEMPLATE,
                    payload: response.data.builder,
                });
            }

            if (response.data.status === 'Success') {
                statusCallback(true);
            }
        } catch (err) {
            console.log(err);
            statusCallback(false);
        }
    };
};
