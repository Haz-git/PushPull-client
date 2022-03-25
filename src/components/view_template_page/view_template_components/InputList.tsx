import * as React from 'react';

//Redux:

//Components:
import { InputItem } from './InputItem';

//Styles:

//Interfaces:

type InputItem = {
    id: string;
    responseType: string;
    inputQuestion: string;
};

interface IComponentProps {
    shouldDisplayInputs: boolean;
    inputArray: InputItem[];
}

export const InputList = ({
    shouldDisplayInputs,
    inputArray,
}: IComponentProps): JSX.Element => {
    const composeInputItems = (): JSX.Element[] => {
        return inputArray?.map((item) => (
            <InputItem
                id={item.id}
                responseType={item.responseType}
                inputQuestion={item.inputQuestion}
            />
        ));
    };

    return <>{shouldDisplayInputs && <>{composeInputItems()}</>}</>;
};
