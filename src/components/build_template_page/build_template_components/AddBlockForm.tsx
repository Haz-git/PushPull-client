import React from 'react';
import { useState, useMemo } from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import Text from '../../general_components/Text';
import DividerLine from '../../general_components/DividerLine';
import { TextInput, Textarea, NumberInput, Select } from '@mantine/core';
import { SelectColorItem } from './SelectColorItem';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { addToolbarBlock } from '../../../redux/templates/templateActions';

//Styles:
import styled from 'styled-components';

export const MainContainer = styled.div`
    padding: 0rem 0.5rem;
    position: relative;
`;

export const FormContainer = styled.div``;

export const Spacer = styled.div`
    height: 1rem;
`;

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
`;

export const ButtonContainer = styled.div`
    margin: 2rem 0rem 1rem 0rem;
`;

//Interfaces:

interface IComponentProps {
    closeModal: () => void;
}

const AddBlockForm = ({ closeModal }: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const template = useSelector((state: RootStateOrAny) => state?.template);
    const colorLegendSelectables = useSelector(
        (state: RootStateOrAny) => state?.template?.templateLegend
    );
    const viewerInputSelectables = useSelector(
        (state: RootStateOrAny) => state?.template?.templateUserInputs
    );

    const composeColorLegendSelectData = (): string[] => {
        //To make this work with Mantine Select, value and label must be provided.
        //We want the value to be the color id, in the case there are two of the same colors.
        if (!colorLegendSelectables) {
            return [];
        }

        let selectDataArray: any[] = [];

        for (let color of colorLegendSelectables) {
            selectDataArray = [
                ...selectDataArray,
                {
                    value: color.id,
                    label: color.label,
                    description: color.description,
                    color: color.colorHex,
                },
            ];
        }

        return selectDataArray;
    };

    const composeWeightUnit = (): string | undefined => {
        if (!template) {
            return;
        }
        return template?.templateWeightUnit === 'METRIC' ? 'Kgs' : 'Lbs';
    };

    const composedWeightUnit = useMemo(composeWeightUnit, [
        template.templateWeightUnit,
    ]);

    const composedColorSelectData = useMemo(composeColorLegendSelectData, [
        template.templateLegend,
    ]);

    //Modal input state
    const [userInput, setUserInput] = useState({
        name: '',
        desc: '',
        sets: '0',
        reps: '0',
        weightImperial: '0',
        weightMetric: '0',
        linkedColor: '',
        linkedViewerInput: '',
    });

    //Error state:
    const [hasError, setHasError] = useState(false);

    const hasBlockName = () => {
        return userInput.name !== '';
    };

    const handleUserInput = (name: string, val: string | number) => {
        setUserInput({
            ...userInput,
            [name]: val,
        });
    };

    const composeInputWeight = (weight: number): void => {
        if (composeWeightUnit() === 'Kgs') {
            return setUserInput({
                ...userInput,
                weightImperial: String(weight * 2.205),
                weightMetric: String(weight),
            });
        }

        return setUserInput({
            ...userInput,
            weightImperial: String(weight),
            weightMetric: String(weight / 2.205),
        });
    };

    const determineUnitValue = () => {
        return composeWeightUnit() === 'Kgs'
            ? Number(userInput.weightMetric)
            : Number(userInput.weightImperial);
    };

    const dispatchBlock = () => {
        if (hasBlockName()) {
            return dispatch(
                addToolbarBlock(
                    template.id,
                    { blockDetails: userInput },
                    closeModal
                )
            );
        }

        return setHasError(true);
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
                    label="Block Name"
                    placeholder={'Name your exercise'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (hasError) setHasError(false);
                        handleUserInput('name', e.target.value);
                    }}
                    value={userInput.name}
                    error={hasError}
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
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleUserInput('desc', e.target.value);
                    }}
                    value={userInput.desc}
                    // disabled={isCreatingNewProject}
                />
                <Spacer />
                <FlexWrapper>
                    <NumberInput
                        value={Number(userInput.sets)}
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
                        onChange={(val: number) =>
                            handleUserInput('sets', String(val))
                        }
                    />
                    <NumberInput
                        value={Number(userInput.reps)}
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
                        onChange={(val: number) =>
                            handleUserInput('reps', String(val))
                        }
                    />
                    <NumberInput
                        label={`Weight (${composedWeightUnit})`}
                        value={determineUnitValue()}
                        min={0}
                        max={9999}
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
                        onChange={(weight: number) =>
                            composeInputWeight(weight)
                        }
                    />
                </FlexWrapper>
                <DividerLine
                    border="1px solid #d6d6d6"
                    margin="2rem 0rem 1rem 0rem"
                />
                <Text text="Linked Interactions" fontSize="1.5rem" />
                <Spacer />
                <Select
                    value={userInput.linkedColor}
                    searchable
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
                    itemComponent={SelectColorItem}
                    label="Color Legend"
                    placeholder="Link a color"
                    data={composedColorSelectData}
                    filter={(value: string, item: any) =>
                        item.label
                            .toLowerCase()
                            .includes(value.toLowerCase().trim())
                    }
                    nothingFound="No color found"
                    required
                    maxDropdownHeight={250}
                    onChange={(value: string) =>
                        setUserInput({
                            ...userInput,
                            linkedColor: value,
                        })
                    }
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
                <GeneralButton
                    buttonLabel="Add Block"
                    onClick={dispatchBlock}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default AddBlockForm;
