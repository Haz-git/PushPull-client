import * as React from 'react';

//Components:
import { NumberInput } from '@mantine/core';
import Text from '../../general_components/Text';

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
}

export const SetConfigurationField = ({
    fieldId,
}: IComponentProps): JSX.Element => {
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
                    text={`${fieldId + 1}`}
                    fontSize="1.5rem"
                    fontWeight="800"
                    mainText={true}
                />
            </SetContainer>
            <NumberInput
                // value={Number(userInput.reps)}
                label={`Reps`}
                min={0}
                max={99}
                // required={!isSetConfigurationMenuOpen}
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
                // onChange={(val: number) => handleUserInput('reps', String(val))}
                // disabled={isSetConfigurationMenuOpen}
            />
            <NumberInput
                // value={Number(userInput.reps)}
                label={`Weight`}
                min={0}
                max={99}
                // required={!isSetConfigurationMenuOpen}
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
                // onChange={(val: number) => handleUserInput('reps', String(val))}
                // disabled={isSetConfigurationMenuOpen}
            />
        </MainContainer>
    );
};
