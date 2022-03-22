import * as React from 'react';
import { useEffect } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { findViewTemplate } from '../../redux/viewTemplates/viewTemplateActions';

//Components:
import { FixedToolbar } from './view_template_components/FixedToolbar';
import { UnauthorizedViewTemplate } from './view_template_components/UnauthorizedViewTemplate';
import { PDFViewer } from '@react-pdf/renderer';
import { TemplateDocument } from './view_template_components/TemplateDocument';
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section<IMainContainerProps>`
    // overflow: hidden;
    height: 100%;
    background: ${(props) =>
        props.hasUnauthorizedError === true ? '#2c2c2c' : '#ffffff'};
`;

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
`;

const DocumentContainer = styled.div`
    margin-left: 75px;
    // padding: 10rem 10rem 10rem 5rem;
    // height: 100%;
    // width: 100%;
`;

const ToolbarContainer = styled.div`
    position: fixed;
    border-right: 1px solid black;
    height: 100%;
`;

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
    const viewTemplate = useSelector(
        (state: RootStateOrAny) => state?.viewTemplate
    );
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
                        <DocumentContainer></DocumentContainer>
                    </Wrapper>
                </>
            )}
        </MainContainer>
    );
};
