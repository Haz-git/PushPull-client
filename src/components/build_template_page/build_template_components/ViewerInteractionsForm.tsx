import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
import { Tooltip } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import { Info } from '@styled-icons/fluentui-system-filled/Info';

const InfoIcon = styled(Info)`
    margin-bottom: -0.02rem;
    height: 1.5rem;
    width: 1.5rem;
    color: #e07133;
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
    height: 10rem;
    width: 100%;
`;

const ViewerInteractionsForm = () => {
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
                <ActionContainer></ActionContainer>
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
                        label="After adding an input question, the viewer will be prompted to enter his/her details when viewing the template. You can use his/her input details to dynamically calculate weights for each block."
                    >
                        <InfoIcon />
                    </Tooltip>
                </OptionHeader>
                <ActionContainer></ActionContainer>
            </ViewerInputsContainer>
        </MainContainer>
    );
};

export default ViewerInteractionsForm;
