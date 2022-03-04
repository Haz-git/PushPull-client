import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { ModalActionTypes } from '../../../redux/modals/action-types';
import { toggleModal } from '../../../redux/modals/modalActions';

//Components:
import Text from '../../general_components/Text';
import { Tooltip } from '@mantine/core';
import { Popover } from '@mantine/core';
import { AddColorForm } from './AddColorForm';
import { DeleteColorForm } from './DeleteColorForm';
import { AddViewerInputForm } from './AddViewerInputForm';
import { ColorSelectables } from './ColorSelectables';

//Styles:
import styled from 'styled-components';
import { Info } from '@styled-icons/fluentui-system-filled/Info';
import { Add } from '@styled-icons/fluentui-system-filled/Add';
import { Subtract } from '@styled-icons/fluentui-system-regular/Subtract';
import { QuestionSelectables } from './QuestionSelectables';
import { DeleteViewerInputForm } from './DeleteViewerInputForm';

const InfoIcon = styled(Info)`
    margin-bottom: -0.02rem;
    height: 1.5rem;
    width: 1.5rem;
    color: #e07133;
`;

const AddIcon = styled(Add)`
    height: 1.25rem;
    width: 1.25rem;
    color: #ffffff;
`;

const SubtractIcon = styled(Subtract)`
    height: 1.25rem;
    width: 1.25rem;
    color: #ffffff;
`;

const MainContainer = styled.div`
    padding: 0rem 0.5rem;
    position: relative;
`;

const DescContainer = styled.div``;

const OptionHeader = styled.div`
    max-width: 11rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 0.5rem;
`;

const LegendContainer = styled.div`
    margin: 1.5rem 0;
`;

const ViewerInputsContainer = styled.div``;

const ActionContainer = styled.div`
    border: 1px solid #d6d6d6;
    background: #ececec;
    border-radius: 0.3rem;
    min-height: 10rem;
    width: 100%;
    padding: 0.5rem 0.5rem;
    max-height: 12rem;
    overflow-y: scroll;
`;

const ActionableButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0.5rem 0rem;
    width: 4rem;
`;

const AddButton = styled.button`
    border: none;
    text-decoration: none;
    background: #e07133;
    padding: 0.15rem 0.15rem;
    border-radius: 0.2rem;
    cursor: pointer;
    margin-right: 0.15rem;
`;

const RemoveButton = styled.button`
    border: none;
    text-decoration: none;
    background: #e07133;
    padding: 0.15rem 0.15rem;
    border-radius: 0.2rem;
    cursor: pointer;
