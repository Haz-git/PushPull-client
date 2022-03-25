import * as React from 'react';

//Redux:

//Components:

//Styles:
import styled from 'styled-components';

//Interfaces:
interface IComponentProps {
    id: string;
    responseType: string;
    inputQuestion: string;
}

export const InputItem = ({
    id,
    responseType,
    inputQuestion,
}: IComponentProps): JSX.Element => {
    return <div>InputItem</div>;
};
