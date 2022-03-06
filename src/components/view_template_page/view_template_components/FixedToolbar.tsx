import * as React from 'react';

//Redux:

//Components:

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
    color: #2c2c2c;
`;

const ViewingIcon = styled(RemoveRedEye)`
    height: 1.5rem;
    width: 1.5rem;
    color: #2c2c2c;
`;

const CopyIcon = styled(FileCopy)`
    height: 1.5rem;
    width: 1.5rem;
    color: #2c2c2c;
`;

const PublishIcon = styled(CloudUpload)`
    height: 1.5rem;
    width: 1.5rem;
    color: #2c2c2c;
`;

const BuilderIcon = styled(KeyboardBackspace)`
    height: 1.5rem;
    width: 1.5rem;
    color: #2c2c2c;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    height: 100%;
`;

const ButtonContainer = styled.div``;

const ButtonWrapper = styled.div`
    background: #d6d6d6;
    padding: 0.75rem 0.75rem;
    border: 1px solid #ececec;
    border-radius: 0.5rem;
`;

//Interfaces:

export const FixedToolbar = () => {
    return (
        <MainContainer>
            <ButtonWrapper>
                <DownloadIcon />
            </ButtonWrapper>
            <ButtonWrapper>
                <ViewingIcon />
            </ButtonWrapper>
            <ButtonWrapper>
                <CopyIcon />
            </ButtonWrapper>
            <ButtonWrapper>
                <PublishIcon />
            </ButtonWrapper>
            <ButtonWrapper>
                <BuilderIcon />
            </ButtonWrapper>
        </MainContainer>
    );
};
