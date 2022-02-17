import * as React from 'react';

//Components:
import { SetConfigurationField } from './SetConfigurationField';
import { v4 as uuid } from 'uuid';

//Styles:

//Interfaces:

interface IComponentProps {
    isOpen: boolean;
    totalSets: string;
}

export const SetConfigurationMenu = ({
    isOpen,
    totalSets,
}: IComponentProps): JSX.Element => {
    const renderConfigurationFields = () => {
        if (!totalSets || Number(totalSets) === 0) {
            return null;
        }

        return Array.from(Array(Number(totalSets)), (element, index) => (
            <SetConfigurationField fieldId={index} key={uuid()} />
        ));
    };

    return <>{isOpen ? <>{renderConfigurationFields()}</> : null}</>;
};
