import { Dispatch } from 'redux';
import { SearchTermAction } from './searchTermsInterfaces';
import { SearchTermActionType } from './action-types';

interface SearchTermState {
    searchTerms: any;
}

export const updateSearchTerm = (searchTerm: string) => {
    return async (
        dispatch: Dispatch<SearchTermAction>,
        getState: () => SearchTermState
    ) => {
        const { searchTerms } = getState();

        console.log(searchTerms);

        let modifiedSearchTerms;

        if (
            searchTerms.searchTerms !== undefined &&
            searchTerms.searchTerms !== null
        ) {
            modifiedSearchTerms = [...searchTerms.searchTerms];

            if (modifiedSearchTerms.length >= 5) modifiedSearchTerms.shift();

            modifiedSearchTerms.push(searchTerm);
        } else {
            modifiedSearchTerms = [searchTerm];
        }

        console.log(modifiedSearchTerms);

        dispatch({
            type: SearchTermActionType.USER_UPDATE_SEARCHTERM,
            payload: modifiedSearchTerms,
        });
    };
};
