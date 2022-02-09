import * as React from 'react';
import { useMemo } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { toggleModal } from '../../../redux/modals/modalActions';
import { ModalActionTypes } from '../../../redux/modals/action-types';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import { TextInput, Textarea, NumberInput } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import {
    MainContainer,
    FormContainer,
    Spacer,
    FlexWrapper,
    ButtonContainer,
} from './AddBlockForm';

//Interfaces:

export const EditBlockForm = () => {
    const dispatch = useDispatch();
    const template = useSelector((state: RootStateOrAny) => state?.template);

    const composeWeightUnit = (): string | undefined => {
        if (!template) {
            return;
        }
        return template?.templateWeightUnit === 'METRIC' ? 'Kgs' : 'Lbs';
    };

    const composedWeightUnit = useMemo(composeWeightUnit, [
        template.templateWeightUnit,
    ]);

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
                    label="Block Name"
                    placeholder={'Name your exercise'}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //     if (hasError) setHasError(false);
                    //     handleUserInput('name', e.target.value);
                    // }}
                    // value={userInput.name}
                    // error={hasError}
                    // disabled={isCreatingNewProject}
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
                    label="Block Description"
                    placeholder="Block name and description can be updated at any time"
                    // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    //     handleUserInput('desc', e.target.value);
                    // }}
                    // value={userInput.desc}
                    // disabled={isCreatingNewProject}
                />
                <Spacer />
                <FlexWrapper>
                    <NumberInput
                        // value={Number(userInput.sets)}
                        label="Total Sets"
                        min={0}
                        max={99}
                        required
                        styles={{
                            root: {
                                maxWidth: '40rem',
                            },
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
                                fontSize: '1.05rem',
                                fontWeight: 700,
                            },
                        }}
                        // onChange={(val: number) =>
                        //     handleUserInput('sets', String(val))
                        // }
                    />
                    <NumberInput
                        // value={Number(userInput.reps)}
                        label="Reps Per Set"
                        min={0}
                        max={99}
                        required
                        styles={{
                            root: {
                                maxWidth: '40rem',
                            },
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
                                fontSize: '1.05rem',
                                fontWeight: 700,
                            },
                        }}
                        // onChange={(val: number) =>
                        //     handleUserInput('reps', String(val))
                        // }
                    />
                    <NumberInput
                        // value={Number(userInput.reps)}
                        label={`Weight (${composedWeightUnit})`}
                        min={0}
                        max={99}
                        required
                        styles={{
                            root: {
                                maxWidth: '40rem',
                            },
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
                                fontSize: '1.05rem',
                                fontWeight: 700,
                            },
                        }}
                        // onChange={(val: number) =>
                        //     handleUserInput('reps', String(val))
                        // }
                    />
                </FlexWrapper>
            </FormContainer>
            <ButtonContainer>
                <GeneralButton buttonLabel="Update Block" />
            </ButtonContainer>
        </MainContainer>
    );
};
