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

        let modifiedSearchTerms;

        if (searchTerm !== '') {
            if (
                searchTerms.searchTerms.recentSearchTerms !== undefined &&
                searchTerms.searchTerms.recentSearchTerms !== null
            ) {
                modifiedSearchTerms = [
                    ...searchTerms.searchTerms.recentSearchTerms,
                ];

                if (modifiedSearchTerms.length >= 5)
                    modifiedSearchTerms.shift();

                modifiedSearchTerms.push(searchTerm);
            } else {
                modifiedSearchTerms = [searchTerm];
            }
        }

        dispatch({
            type: SearchTermActionType.USER_UPDATE_SEARCHTERM,
            payload: {
                currSearchTerm: searchTerm,
                recentSearchTerms: modifiedSearchTerms,
            },
        });
    };
};
