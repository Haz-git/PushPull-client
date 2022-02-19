import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import { ErrorSpacer } from './AddBlockForm';

//Interfaces:
interface IComponentProps {
    errorText?: string;
    shouldShowError: boolean;
}

export const AddBlockError = ({
    errorText,
    shouldShowError,
}: IComponentProps): JSX.Element => {
    return (
        <>
            {shouldShowError ? (
                <>
                    <ErrorSpacer />
                    <Text
                        text={errorText}
                        textColor="#AF1432"
                        fontSize=".85rem"
                    />
                </>
            ) : null}
        </>
    );
};
