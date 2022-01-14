import * as React from 'react';
import { useState } from 'react';

//Components:
import { Draggable } from 'react-beautiful-dnd';
import Text from '../../general_components/Text';
import { Popover } from '@mantine/core';

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

const PopoverChildrenContainer = styled.div`
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    cursor: pointer;
    width: 100%;

    &:hover {
        background: #ececec;
    }
`;

const BlockHeader = styled.div`
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
`;

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: #d6d6d6;
`;

const BlockExerciseLengthContainer = styled.div`
    padding: 0.5rem 0rem 0.5rem 0.5rem;
    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-template-columns: 50% 50%;
`;

const ExerciseDetails = styled.div``;

//Interfaces:

interface IHoverableButtonProps {
    isActive: boolean;
}

interface IComponentProps {
    item: any;
    index: any;
    blockDetails: any;
    blockId: string;
}

const BlockTypeExercise = ({
    blockId,
    item,
    index,
    blockDetails,
}: IComponentProps): JSX.Element => {
    const { name, sets, reps } = blockDetails;

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isHoverableButtonActive, setIsHoverableButtonActive] =
        useState(false);

    const handleUserClickHoverableButton = () => {
        setIsHoverableButtonActive(true);
        setIsPopoverOpen(true);
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
                                        <PopoverChildrenContainer>
                                            <Text text="Edit" />
                                        </PopoverChildrenContainer>
                                        <Divider />
                                        <PopoverChildrenContainer>
                                            <Text
                                                text="Delete"
                                                textColor="#AF1432"
                                            />
                                        </PopoverChildrenContainer>
                                    </PopoverChildrenFlexWrapper>
                                </Popover>
                            </PopoverContainer>
                            <BlockHeader>
                                <Text
                                    text={name}
                                    fontSize=".95rem"
                                    fontWeight="800"
                                />
                            </BlockHeader>
                            <Divider />
                            <BlockExerciseLengthContainer>
                                <ExerciseDetails>
                                    <Text
                                        text={`${sets} Sets`}
                                        fontSize=".9rem"
                                        fontWeight="600"
                                        subText={true}
                                    />
                                </ExerciseDetails>
                                <ExerciseDetails>
                                    <Text
                                        text={`${reps} Reps`}
                                        fontSize=".9rem"
                                        fontWeight="600"
                                        subText={true}
                                    />
                                </ExerciseDetails>
                            </BlockExerciseLengthContainer>
                        </MainContainer>
                    );
                }}
            </Draggable>
        </>
    );
};

export default BlockTypeExercise;
