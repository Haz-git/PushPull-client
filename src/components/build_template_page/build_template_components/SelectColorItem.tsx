import * as React from 'react';
import { forwardRef } from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
`;

const ColorSwatch = styled.div<IColorSwatch>`
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 0.3rem;
    background: ${({ color }) => color};
`;

//Interfaces:
interface IColorSwatch {
    color: string;
}

interface IComponentProps {
    value: string;
    label: string;
    description: string;
    color: string;
}

export const SelectColorItem = forwardRef(
    (
        { value, label, description, color, ...others }: IComponentProps,
        ref: any
    ): JSX.Element => {
        return (
            <MainContainer key={value} ref={ref} {...others}>
                <div>
                    <ColorSwatch color={color} />
                </div>
                <div>
                    <Text text={label} />
                </div>
            </MainContainer>
        );
    }
);
