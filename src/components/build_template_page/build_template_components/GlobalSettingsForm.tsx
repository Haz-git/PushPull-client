import React from 'react';
import { useState } from 'react';

//Components:
import Text from '../../general_components/Text';
import { TextInput, Textarea, NumberInput } from '@mantine/core';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 0rem 0.5rem;
    position: relative;
`;

const FormContainer = styled.div``;

export const GlobalSettingsForm = () => {
    const dispatch = useDispatch();
    const {
        templateFileTitle,
        templateFileDesc,
        templateWeightUnit,
        templateLegend,
        templateUserInputs,
    } = useSelector((state: RootStateOrAny) => state?.template);

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
                {' '}
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
                    placeholder={templateFileTitle}
                    disabled={true}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //     if (hasError) setHasError(false);
                    //     handleUserInput('name', e.target.value);
                    // }}
                    // value={userInput.name}
                    // error={hasError}
                    // disabled={isCreatingNewProject}
                />
            </FormContainer>
        </MainContainer>
    );
};
