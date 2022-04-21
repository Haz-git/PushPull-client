import * as React from 'react';
import { useMemo, useState } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
    updateEditingSurfaceBlock,
    updateToolbarBlock,
} from '../../../redux/templates/templateActions';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import DividerLine from '../../general_components/DividerLine';
import {
    TextInput,
    Textarea,
    NumberInput,
    Select,
    Checkbox,
} from '@mantine/core';
import Text from '../../general_components/Text';
import { SelectColorItem } from './SelectColorItem';
import { AddBlockError } from './AddBlockError';
import { ConfiguredSetOperation } from './AddBlockForm';
import { SetConfigurationMenu } from './SetConfigurationMenu';
import useQuery from '../../../utils/hooks/useQuery';
import { UITimeField } from '../../general_components/UITimeField';

//Styles:
import styled from 'styled-components';
import {
    MainContainer,
    FormContainer,
    Spacer,
    FlexWrapper,
    ErrorSpacer,
    SetConfigurationContainer,
} from './AddBlockForm';

const ButtonContainer = styled.div`
    margin: 2rem 0rem 1rem 0rem;
    display: flex;
    column-gap: 0.5rem;
`;

//Interfaces:

export const EditBlockForm = () => {
    const query = useQuery();
    const dispatch = useDispatch();
    const template = useSelector((state: RootStateOrAny) => state?.template);
    const colorLegendSelectables = useSelector(
        (state: RootStateOrAny) => state?.template?.templateLegend
    );
    const viewerInputSelectables = useSelector(
        (state: RootStateOrAny) => state?.template?.templateUserInputs
    );
    const { modalProps } = useSelector(
        (state: RootStateOrAny) => state?.modals?.EDIT_BLOCK
    );
    const currentSheetId = query.get('sheetId');

    //Grabbing current default states for reset:

    const initialComponentState = {
        name: modalProps?.blockDetails?.name,
        desc: modalProps?.blockDetails?.desc,
        sets: modalProps?.blockDetails?.sets,
        reps: modalProps?.blockDetails?.reps,
        restTime: modalProps?.blockDetails?.restTime,
        weightImperial: modalProps?.blockDetails?.weightImperial,
        weightMetric: modalProps?.blockDetails?.weightMetric,
        linkedColor: modalProps?.blockDetails?.linkedColor,
        linkedViewerInput: modalProps?.blockDetails?.linkedViewerInput,
        hasConfiguredSets: modalProps?.blockDetails?.hasConfiguredSets,
        configuredSets: modalProps?.blockDetails?.configuredSets,
    };

    //Error states:
    const [hasError, setHasError] = useState(false);
    const [isNameLengthLimitExceeded, setIsNameLengthLimitExceeded] =
        useState(false);
    const [isCustomSetLimitExceeded, setIsCustomSetLimitExceeded] =
        useState(false);

    //Modal input state
    const [userInput, setUserInput] = useState({
        name: modalProps?.blockDetails?.name,
        desc: modalProps?.blockDetails?.desc,
        sets: modalProps?.blockDetails?.sets,
        reps: modalProps?.blockDetails?.reps,
        restTime: modalProps?.blockDetails?.restTime,
        weightImperial: modalProps?.blockDetails?.weightImperial,
        weightMetric: modalProps?.blockDetails?.weightMetric,
        linkedColor: modalProps?.blockDetails?.linkedColor,
        linkedViewerInput: modalProps?.blockDetails?.linkedViewerInput,
        hasConfiguredSets: modalProps?.blockDetails?.hasConfiguredSets,
        configuredSets: modalProps?.blockDetails?.configuredSets,
    });

    //Set Configuration Menu State:
    const [isSetConfigurationMenuOpen, toggleSetConfigurationMenu] = useState(
        userInput.hasConfiguredSets || false
    );

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

    const hasBlockName = (): boolean => {
        return userInput.name !== '';
    };

    const handleUserInput = (name: string, val: string | number): void => {
        setUserInput({
            ...userInput,
            [name]: val,
        });
    };

    const composedWeightUnit = useMemo((): string | undefined => {
        if (!template) {
            return;
        }
        return template?.templateWeightUnit === 'METRIC' ? 'Kgs' : 'Lbs';
    }, [template.templateWeightUnit]);

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

    const submitBlockUpdateRequest = (): Function | void => {
        if (!hasBlockName() || isNameLengthLimitExceeded) {
            return setHasError(true);
        }

        if (modalProps?.blockType === 'TOOLBAR') {
            return dispatch(
                updateToolbarBlock(template.id, modalProps?.blockId, userInput)
            );
        }

        return dispatch(
            updateEditingSurfaceBlock(
                template.id,
                currentSheetId,
                modalProps?.blockId,
                modalProps?.columnPrefix,
                userInput
            )
        );
    };

    const generateCustomSetObjects = (setNumber: number): any => {
        //This should generate an object with setNumber amount of nested objects with default values for:
        // reps, weightMetric, weightImperial

        const setsObject = {} as any;

        for (let i = 1; i < setNumber + 1; ++i) {
            setsObject[i] = {
                fieldId: String(i),
                reps: '0',
                weightImperial: '0',
                weightMetric: '0',
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
                        required={!isSetConfigurationMenuOpen}
                        min={0}
                        max={99}
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
                    <UITimeField
                        label="Rest per Set"
                        value={userInput.restTime}
                        onChange={(event, value) => console.log(value)}
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
                    required
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
                    buttonLabel="Update Block"
                    onClick={submitBlockUpdateRequest}
                />
                <GeneralButton
                    buttonBackground="#c6c6c6"
                    width="10rem"
                    buttonTextColor="rgba(0, 0, 34, 1)"
                    textShadow="none"
                    disableShadow={true}
                    hoverShadow="none"
                    buttonLabel="Reset"
                    onClick={() => {
                        toggleSetConfigurationMenu(
                            initialComponentState.hasConfiguredSets
                        );
                        setUserInput(initialComponentState);
                    }}
                />
            </ButtonContainer>
        </MainContainer>
    );
};
