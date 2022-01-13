import * as React from 'react';

//Components:
import { Draggable } from 'react-beautiful-dnd';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';
import { MoreHorizontal } from '@styled-icons/fluentui-system-regular/MoreHorizontal';

const MoreDots = styled(MoreHorizontal)`
    color: #ffffff;
    height: 1rem;
    width: 1rem;
`;

const HoverableButton = styled.button`
    opacity: 0;
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

interface IComponentProps {
    item: any;
    index: any;
    blockDetails: any;
}

const BlockTypeExercise = ({
    item,
    index,
    blockDetails,
}: IComponentProps): JSX.Element => {
    const { name, sets, reps } = blockDetails;

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <MainContainer
                        ref={provided.innerRef}
                        data-snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <HoverableButton>
                            <MoreDots />
                        </HoverableButton>
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
    );
};

export default BlockTypeExercise;
