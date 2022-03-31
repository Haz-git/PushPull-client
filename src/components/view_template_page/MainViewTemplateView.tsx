import * as React from 'react';
import { useEffect } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
    findViewTemplate,
    resetViewTemplate,
} from '../../redux/viewTemplates/viewTemplateActions';

//Components:
import { FixedToolbar } from './view_template_components/FixedToolbar';
import { UnauthorizedViewTemplate } from './view_template_components/UnauthorizedViewTemplate';
import { PDFViewer } from '@react-pdf/renderer';
import { TemplateDocument } from './view_template_components/TemplateDocument';
import { FixedInformationPanel } from './view_template_components/FixedInformationPanel';
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section<IMainContainerProps>`
    height: 100%;
    background: ${(props) =>
        props.hasUnauthorizedError === true ? '#2c2c2c' : '#ffffff'};
`;

const Wrapper = styled.div`
    display: flex;
`;

const DocumentContainer = styled.div`
    margin-left: 75px;
    // padding: 5rem 5rem;
    height: 100%;
    width: 100%;
    margin-right: 250px;
    -moz-box-shadow: inset 25px 0px 25px -25px rgba(0, 0, 0, 0.45),
        inset -25px 0px 25px -25px rgba(0, 0, 0, 0.45);
    -webkit-box-shadow: inset 25px 0px 25px -25px rgba(0, 0, 0, 0.45),
        inset -25px 0px 25px -25px rgba(0, 0, 0, 0.45);
    box-shadow: inset 25px 0px 25px -25px rgba(0, 0, 0, 0.45),
        inset -25px 0px 25px -25px rgba(0, 0, 0, 0.45);
`;

const ToolbarContainer = styled.div`
    position: fixed;
    border-right: 1px solid black;
    height: 100%;
    width: 75px;
`;

const InformationPanelContainer = styled.section`
    position: fixed;
    right: 0;
    border-left: 1px solid black;
    height: 100%;
    width: 250px;
`;

const pdfViewerStyles = {
    border: 'none',
    background: '#ffffff',
};

//Interfaces:

interface IMainContainerProps {
    hasUnauthorizedError: boolean;
}

interface IComponentProps {
    match: {
        params: {
            templateId: string;
        };
    };
}

export const MainViewTemplateView = ({
    match: {
        params: { templateId },
    },
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const hasViewTemplateError = useSelector(
        (state: RootStateOrAny) =>
            state?.errors?.queryViewTemplateError?.hasError
    );
    const onReturnSheetId = useSelector(
        (state: RootStateOrAny) =>
            state?.viewTemplate?.savedTemplate?.templateEditingSurfaceBlocks[0]
                ?.sheetId
    );

    useEffect(() => {
        dispatch(findViewTemplate(templateId));

        return () => {
            dispatch(resetViewTemplate());
        };
    }, []);

    return (
        <MainContainer hasUnauthorizedError={hasViewTemplateError}>
            <UnauthorizedViewTemplate
                shouldDisplay={hasViewTemplateError}
                messageLabel="Sorry, We Can't Access This Template!"
                buttonLabel="Return To Home"
                redirectLink="/" //TODO: For users querying a view template, return home. For build template users previewing, return to builder.
            />
            {!hasViewTemplateError && (
                <>
                    <Wrapper>
                        <ToolbarContainer>
                            <FixedToolbar
                                templateId={templateId}
                                onReturnSheetId={onReturnSheetId}
                            />
                        </ToolbarContainer>
                        <DocumentContainer>
                            <PDFViewer
                                height={height}
                                showToolbar={false}
                                width={width - 325} //325 is combined width of information panel and fixedToolbar
                                style={pdfViewerStyles}
                            >
                                <TemplateDocument />
                            </PDFViewer>
                        </DocumentContainer>
                        <InformationPanelContainer>
                            <FixedInformationPanel />
                        </InformationPanelContainer>
                    </Wrapper>
                </>
            )}
        </MainContainer>
    );
};
