import * as React from 'react';
import { useState, useMemo } from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import { NumberInput } from '@mantine/core';
import Text from '../../general_components/Text';
import { useClickOutside } from '@mantine/hooks';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr;
    column-gap: 1rem;
    align-items: flex-end;
    justify-content: flex-start;
    background: #ececec;
    padding: 0.25rem 0.5rem 0.5rem 0.5rem;
    margin-top: 0.5rem;
    border-radius: 0.3rem;
`;

const SetContainer = styled.div`
    display: block;
    text-align: center;
    padding: 0.5rem 0.5rem;
    background: #ffffff;
    margin: 0 0.1rem;
    border-radius: 0.3rem;
    vertical-align: middle;
`;

const InputFieldsContainer = styled.div``;

//Interfaces:
interface IComponentProps {
    fieldId: number;
    reps: string;
    weightImperial: string;
    weightMetric: string;
    updateConfiguredSets: (
        operation: 'RESET' | 'UPDATE',
        setId: string,
        inputName: string,
        inputValue: string
    ) => void;
}

export const SetConfigurationField = ({
    fieldId,
    reps,
    weightImperial,
    weightMetric,
    updateConfiguredSets,
}: IComponentProps): JSX.Element => {
    const template = useSelector((state: RootStateOrAny) => state?.template);

    const composedWeightUnit = useMemo((): string | undefined => {
        if (!template) {
            return;
        }

        return template.templateWeightUnit === 'METRIC' ? 'Kgs' : 'Lbs';
    }, [template.templateWeightUnit]);

    const handleUserInput = (name: string, value: string | number): void => {
        updateConfiguredSets('UPDATE', String(fieldId), name, String(value));
    };

    const determineUnitValue = (): number => {
        return composedWeightUnit === 'Kgs'
            ? Number(weightMetric)
            : Number(weightImperial);
    };

    const handleWeightInput = (weight: number): void => {
        if (composedWeightUnit === 'Kgs') {
            return updateConfiguredSets(
                'UPDATE',
                String(fieldId),
                'weightMetric',
                String(weight)
            );
        }

        return updateConfiguredSets(
            'UPDATE',
            String(fieldId),
            'weightImperial',
            String(weight)
        );
    };

    return (
        <MainContainer>
            <SetContainer>
                <Text
                    text={`Set`}
                    fontSize=".85rem"
                    fontWeight="800"
                    subText={true}
                />
                <Text
                    text={`${fieldId}`}
                    fontSize="1.5rem"
                    fontWeight="800"
                    mainText={true}
                />
            </SetContainer>
            <NumberInput
                value={Number(reps)}
                label={`Reps`}
                min={0}
                max={99}
                styles={{
                    root: {
                        maxWidth: '40rem',
                    },
                    label: {
                        color: 'rgba(0, 0, 34, .7)',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '.85rem',
                        fontWeight: 700,
                        marginBottom: '.25rem',
                    },
                    input: {
                        color: 'rgba(0, 0, 34, 1)',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '.95rem',
                        fontWeight: 700,
                    },
                }}
                onChange={(val: number) => handleUserInput('reps', String(val))}
            />
            <NumberInput
                label={`Weight (${composedWeightUnit})`}
                value={determineUnitValue()}
                min={0}
                max={9999}
                styles={{
                    root: {
                        maxWidth: '40rem',
                    },
                    label: {
                        color: 'rgba(0, 0, 34, .7)',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '.85',
                        fontWeight: 700,
                        marginBottom: '.25rem',
                    },
                    input: {
                        color: 'rgba(0, 0, 34, 1)',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '.95rem',
                        fontWeight: 700,
                    },
                }}
                onChange={(weight: number) => handleWeightInput(weight)}
            />
        </MainContainer>
    );
};
