import * as React from 'react';

//Redux:

//Components:
import { LegendColorItem } from './LegendColorItem';

//Styles:

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
                key={item.id}
                label={item.label}
                colorHex={item.colorHex}
                description={item.description}
            />
        ));
    };

    return <>{shouldDisplayColors && <div>{composeColorItems()}</div>}</>;
};
