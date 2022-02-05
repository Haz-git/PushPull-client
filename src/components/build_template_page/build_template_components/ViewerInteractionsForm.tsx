import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import Text from '../../general_components/Text';
import { Tooltip } from '@mantine/core';
import { Popover } from '@mantine/core';
import { AddColorForm } from './AddColorForm';
import { AddViewerInputForm } from './AddViewerInputForm';
import { ColorSelectables } from './ColorSelectables';
import { v4 as uuid } from 'uuid';

//Styles:
import styled from 'styled-components';
import { Info } from '@styled-icons/fluentui-system-filled/Info';
import { Add } from '@styled-icons/fluentui-system-filled/Add';
import { Subtract } from '@styled-icons/fluentui-system-regular/Subtract';

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
    const colorSwatches = useSelector(
        (state: RootStateOrAny) => state?.template?.templateLegend
    );
    const [isAddColorPopoverOpen, setStatusAddColorPopover] = useState(false);
    const [isAddUserInputPopoverOpen, setStatusAddUserInputPopover] =
        useState(false);

    const renderColorSwatches = (): JSX.Element => {
        if (!colorSwatches || colorSwatches.length === 0) {
            return <>Temp Placeholder - no colors</>;
        }

        return colorSwatches.map((color: any) => (
            <ColorSelectables
                label={color.label}
                colorHex={color.colorHex}
                description={color.description}
                key={uuid()}
            />
        ));
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
                        onClose={() => setStatusAddColorPopover(false)}
                        placement="start"
                        position="bottom"
                        withCloseButton={true}
                        opened={isAddColorPopoverOpen}
                        target={
                            <AddButton
                                onClick={() => setStatusAddColorPopover(true)}
                            >
                                <AddIcon />
                            </AddButton>
                        }
                    >
                        <AddColorForm />
                    </Popover>
                    <RemoveButton>
                        <SubtractIcon />
                    </RemoveButton>
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
                <ActionContainer></ActionContainer>
                <ActionableButtonContainer>
                    <Popover
                        noClickOutside={true}
                        noEscape={true}
                        title="Add Viewer Questions"
                        onClose={() => setStatusAddUserInputPopover(false)}
                        placement="start"
                        position="bottom"
                        withCloseButton={true}
                        opened={isAddUserInputPopoverOpen}
                        target={
                            <AddButton
                                onClick={() =>
                                    setStatusAddUserInputPopover(true)
                                }
                            >
                                <AddIcon />
                            </AddButton>
                        }
                    >
                        <AddViewerInputForm />
                    </Popover>
                    <RemoveButton>
                        <SubtractIcon />
                    </RemoveButton>
                </ActionableButtonContainer>
            </ViewerInputsContainer>
        </MainContainer>
    );
};

export default ViewerInteractionsForm;
