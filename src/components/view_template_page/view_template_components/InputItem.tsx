import * as React from 'react';

//Redux:

//Components:
import { NumberInput } from '@mantine/core';

//Styles:
import styled from 'styled-components';

const InputMainContainer = styled.div``;

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
    return (
        <InputMainContainer key={id}>
            <NumberInput
                label={inputQuestion}
                placeholder={responseType}
                styles={{
                    root: {
                        maxWidth: '40rem',
                        background: '#ececec',
                        padding: '.5rem .5rem',
                        borderRadius: '.3rem',
                        marginBottom: '.75rem',
                    },
                    label: {
                        color: 'rgba(0, 0, 34, 1)',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 700,
                    },
                    input: {
                        color: 'rgba(0, 0, 34, 1)',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '.95rem',
                        fontWeight: 700,
                    },
                }}
            />
        </InputMainContainer>
    );
};
