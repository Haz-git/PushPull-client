import * as React from 'react';

//Redux:

//Components:
import { LegendColorItem } from './LegendColorItem';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

export const AbsentItemContainer = styled.div`
    padding: 1rem 1rem;
    border-radius: 0.3rem;
    background-color: #ececec;
    text-align: center;
`;

//Interfaces:

type ColorItem = {
    id: string;
    label: string;
    colorHex: string;
    description: string;
};

interface IComponentProps {
    shouldDisplayColors: boolean;
    legendColors: ColorItem[];
}

export const LegendColorList = ({
    shouldDisplayColors,
    legendColors,
}: IComponentProps): JSX.Element => {
    const composeColorItems = (): JSX.Element[] => {
        return legendColors?.map((item) => (
            <LegendColorItem
                id={item.id}
                label={item.label}
                colorHex={item.colorHex}
                description={item.description}
            />
        ));
    };

    return (
        <>
            {shouldDisplayColors ? (
                <div>{composeColorItems()}</div>
            ) : (
                <AbsentItemContainer>
                    <Text text="No Colors Available" subText={true} />
                </AbsentItemContainer>
            )}
        </>
    );
};
