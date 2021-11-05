import userfrontApi from '../../api/userfrontApi';
import { Dispatch } from 'redux';
import { ProfileAction } from './profileInterfaces';
import { ProfileActionType } from './action-types';

export const findUserProfile = (
    statusCallback: (status: boolean) => void,
    userName: string
) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        let response = await userfrontApi.post(`/v0/users/find`, {
            filters: {
                conjunction: 'and',
                filterGroups: [
                    {
                        conjunction: 'and',
                        filters: [
                            {
                                attr: 'name',
                                type: 'string',
                                comparison: 'contains',
                                value: `${userName}`,
                            },
                        ],
                    },
                ],
            },
        });

        console.log(response);
    };
};
