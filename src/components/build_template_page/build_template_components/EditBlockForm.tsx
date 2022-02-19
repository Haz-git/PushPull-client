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
import { TextInput, Textarea, NumberInput, Select } from '@mantine/core';
import Text from '../../general_components/Text';
import { SelectColorItem } from './SelectColorItem';
import { AddBlockError } from './AddBlockError';

//Styles:
import {
    MainContainer,
    FormContainer,
    Spacer,
    FlexWrapper,
    ButtonContainer,
    ErrorSpacer,
} from './AddBlockForm';
import useQuery from '../../../utils/hooks/useQuery';

//Interfaces:

export const EditBlockForm = () => {
    const query = useQuery();
    const dispatch = useDispatch();
    const template = useSelector((state: RootStateOrAny) => state?.template);
    const colorLegendSelectables = useSelector(
        (state: RootStateOrAny) => state?.template?.templateLegend
    );
    const { modalProps } = useSelector(
        (state: RootStateOrAny) => state?.modals?.EDIT_BLOCK
    );
    const currentSheetId = query.get('sheetId');

    //Modal input state
    const [userInput, setUserInput] = useState({
        name: modalProps?.blockDetails?.name,
        desc: modalProps?.blockDetails?.desc,
        sets: modalProps?.blockDetails?.sets,
        reps: modalProps?.blockDetails?.reps,
        weightImperial: modalProps?.blockDetails?.weightImperial,
        weightMetric: modalProps?.blockDetails?.weightMetric,
        linkedColor: modalProps?.blockDetails?.linkedColor,
        linkedViewerInput: modalProps?.blockDetails?.linkedViewerInput,
    });

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

    //Error state:
    const [hasError, setHasError] = useState(false);
    const [isNameLengthLimitExceeded, setIsNameLengthLimitExceeded] =
        useState(false);

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
                    buttonLabel="Update Block"
                    onClick={submitBlockUpdateRequest}
                />
            </ButtonContainer>
        </MainContainer>
    );
};
