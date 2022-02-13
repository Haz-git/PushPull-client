import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import { ErrorSpacer } from './AddBlockForm';

export const NameLengthExceededError = () => {
    return (
        <>
            <ErrorSpacer />
            <Text
                text="Block name must be 50 characters or less."
                textColor="#AF1432"
                fontSize=".85rem"
            />
        </>
    );
};