`;

const ViewerInteractionsForm = () => {
    const dispatch = useDispatch();
    const colorSwatches = useSelector(
        (state: RootStateOrAny) => state?.template?.templateLegend
    );

    const viewerQuestions = useSelector(
        (state: RootStateOrAny) => state?.template?.templateUserInputs
    );

    const isAddColorPopoverOpen = useSelector(
        (state: RootStateOrAny) =>
            state?.modals?.ADD_COLOR_SWATCH_POPOVER.isOpen
    );

    const isDeleteColorPopoverOpen = useSelector(
        (state: RootStateOrAny) =>
            state?.modals?.DELETE_COLOR_SWATCH_POPOVER.isOpen
    );

    const isViewerInputPopoverOpen = useSelector(
        (state: RootStateOrAny) =>
            state?.modals?.ADD_VIEWER_INPUT_POPOVER.isOpen
    );
    const isDeleteViewerInputPopoverOpen = useSelector(
        (state: RootStateOrAny) =>
            state?.modals?.DELETE_VIEWER_INPUT_POPOVER.isOpen
    );

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');

    const onSelectColor = (colorId: string): void => {
        if (!colorId) {
            return;
        }

        setSelectedColor(colorId);
    };

    const onSelectQuestion = (questionId: string): void => {
        if (!questionId) {
            return;
        }

        setSelectedQuestion(questionId);
    };

    const isColorSelected = (
        selectedColorId: string,
        colorId: string
    ): boolean => {
        return selectedColorId === colorId;
    };

    const isQuestionSelected = (
        selectedQuestionId: string,
        questionId: string
    ): boolean => {
        return selectedQuestionId === questionId;
    };

    const renderColorSwatches = (): JSX.Element | null => {
        if (!colorSwatches || colorSwatches.length === 0) {
            return null;
        }

        return colorSwatches.map((color: any) => (
            <ColorSelectables
                id={color.id}
                label={color.label}
                colorHex={color.colorHex}
                description={color.description}
                key={color.id}
                isSelected={isColorSelected(selectedColor, color.id)}
                onSelectColor={onSelectColor}
            />
        ));
    };

    const renderViewerQuestions = (): JSX.Element | null => {
        if (!viewerQuestions || viewerQuestions.length === 0) {
            return null;
        }

        return viewerQuestions.map((question: any) => (
            <QuestionSelectables
                id={question.id}
                key={question.id}
                inputQuestion={question.InputQuestion}
                responseType={question.ResponseType}
                isSelected={isQuestionSelected(selectedQuestion, question.id)}
                onSelectQuestion={onSelectQuestion}
            />
        ));
    };

    const shouldDeleteViewerInputPopoverOpen = (): boolean => {
        return selectedQuestion !== '' && isDeleteViewerInputPopoverOpen;
    };

    const shouldDeleteColorPopoverOpen = (): boolean => {
        return selectedColor !== '' && isDeleteColorPopoverOpen;
    };

    return (
        <MainContainer>
            <DescContainer>
                <Text
                    subText={true}
                    text="Customize how your viewers interact with your template by organizing your blocks with colors to describe corresponding exercises, or adding inputs where viewers can fill in information."
                />
            </DescContainer>
            <LegendContainer>
                <OptionHeader>
                    <Text
                        mainText={true}
                        text="Color Legend"
                        fontSize="1.3rem"
                        fontWeight="700"
                    />
                    <Tooltip
                        wrapLines
                        width={250}
                        withArrow
                        position="right"
                        placement="center"
                        transition="fade"
                        transitionDuration={200}
                        label="After adding a color to this legend, you may select this color to highlight a block. You can include a custom description corresponding to each color."
                    >
                        <InfoIcon />
                    </Tooltip>
                </OptionHeader>
                <ActionContainer>{renderColorSwatches()}</ActionContainer>
                <ActionableButtonContainer>
                    <Popover
                        noClickOutside={true}
                        noEscape={true}
                        title="Add New Color"
                        onClose={() =>
                            dispatch(
                                toggleModal(
                                    ModalActionTypes.ADD_COLOR_SWATCH_POPOVER,
                                    'CLOSE'
                                )
                            )
                        }
                        placement="start"
                        position="bottom"
                        withCloseButton={true}
                        opened={isAddColorPopoverOpen}
                        target={
                            <AddButton
                                onClick={() =>
                                    dispatch(
                                        toggleModal(
                                            ModalActionTypes.ADD_COLOR_SWATCH_POPOVER,
                                            'OPEN'
                                        )
                                    )
                                }
                            >
                                <AddIcon />
                            </AddButton>
                        }
                    >
                        <AddColorForm />
                    </Popover>
                    <Popover
                        noClickOutside={false}
                        noEscape={false}
                        title="Remove Color"
                        onClose={() =>
                            dispatch(
                                toggleModal(
                                    ModalActionTypes.DELETE_COLOR_SWATCH_POPOVER,
                                    'CLOSE'
                                )
                            )
                        }
                        placement="start"
                        position="bottom"
                        withCloseButton={true}
                        opened={shouldDeleteColorPopoverOpen()}
                        target={
                            <RemoveButton
                                onClick={() => {
                                    if (selectedColor !== '') {
                                        dispatch(
                                            toggleModal(
                                                ModalActionTypes.DELETE_COLOR_SWATCH_POPOVER,
                                                'OPEN'
                                            )
                                        );
                                    }
                                }}
                            >
                                <SubtractIcon />
                            </RemoveButton>
                        }
                    >
                        <DeleteColorForm
                            currentSelectedColorId={selectedColor}
                            resetColorId={() => setSelectedColor('')}
                        />
                    </Popover>
                </ActionableButtonContainer>
            </LegendContainer>
            <ViewerInputsContainer>
                <OptionHeader>
                    <Text
                        mainText={true}
                        text="Viewer Inputs"
                        fontSize="1.3rem"
                        fontWeight="700"
                    />
                    <Tooltip
                        wrapLines
                        width={300}
                        withArrow
                        position="right"
                        placement="center"
                        transition="fade"
                        transitionDuration={200}
                        label="After adding an input question, the viewer will be prompted to enter his/her details when viewing the template. You can access his/her input details to dynamically calculate weights for each block."
                    >
                        <InfoIcon />
                    </Tooltip>
                </OptionHeader>
                <ActionContainer>{renderViewerQuestions()}</ActionContainer>
                <ActionableButtonContainer>
                    <Popover
                        noClickOutside={true}
                        noEscape={true}
                        title="Add Viewer Questions"
                        onClose={() =>
                            dispatch(
                                toggleModal(
                                    ModalActionTypes.ADD_VIEWER_INPUT_POPOVER,
                                    'CLOSE'
                                )
                            )
                        }
                        placement="start"
                        position="bottom"
                        withCloseButton={true}
                        opened={isViewerInputPopoverOpen}
                        target={
                            <AddButton
                                onClick={() =>
                                    dispatch(
                                        toggleModal(
                                            ModalActionTypes.ADD_VIEWER_INPUT_POPOVER,
                                            'OPEN'
                                        )
                                    )
                                }
                            >
                                <AddIcon />
                            </AddButton>
                        }
                    >
                        <AddViewerInputForm />
                    </Popover>
                    <Popover
                        noClickOutside={false}
                        noEscape={false}
                        title="Remove Input Question"
                        onClose={() =>
                            dispatch(
                                toggleModal(
                                    ModalActionTypes.DELETE_VIEWER_INPUT_POPOVER,
                                    'CLOSE'
                                )
                            )
                        }
                        placement="start"
                        position="bottom"
                        withCloseButton={true}
                        opened={shouldDeleteViewerInputPopoverOpen()}
                        target={
                            <RemoveButton
                                onClick={() => {
                                    if (selectedQuestion !== '') {
                                        dispatch(
                                            toggleModal(
                                                ModalActionTypes.DELETE_VIEWER_INPUT_POPOVER,
                                                'OPEN'
                                            )
                                        );
                                    }
                                }}
                            >
                                <SubtractIcon />
                            </RemoveButton>
                        }
                    >
                        <DeleteViewerInputForm
                            currentSelectedQuestionId={selectedQuestion}
                            resetQuestionId={() => setSelectedQuestion('')}
                        />
                    </Popover>
                </ActionableButtonContainer>
            </ViewerInputsContainer>
        </MainContainer>
    );
};

export default ViewerInteractionsForm;
