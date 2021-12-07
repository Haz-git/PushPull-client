import api from '../../api';
import { Dispatch } from 'redux';
import { TemplateAction } from './templateInterfaces';
import { TemplateActionType } from './action-types';

export const findTemplates = (
    statusCallback: (status: boolean) => void,
    toggleNotif: () => string,
    updateNotif: (id: string, status: boolean) => void
) => {
    return async (dispatch: Dispatch<TemplateAction>) => {
        const id = toggleNotif();

        try {
            let response = await api.get(`/builder/user`);

            dispatch({
                type: TemplateActionType.USER_FIND_TEMPLATE,
                payload: response.data.builder,
            });

            if (response.data) {
                statusCallback(true);
                updateNotif(id, true);
            }
        } catch (err) {
            statusCallback(false);
            updateNotif(id, false);
        }
    };
};
