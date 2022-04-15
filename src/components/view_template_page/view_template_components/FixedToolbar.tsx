import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

//Components:
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Tooltip } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';
import { TemplateDocument } from './TemplateDocument';
import { FixedToolbarOwnerView } from './FixedToolbarOwnerView';
import { FixedToolbarAnonymousView } from './FixedToolbarAnonymousView';
import { FixedToolbarGuestView } from './FixedToolbarGuestView';

//Styles:
import styled from 'styled-components';
import { FileDownload } from '@styled-icons/material-rounded/FileDownload';
import { RemoveRedEye } from '@styled-icons/material-rounded/RemoveRedEye';
import { FileCopy } from '@styled-icons/material-rounded/FileCopy';
import { CloudUpload } from '@styled-icons/material-rounded/CloudUpload';
import { KeyboardBackspace } from '@styled-icons/material-rounded/KeyboardBackspace';
import { Survey } from '@styled-icons/remix-fill/Survey';

export const DownloadIcon = styled(FileDownload)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

export const ViewingIcon = styled(RemoveRedEye)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

export const CopyIcon = styled(FileCopy)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

export const PublishIcon = styled(CloudUpload)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

export const BackIcon = styled(KeyboardBackspace)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
`;

export const RateIcon = styled(Survey)`
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

export const ButtonWrapper = styled.div`
    padding: 0rem 0.75rem;
`;

//Interfaces:
enum ToolbarView {
    owner = 'owner',
    guest = 'guest',
    anonymous = 'anonymous',
}

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

    const user = useSelector((state: RootStateOrAny) => state?.user);

    const [toolbarView, setToolbarView] = useState(ToolbarView.anonymous);

    const electUserToolbarView = (): void => {
        //TODO : There's a small lag when transitioning to owner.

        const matchCurrentUsername =
            user?.user?.username === viewTemplate?.templateCreatedBy?.username;
        const matchCurrentUserId =
            user?.user?.userId ===
            Number(viewTemplate?.templateCreatedBy?.userfrontUserId);

        if (user?.isLoggedIn && matchCurrentUsername && matchCurrentUserId) {
            setToolbarView(ToolbarView.owner);
        }

        if (user?.isLoggedIn && !matchCurrentUsername && !matchCurrentUserId) {
            setToolbarView(ToolbarView.guest);
        }
    };

    useEffect(() => {
        electUserToolbarView();
    }, [user, viewTemplate]);

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
            <FixedToolbarOwnerView
                templateId={templateId}
                onReturnSheetId={onReturnSheetId}
                shouldDisplay={toolbarView === ToolbarView.owner}
            />
            <FixedToolbarAnonymousView
                shouldDisplay={toolbarView === ToolbarView.anonymous}
            />
            <FixedToolbarGuestView
                shouldDisplay={toolbarView === ToolbarView.guest}
            />
        </MainContainer>
    );
};
