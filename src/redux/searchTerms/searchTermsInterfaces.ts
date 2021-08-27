import { SearchTermActionType } from './action-types';

interface updateSearchTerm {
    type: SearchTermActionType.USER_UPDATE_SEARCHTERM;
    payload?: any;
}

export type SearchTermAction = updateSearchTerm;
