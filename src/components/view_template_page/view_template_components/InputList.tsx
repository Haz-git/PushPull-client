import * as React from 'react';

//Redux:

//Components:
import { InputItem } from './InputItem';

//Styles:

//Interfaces:

type InputItem = {
    id: string;
    ResponseType: string;
    InputQuestion: string;
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
                responseType={item.ResponseType}
                inputQuestion={item.InputQuestion}
            />
        ));
    };

    return <>{shouldDisplayInputs && <>{composeInputItems()}</>}</>;
};
