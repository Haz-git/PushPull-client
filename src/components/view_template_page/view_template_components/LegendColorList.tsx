import * as React from 'react';

//Redux:

//Components:

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
    return <>{shouldDisplayColors && <div>LegendColorItem</div>}</>;
};
