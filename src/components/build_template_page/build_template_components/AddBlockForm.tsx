import React from 'react';
import { useState, useMemo } from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import Text from '../../general_components/Text';
import DividerLine from '../../general_components/DividerLine';
import {
    TextInput,
    Textarea,
    NumberInput,
    Select,
    Checkbox,
} from '@mantine/core';
import { SelectColorItem } from './SelectColorItem';
import { SetConfigurationMenu } from './SetConfigurationMenu';
import { v4 as uuid } from 'uuid';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { addToolbarBlock } from '../../../redux/templates/templateActions';

//Styles:
import styled from 'styled-components';
import { AddBlockError } from './AddBlockError';

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

export const SetConfigurationContainer = styled.div`
    margin-top: 1rem;
`;

export const ButtonContainer = styled.div`
    margin: 2rem 0rem 1rem 0rem;
`;

export const ErrorSpacer = styled.div`
    height: 0.25rem;
`;

//Interfaces:

export enum ConfiguredSetOperation {
    Reset = 'Reset',
    Update = 'Update',
}

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

    const composedWeightUnit = useMemo((): string | undefined => {
        if (!template) {
            return;
        }

        return template.templateWeightUnit === 'METRIC' ? 'Kgs' : 'Lbs';
    }, [template.templateWeightUnit]);

    const composedColorSelectData = useMemo((): string[] => {
        //To make this work with Mantine Select, value and label must be provided.
        //We want the value to be the color id, in the case there are two of the same colors.
        if (!colorLegendSelectables) {
            return [];
        }

        return colorLegendSelectables.map((color: any) => ({
            value: color.id,
            label: color.label,
            description: color.description,
            color: color.colorHex,
        }));
    }, [template.templateLegend]);

    const composedViewerInputSelectData = useMemo((): string[] => {
        if (!viewerInputSelectables) {
            return [];
        }

        return viewerInputSelectables.map((question: any) => ({
            value: question.id,
            label: question.InputQuestion,
        }));
    }, [template.templateUserInputs]);

    //Set Configuration Menu State:
    const [isSetConfigurationMenuOpen, toggleSetConfigurationMenu] =
        useState(false);

    //Modal input state
    const [userInput, setUserInput] = useState({
        name: '',
        desc: '',
        sets: '0',
        configuredSets: {} as any,
        hasConfiguredSets: false,
        reps: '0',
        weightImperial: '0',
        weightMetric: '0',
        linkedColor: '',
        linkedViewerInput: '',
    });

    //Error state:
    const [hasError, setHasError] = useState(false);
    const [isNameLengthLimitExceeded, setIsNameLengthLimitExceeded] =
        useState(false);
    const [isCustomSetLimitExceeded, setIsCustomSetLimitExceeded] =
        useState(false);

    const updateConfiguredSets = (
        operation: ConfiguredSetOperation,
        setId: string,
        inputName: string,
        inputValue: string
    ): void => {
        switch (operation) {
            case ConfiguredSetOperation.Reset:
                setUserInput({
                    ...userInput,
                    hasConfiguredSets: false,
                    configuredSets: {},
                });
                break;
            case ConfiguredSetOperation.Update:
                //This looks sloppy-- but I want to update both weightImperial and weightMetric at the same time. In the SetConfigurationField, I've try to dispatch two operations but one seems to be ignored. Will work on this more later.

                if (inputName === 'weightImperial') {
                    setUserInput({
                        ...userInput,
                        hasConfiguredSets: true,
                        configuredSets: {
                            ...userInput.configuredSets,
                            [setId]: {
                                ...userInput.configuredSets[setId],
                                [inputName]: inputValue,
                                ['weightMetric']: `${(
                                    Number(inputValue) / 2.205
                                ).toFixed(1)}`,
                            },
                        },
                    });

                    break;
                }

                if (inputName === 'weightMetric') {
                    setUserInput({
                        ...userInput,
                        hasConfiguredSets: true,
                        configuredSets: {
                            ...userInput.configuredSets,
                            [setId]: {
                                ...userInput.configuredSets[setId],
                                [inputName]: inputValue,
                                ['weightImperial']: `${(
                                    Number(inputValue) * 2.205
                                ).toFixed(1)}`,
                            },
                        },
                    });

                    break;
                }

                setUserInput({
                    ...userInput,
                    hasConfiguredSets: true,
                    configuredSets: {
                        ...userInput.configuredSets,
                        [setId]: {
                            ...userInput.configuredSets[setId],
                            [inputName]: inputValue,
                        },
                    },
                });

                break;
            default:
                throw new Error('No operation was supplied..');
        }
    };

    const generateCustomSetObjects = (setNumber: number): any => {
        //This should generate an object with setNumber amount of nested objects with default values for:
        // reps, weightMetric, weightImperial.

        //fieldKey is generated via uuid() to prevent unique key error during render in BlockTypeExerciseDataCollapse.

        const setsObject = {} as any;

        for (let i = 1; i < setNumber + 1; ++i) {
            setsObject[i] = {
                fieldId: String(i),
                reps: '0',
                weightImperial: '0',
                weightMetric: '0',
                fieldKey: uuid(),
            };
        }
        return setsObject;
    };

    const resetRepsAndWeight = (): void => {
        //Reset reps and weight on customized sets:
        setUserInput({
            ...userInput,
            reps: '0',
            weightImperial: '0',
            weightMetric: '0',
        });
    };

    const handleCustomSetRequest = (): void => {
        if (Number(userInput.sets) <= 0 || Number(userInput.sets) > 15) {
            return setIsCustomSetLimitExceeded(true);
        }

        if (isSetConfigurationMenuOpen) {
            //reset configured sets on toggle off
            setUserInput({
                ...userInput,
                hasConfiguredSets: false,
                configuredSets: {},
            });

            return toggleSetConfigurationMenu(false);
        }

        resetRepsAndWeight();

        //We've checked sets !== 0, if we're toggling on we generate the set items:
        const defaultSetObjects = generateCustomSetObjects(
            Number(userInput.sets)
        );
        setUserInput({
            ...userInput,
            hasConfiguredSets: true,
            configuredSets: defaultSetObjects,
        });

        return toggleSetConfigurationMenu(true);
    };

    const hasBlockName = (): boolean => {
        return userInput.name !== '';
    };

    const handleUserInput = (name: string, val: string | number): void => {
        setUserInput({
            ...userInput,
            [name]: val,
        });
    };

    const composeInputWeight = (weight: number): void => {
        if (composedWeightUnit === 'Kgs') {
            return setUserInput({
                ...userInput,
                weightImperial: (weight * 2.205).toFixed(1),
                weightMetric: String(weight),
            });
        }

        return setUserInput({
            ...userInput,
            weightImperial: String(weight),
            weightMetric: (weight / 2.205).toFixed(1),
        });
    };

    const determineUnitValue = (): number => {
        return composedWeightUnit === 'Kgs'
            ? Number(userInput.weightMetric)
            : Number(userInput.weightImperial);
    };

    const dispatchBlock = () => {
        if (!hasBlockName() || isNameLengthLimitExceeded) {
            return setHasError(true);
        }

        return dispatch(
            addToolbarBlock(
                template.id,
                { blockDetails: userInput },
                closeModal
            )
        );
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
                        if (hasError) {
                            setHasError(false);
                        }

                        setIsNameLengthLimitExceeded(
                            e.target.value.length > 50
                        );

                        if (e.target.value.length > 50) {
                            setIsNameLengthLimitExceeded(true);
                        }

                        handleUserInput('name', e.target.value);
                    }}
                    value={userInput.name}
                    error={hasError}
                />
                <AddBlockError
                    errorText="Block name must be 50 characters or less."
                    shouldShowError={isNameLengthLimitExceeded}
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
                />
                <Spacer />
                <FlexWrapper>
                    <NumberInput
                        value={Number(userInput.sets)}
                        label="Total Sets"
                        min={0}
                        max={isSetConfigurationMenuOpen ? 15 : 99}
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
                        onChange={(val: number) => {
                            if (isCustomSetLimitExceeded) {
                                //Reset error warning.
                                setIsCustomSetLimitExceeded(false);
                            }

                            if (isSetConfigurationMenuOpen) {
                                //If this menu is already open, and the user changes the set, we close menu and reset (checking will generate another set object).
                                updateConfiguredSets(
                                    ConfiguredSetOperation.Reset,
                                    '',
                                    '',
                                    ''
                                );
                                toggleSetConfigurationMenu(false);
                            }

                            handleUserInput('sets', String(val));
                        }}
                    />
                    <NumberInput
                        value={Number(userInput.reps)}
                        label="Reps Per Set"
                        min={0}
                        max={99}
                        required={!isSetConfigurationMenuOpen}
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
                        disabled={isSetConfigurationMenuOpen}
                    />
                    <NumberInput
                        label={`Weight (${composedWeightUnit})`}
                        required={!isSetConfigurationMenuOpen}
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
                        disabled={isSetConfigurationMenuOpen}
                    />
                </FlexWrapper>
                <SetConfigurationContainer>
                    <Checkbox
                        color="orange"
                        checked={isSetConfigurationMenuOpen}
                        label="Configure Sets Separately"
                        onChange={handleCustomSetRequest}
                        styles={{
                            label: {
                                color: 'rgba(0, 0, 34, .7)',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 700,
                                marginBottom: '.25rem',
                            },
                        }}
                    />
                    <Spacer />
                    <AddBlockError
                        shouldShowError={isCustomSetLimitExceeded}
                        errorText="You must customize atleast 1 set, or up to 15 total sets."
                    />
                    <SetConfigurationMenu
                        isOpen={isSetConfigurationMenuOpen}
                        totalSets={userInput.sets}
                        configurationFieldValues={userInput.configuredSets}
                        updateConfiguredSets={updateConfiguredSets}
                    />
                </SetConfigurationContainer>
                <DividerLine
                    border="1px solid #d6d6d6"
                    margin="1rem 0rem 1rem 0rem"
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
                    value={userInput.linkedViewerInput}
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
                    label="Viewer Input"
                    placeholder="Link a viewer input"
                    data={composedViewerInputSelectData}
                    filter={(value: string, item: any) =>
                        item.label
                            .toLowerCase()
                            .includes(value.toLowerCase().trim())
                    }
                    nothingFound="No Viewer Input Found"
                    maxDropdownHeight={250}
                    onChange={(value: string) =>
                        setUserInput({
                            ...userInput,
                            linkedViewerInput: value,
                        })
                    }
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
