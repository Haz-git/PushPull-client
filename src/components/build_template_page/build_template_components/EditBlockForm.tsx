import * as React from 'react';
import { useMemo } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { toggleModal } from '../../../redux/modals/modalActions';
import { ModalActionTypes } from '../../../redux/modals/action-types';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import DividerLine from '../../general_components/DividerLine';
import { TextInput, Textarea, NumberInput, Select } from '@mantine/core';
import Text from '../../general_components/Text';

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
                <DividerLine
                    border="1px solid #d6d6d6"
                    margin="2rem 0rem 1rem 0rem"
                />
                <Text text="Linked Interactions" fontSize="1.5rem" />
                <Spacer />
                <Select
                    clearable
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
                    label="Color Legend"
                    placeholder="Link a color"
                    data={[{ value: 'Super Set 1', label: 'Super Set 1' }]}
                    required
                />
                <Spacer />
                <Select
                    clearable
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
                    label="Viewer Input"
                    placeholder="Link a viewer input"
                    data={[{ value: 'maxBench', label: 'Max Bench' }]}
                    required
                />
            </FormContainer>
            <ButtonContainer>
                <GeneralButton buttonLabel="Update Block" />
            </ButtonContainer>
        </MainContainer>
    );
};
