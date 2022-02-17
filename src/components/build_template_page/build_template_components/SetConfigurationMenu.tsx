import * as React from 'react';

//Components:
import { SetConfigurationField } from './SetConfigurationField';
import { v4 as uuid } from 'uuid';
import { useDebouncedValue } from '@mantine/hooks';

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
    //Using debounced value here to delay rendering configuration fields to user. Not sure if correct usage here, but I would consider mapping new items to the dom as expensive?
    const [debouncedNumberOfSets] = useDebouncedValue(totalSets, 200, {
        leading: true,
    });

    const renderConfigurationFields = () => {
        const hasMissingRequirements =
            !Number(debouncedNumberOfSets) ||
            Number(debouncedNumberOfSets) === 0 ||
            Number(debouncedNumberOfSets) > 15;

        if (hasMissingRequirements) {
            return null;
        }

        return Array.from(
            Array(Number(debouncedNumberOfSets)),
            (element, index) => (
                <SetConfigurationField fieldId={index} key={uuid()} />
            )
        );
    };

    return <>{isOpen ? <>{renderConfigurationFields()}</> : null}</>;
};
