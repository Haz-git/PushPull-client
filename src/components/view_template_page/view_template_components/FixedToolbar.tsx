import * as React from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

//Components:
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Tooltip } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';
import { TemplateDocument } from './TemplateDocument';

//Styles:
import styled from 'styled-components';
import { FileDownload } from '@styled-icons/material-rounded/FileDownload';
import { RemoveRedEye } from '@styled-icons/material-rounded/RemoveRedEye';
import { FileCopy } from '@styled-icons/material-rounded/FileCopy';
import { CloudUpload } from '@styled-icons/material-rounded/CloudUpload';
import { KeyboardBackspace } from '@styled-icons/material-rounded/KeyboardBackspace';

const DownloadIcon = styled(FileDownload)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

const ViewingIcon = styled(RemoveRedEye)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

const CopyIcon = styled(FileCopy)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

const PublishIcon = styled(CloudUpload)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

const BackIcon = styled(KeyboardBackspace)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    height: 100%;
    background: #2c2c2c;
`;

const ButtonContainer = styled.div``;

const ButtonWrapper = styled.div`
    padding: 0rem 0.75rem;
`;

//Interfaces:

interface IComponentProps {
    templateId: string;
    onReturnSheetId: string;
}

export const FixedToolbar = ({
    templateId,
    onReturnSheetId,
}: IComponentProps): JSX.Element => {
    const viewTemplate = useSelector(
        (state: RootStateOrAny) => state?.viewTemplate?.savedTemplate
    );
    return (
        <MainContainer>
            <Tooltip label="Download File" position="right" placement="center">
                <ButtonWrapper>
                    <PDFDownloadLink
                        document={
                            <TemplateDocument viewTemplate={viewTemplate} />
                        }
                        fileName={`${viewTemplate?.templateFileTitle}.pdf`}
                    >
                        <GeneralButton
                            buttonLabel=""
                            buttonIconLeft={<DownloadIcon />}
                            leftIconMargin="0"
                            rightIconMargin="0"
                        />
                    </PDFDownloadLink>
                </ButtonWrapper>
            </Tooltip>
            <Tooltip
                label="Configure Viewing Access"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<ViewingIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                    />
                </ButtonWrapper>
            </Tooltip>
            <Tooltip
                label="Configure Duplication Access"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<CopyIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                    />
                </ButtonWrapper>
            </Tooltip>
            <Tooltip
                label="Upload To PushPull Ranking Catalog"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<PublishIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                    />
                </ButtonWrapper>
            </Tooltip>
            <Tooltip
                label="Return To Templates"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<BackIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                        onClick={() =>
                            historyObject.push(
                                `/file/${templateId}?sheetId=${onReturnSheetId}`
                            )
                        }
                    />
                </ButtonWrapper>
            </Tooltip>
        </MainContainer>
    );
};
