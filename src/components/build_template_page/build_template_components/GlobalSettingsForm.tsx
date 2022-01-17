import React from 'react';
import { useState } from 'react';

//Components:
import Text from '../../general_components/Text';
import { TextInput, Textarea, Select } from '@mantine/core';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 0rem 0.5rem;
    position: relative;
`;

const FormContainer = styled.div``;

const Spacer = styled.div`
    height: 1rem;
`;

export const GlobalSettingsForm = () => {
    const dispatch = useDispatch();
    //TODO: Rename userInputs to viewerInputs as it makes more sense.
    const {
        templateFileTitle,
        templateFileDesc,
        templateWeightUnit,
        templateLegend,
        templateUserInputs,
    } = useSelector((state: RootStateOrAny) => state?.template);

    //Error state:
    const [hasError, setHasError] = useState(false);

    //Modal Error State:
    const [templateState, setTemplateState] = useState({
        title: templateFileTitle,
        desc: templateFileDesc,
        unit: templateWeightUnit,
        legend: templateLegend,
        userInput: templateUserInputs,
    });

    const handleUserInput = (name: string, val: string | number | []): void => {
        setTemplateState({
            ...templateState,
            [name]: val,
        });
    };

    return (
        <MainContainer>
            <FormContainer>
                <TextInput
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 500,
                        },
                    }}
                    required
                    label="Template Title"
                    placeholder={templateState.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (hasError) {
                            setHasError(false);
                        }
                        handleUserInput('title', e.target.value);
                    }}
                    value={templateState.title}
                    error={hasError}
                />
                <Spacer />
                <Textarea
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 500,
                            height: '8rem',
                        },
                    }}
                    label="Template Description"
                    placeholder={templateState.desc}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleUserInput('desc', e.target.value);
                    }}
                    value={templateState.desc}
                />
                <Spacer />
                <Select
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 500,
                        },
                    }}
                    label="Template Measurement Unit"
                    placeholder="Choose a Category"
                    data={[
                        {
                            value: 'IMPERIAL',
                            label: 'Imperial System (Lbs)',
                        },
                        {
                            value: 'METRIC',
                            label: 'Metric System (Kg)',
                        },
                    ]}
                    value={templateState.unit}
                    onChange={(value: string) => {
                        handleUserInput('unit', value);
                    }}
                    required
                />
            </FormContainer>
        </MainContainer>
    );
};
