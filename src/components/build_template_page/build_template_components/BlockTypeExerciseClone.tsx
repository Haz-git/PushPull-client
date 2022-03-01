import * as React from 'react';
import { useMemo, forwardRef } from 'react';

//Redux:

import { useSelector, RootStateOrAny } from 'react-redux';

//Components
import { Popover } from '@mantine/core';
import Text from '../../general_components/Text';
import { BlockTypeExerciseDataCollapse } from './BlockTypeExerciseDataCollapse';
import { BlockTypeExerciseDataGrid } from './BlockTypeExerciseDataGrid';

//Styles:
import {
    MoreDots,
    HoverableButton,
    MainContainer,
    PopoverContainer,
    PopoverChildrenFlexWrapper,
    PopoverChildrenButton,
    BlockDetailsContainer,
    BlockHeader,
    LinkedColorSwatch,
    Divider,
} from './BlockTypeExercise';

//Interfaces / Enums:

enum WeightUnit {
    Metric = 'METRIC',
    Imperial = 'IMPERIAL',
}

interface IComponentProps {
    blockDetails: any;
    style?: any;
    draggableProps?: any;
    dragHandleProps?: any;
    className?: string;
}

export const BlockTypeExerciseClone = forwardRef(
    (
        {
            blockDetails,
            style,
            draggableProps,
            dragHandleProps,
            className,
        }: IComponentProps,
        ref: any
    ): JSX.Element => {
        //ForwardRef is used here to forward the provided innerRef used by React DnD.

        const { templateWeightUnit } = useSelector(
            (state: RootStateOrAny) => state?.template
        );
        const colorLegend = useSelector(
            (state: RootStateOrAny) => state.template?.templateLegend
        );

        const currentLinkedColor = useMemo((): any => {
            if (!colorLegend) {
                return;
            }

            const targetColor = colorLegend.find(
                (color: any) => color.id === blockDetails.linkedColor
            );

            return targetColor ? targetColor : undefined;
        }, [blockDetails.linkedColor]);

        const renderColorSwatch = (): JSX.Element | null => {
            if (!currentLinkedColor) {
                return null;
            }

            return (
                <LinkedColorSwatch linkedColor={currentLinkedColor.colorHex} />
            );
        };

        const blockWeight = useMemo((): string | undefined => {
            if (!templateWeightUnit) {
                return;
            }

            return templateWeightUnit === WeightUnit.Metric
                ? `${blockDetails.weightMetric}`
                : `${blockDetails.weightImperial}`;
        }, [
            templateWeightUnit,
            blockDetails.weightMetric,
            blockDetails.weightImperial,
        ]);

        const blockUnit = useMemo((): string | undefined => {
            if (!templateWeightUnit) {
                return;
            }

            return templateWeightUnit === WeightUnit.Metric ? 'Kgs' : 'Lbs';
        }, [templateWeightUnit]);

        return (
            <MainContainer
                ref={ref}
                style={style}
                {...draggableProps}
                {...dragHandleProps}
                className={className}
            >
                <PopoverContainer>
                    <Popover
                        noFocusTrap
                        gutter={10}
                        position="left"
                        placement="start"
                        opened={false}
                        target={
                            <HoverableButton isActive={false}>
                                <MoreDots />
                            </HoverableButton>
                        }
                        styles={{
                            popover: {
                                position: 'static',
                                margin: '0 0',
                                padding: '0 0',
                            },
                            inner: {
                                padding: '0 0',
                                margin: '0 0',
                            },
                        }}
                    >
                        <PopoverChildrenFlexWrapper>
                            <PopoverChildrenButton>
                                <Text text="Edit" />
                            </PopoverChildrenButton>
                            <Divider />
                            <PopoverChildrenButton>
                                <Text text="Delete" textColor="#AF1432" />
                            </PopoverChildrenButton>
                        </PopoverChildrenFlexWrapper>
                    </Popover>
                </PopoverContainer>
                <BlockDetailsContainer>
                    <BlockHeader>
                        <Text
                            text={blockDetails.name}
                            fontSize=".95rem"
                            fontWeight="800"
                        />
                        {renderColorSwatch()}
                    </BlockHeader>
                    <Divider />
                    <BlockTypeExerciseDataGrid
                        shouldShowGridLayout={
                            //If we have configured sets, we can't display the original layout. A collapse will be shown.
                            !blockDetails.hasConfiguredSets
                        }
                        sets={blockDetails.sets}
                        reps={blockDetails.reps}
                        weightUnit={blockUnit}
                        weight={blockWeight}
                    />
                    <BlockTypeExerciseDataCollapse
                        shouldShowCollapseLayout={
                            blockDetails.hasConfiguredSets
                        }
                        composedWeightUnit={blockUnit}
                        configuredSets={blockDetails.configuredSets}
                    />
                </BlockDetailsContainer>
            </MainContainer>
        );
    }
);

//This component serves as a reparenting clone for react DnD visually the UI should be the same.
