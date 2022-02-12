import * as React from 'react';
import { useState, useMemo } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
    deleteEditingSurfaceBlock,
    deleteToolbarBlock,
} from '../../../redux/templates/templateActions';
import { ModalActionTypes } from '../../../redux/modals/action-types';
import { toggleModal } from '../../../redux/modals/modalActions';

//Components:
import { Draggable } from 'react-beautiful-dnd';
import Text from '../../general_components/Text';
import { Popover } from '@mantine/core';
import useQuery from '../../../utils/hooks/useQuery';

//Styles:
import styled from 'styled-components';
import { MoreHorizontal } from '@styled-icons/fluentui-system-regular/MoreHorizontal';

const MoreDots = styled(MoreHorizontal)`
    color: #ffffff;
    height: 1rem;
    width: 1rem;
`;

const HoverableButton = styled.button<IHoverableButtonProps>`
    opacity: ${({ isActive }) => (isActive ? '100' : '0')};
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
    border: none;
    background: #e07133;
    border-radius: 50%;
    text-align: center;
    vertical-align: baseline;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    }
`;

const MainContainer = styled.div`
    position: relative;
    margin: 0.5rem 0rem;
    border-radius: 0.2rem;
    background: #ffffff;
    width: 100%;
    border: 2px solid #e07133;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    transition: all 0.1s ease-in;

    &:hover {
        box-shadow: rgba(9, 30, 66, 0.5) 0px 4px 8px -2px,
            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    }

    &:hover ${HoverableButton} {
        opacity: 100%;
    }
`;

const PopoverContainer = styled.div`
    position: absolute;
    top: -1rem;
    right: -0.25rem;
`;

const PopoverChildrenFlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 6rem;
`;

const PopoverChildrenButton = styled.button`
    background: #ffffff;
    text-decoration: none;
    border: none;
    text-align: left;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    cursor: pointer;
    width: 100%;

    &:hover {
        background: #ececec;
    }
`;

const BlockDetailsContainer = styled.div``;

const BlockHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    max-width: 100%;
`;

const LinkedColorSwatch = styled.div<ILinkedColorSwatchProps>`
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 0.2rem;
    background: ${({ linkedColor }) => linkedColor};
`;
const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: #d6d6d6;
`;

const BlockExerciseLengthContainer = styled.div`
    padding: 0.5rem 0.25rem 0.5rem 0.25rem;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 0.8fr 0.8fr 1.2fr;
`;

const ExerciseDetails = styled.div`
    text-align: center;
    padding: 0.2rem 0.2rem;
    background: #ececec;
    margin: 0 0.1rem;
    border-radius: 0.3rem;
`;

const ExerciseDetailSpacer = styled.div`
    height: 0.2rem;
