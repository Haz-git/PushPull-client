import * as React from 'react';
import { useEffect } from 'react';

//Components:
import { SetConfigurationField } from './SetConfigurationField';
import { v4 as uuid } from 'uuid';
import { useDebouncedValue } from '@mantine/hooks';

//Styles:

//Interfaces:

interface IComponentProps {
    isOpen: boolean;
    totalSets: string;
    configurationFieldValues: any;
    updateConfiguredSets: (
        operation: 'RESET' | 'UPDATE',
        setId: string,
        inputName: string,
        inputValue: string
    ) => void;
}

export const SetConfigurationMenu = ({
    isOpen,
    totalSets,
    updateConfiguredSets,
    configurationFieldValues,
}: IComponentProps): JSX.Element => {
    //Using debounced value here to delay rendering configuration fields to user. Not sure if correct usage here, but I would consider dynamically mapping new items (on user input) to the dom as expensive?
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

        return Object.values(configurationFieldValues).map((element: any) => (
            <SetConfigurationField
                updateConfiguredSets={updateConfiguredSets}
                fieldId={element.fieldId}
                key={element.fieldId}
                reps={element.reps || '0'}
                weightImperial={element.weightImperial || '0'}
                weightMetric={element.weightMetric || '0'}
            />
        ));
    };

    return <>{isOpen ? <>{renderConfigurationFields()}</> : null}</>;
};
