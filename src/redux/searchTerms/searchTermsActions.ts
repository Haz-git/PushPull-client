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
                //If the user has existing searchTerms.
                modifiedSearchTerms = [
                    ...searchTerms.searchTerms.recentSearchTerms,
                ];

                if (modifiedSearchTerms.indexOf(searchTerm) === -1) {
                    //We only add the searchTerm if it doesn't exist already.
                    if (modifiedSearchTerms.length >= 3)
                        modifiedSearchTerms.shift();

                    modifiedSearchTerms.push(searchTerm);
                }
            } else {
                //If the user doesn't have existing searchTerms.
                modifiedSearchTerms = [searchTerm];
            }
        } else {
            if (searchTerms.searchTerms.recentSearchTerms) {
                modifiedSearchTerms = searchTerms.searchTerms.recentSearchTerms;
            } else {
                modifiedSearchTerms = [];
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