`;

//Interfaces:

export enum BlockTypes {
    TOOLBAR = 'TOOLBAR',
    EDITING_SURFACE = 'EDITING_SURFACE',
}

interface ILinkedColorSwatchProps {
    linkedColor: string;
}

interface IHoverableButtonProps {
    isActive: boolean;
}

interface IComponentProps {
    item: any;
    index: any;
    blockDetails: any;
    blockId: string;
    blockType: BlockTypes.TOOLBAR | BlockTypes.EDITING_SURFACE;
    columnPrefix?: string;
}

const BlockTypeExercise = ({
    blockId,
    item,
    index,
    blockDetails,
    blockType,
    columnPrefix,
}: IComponentProps): JSX.Element => {
    const query = useQuery();
    const currentSheetId = query.get('sheetId');
    const dispatch = useDispatch();
    const { templateWeightUnit } = useSelector(
        (state: RootStateOrAny) => state?.template
    );
    const templateId = useSelector(
        (state: RootStateOrAny) => state?.template?.id
    );
    const colorLegend = useSelector(
        (state: RootStateOrAny) => state.template?.templateLegend
    );

    const {
        name,
        sets,
        reps,
        weightImperial,
        weightMetric,
        linkedColor,
        linkedViewerInput,
    } = blockDetails;

    const currentLinkedColor = useMemo((): any => {
        if (!colorLegend) {
            return;
        }

        const targetColor = colorLegend.find(
            (color: any) => color.id === linkedColor
        );

        return targetColor ? targetColor : undefined;
    }, [colorLegend]);

    const blockWeight = useMemo((): string | undefined => {
        if (!templateWeightUnit) {
            return;
        }

        return templateWeightUnit === 'METRIC'
            ? `${weightMetric}`
            : `${weightImperial}`;
    }, [templateWeightUnit]);

    const blockUnit = useMemo((): string | undefined => {
        if (!templateWeightUnit) {
            return;
        }

        return templateWeightUnit === 'METRIC' ? 'Kgs' : 'Lbs';
    }, [templateWeightUnit]);

    const renderColorSwatch = (): JSX.Element | null => {
        if (!currentLinkedColor) {
            return null;
        }

        return <LinkedColorSwatch linkedColor={currentLinkedColor.colorHex} />;
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isHoverableButtonActive, setIsHoverableButtonActive] =
        useState(false);

    const handleUserClickHoverableButton = (): void => {
        setIsHoverableButtonActive(true);
        setIsPopoverOpen(true);
    };

    const handleUserDeleteBlock = (): Function => {
        if (blockType === BlockTypes.EDITING_SURFACE) {
            return dispatch(
                deleteEditingSurfaceBlock(
                    templateId,
                    blockId,
                    currentSheetId,
                    columnPrefix
                )
            );
        }

        return dispatch(deleteToolbarBlock(templateId, blockId));
    };

    const handleUserEditBlock = (): void => {
        if (isHoverableButtonActive) {
            setIsHoverableButtonActive(false);
        }
        setIsPopoverOpen(false);
        dispatch(
            toggleModal(ModalActionTypes.EDIT_BLOCK, 'OPEN', {
                blockId,
                blockDetails,
            })
        );
    };

    return (
        <>
            <Draggable draggableId={item.id} index={index}>
                {(provided, snapshot) => {
                    return (
                        <MainContainer
                            ref={provided.innerRef}
                            data-snapshot={snapshot}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <PopoverContainer>
                                <Popover
                                    noFocusTrap
                                    gutter={10}
                                    position="left"
                                    placement="start"
                                    opened={isPopoverOpen}
                                    onClose={() => {
                                        setIsPopoverOpen(false);
                                        setIsHoverableButtonActive(false);
                                    }}
                                    target={
                                        <HoverableButton
                                            isActive={isHoverableButtonActive}
                                            onClick={
                                                handleUserClickHoverableButton
                                            }
                                        >
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
                                        <PopoverChildrenButton
                                            onClick={handleUserEditBlock}
                                        >
                                            <Text text="Edit" />
                                        </PopoverChildrenButton>
                                        <Divider />
                                        <PopoverChildrenButton
                                            onClick={handleUserDeleteBlock}
                                        >
                                            <Text
                                                text="Delete"
                                                textColor="#AF1432"
                                            />
                                        </PopoverChildrenButton>
                                    </PopoverChildrenFlexWrapper>
                                </Popover>
                            </PopoverContainer>
                            <BlockDetailsContainer>
                                <BlockHeader>
                                    <Text
                                        text={name}
                                        fontSize=".95rem"
                                        fontWeight="800"
                                    />
                                    {renderColorSwatch()}
                                </BlockHeader>
                                <Divider />
                                <BlockExerciseLengthContainer>
                                    <ExerciseDetails>
                                        <Text
                                            text={`Sets`}
                                            fontSize=".75rem"
                                            fontWeight="800"
                                            subText={true}
                                        />
                                        <ExerciseDetailSpacer />
                                        <Text
                                            text={`${sets}`}
                                            fontSize="1rem"
                                            fontWeight="800"
                                            mainText={true}
                                        />
                                    </ExerciseDetails>
                                    <ExerciseDetails>
                                        <Text
                                            text={`Reps`}
                                            fontSize=".75rem"
                                            fontWeight="800"
                                            subText={true}
                                        />
                                        <ExerciseDetailSpacer />
                                        <Text
                                            text={`${reps}`}
                                            fontSize="1rem"
                                            fontWeight="800"
                                            mainText={true}
                                        />
                                    </ExerciseDetails>
                                    <ExerciseDetails>
                                        <Text
                                            text={blockUnit}
                                            fontSize=".75rem"
                                            fontWeight="800"
                                            subText={true}
                                        />
                                        <ExerciseDetailSpacer />
                                        <Text
                                            text={blockWeight}
                                            fontSize="1rem"
                                            fontWeight="800"
                                            mainText={true}
                                        />
                                    </ExerciseDetails>
                                </BlockExerciseLengthContainer>
                            </BlockDetailsContainer>
                        </MainContainer>
                    );
                }}
            </Draggable>
        </>
    );
};

export default BlockTypeExercise;
