import { ErrorType } from './action-types';

// When error notification displays, we want the redirection link to push the user back to the previous page... probably something like history.push('xxxx')

export type ErrorProps = {
    errorMessage: string;
    redirectionLink: string;
    openDuration: number;
};

interface DisplayError {
    type: ErrorType;
    payload: {
        hasError: boolean;
        errorProps: ErrorProps;
    };
}

export type ErrorAction = DisplayError;
