import * as React from 'react';

//Redux:

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div<IMainContainerProps>`
    width: 100%;
    background: #ffffff;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px, rgba(0, 0, 0, 0.23) 0px 2px 4px;
    margin-bottom: 0.5rem;
    border: ${({ isSelected }) =>
        isSelected ? '1px solid #e07133' : '1px solid transparent'};
`;

const ColorSwatchContainer = styled.div`
    height: 100%;
    padding: 0.5rem 0.5rem;
`;

export const ColorSwatch = styled.div<IColorSwatch>`
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 0.3rem;
    background: ${({ color }) => color};
`;

const LabelContainer = styled.div`
    height: 100%;
    max-height: 5rem;
    border-left: 1px solid #d6d6d6;
    padding: 0.5rem 0.5rem;
    overflow-y: scroll;
    width: 100%;
`;

//Interfaces:

interface IMainContainerProps {
    isSelected: boolean;
}

export interface IColorSwatch {
    color: string;
}

interface IComponentProps {
    id: string;
    label: string;
    colorHex: string;
    description?: string;
    isSelected: boolean;
    onSelectColor: (colorId: string) => void;
}

export const ColorSelectables = ({
    id,
    label,
    colorHex,
    description,
    isSelected = false,
    onSelectColor,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer
            isSelected={isSelected}
            onClick={() => onSelectColor(id)}
        >
            <ColorSwatchContainer>
                <ColorSwatch color={colorHex} />
            </ColorSwatchContainer>
            <LabelContainer>
                <Text text={label} subText={true} />
            </LabelContainer>
        </MainContainer>
    );
};
