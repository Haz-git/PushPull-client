import * as React from 'react';
import { useEffect } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { findViewTemplate } from '../../redux/viewTemplates/viewTemplateActions';

//Components:
import { FixedToolbar } from './view_template_components/FixedToolbar';
import { UnauthorizedViewTemplate } from './view_template_components/UnauthorizedViewTemplate';
// import { PDFViewer } from '@react-pdf/renderer';
// import { TemplateDocument } from './view_template_components/TemplateDocument';
import { FixedInformationPanel } from './view_template_components/FixedInformationPanel';
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
    margin-left: 5rem;
    padding: 10rem 10rem 10rem 5rem;
    height: 100%;
    width: 100%;
    margin-right: 17rem;
    overflow: scroll;
`;

const ToolbarContainer = styled.div`
    position: fixed;
    border-right: 1px solid black;
    height: 100%;
`;

const InformationPanelContainer = styled.section`
    position: fixed;
    right: 0;
    border-left: 1px solid black;
    height: 100%;
    width: 17rem;
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
                        <DocumentContainer>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Elementum facilisis leo vel
                            fringilla. Nisl pretium fusce id velit ut tortor
                            pretium viverra suspendisse. Adipiscing elit ut
                            aliquam purus sit amet luctus venenatis lectus. Et
                            ultrices neque ornare aenean. Urna nec tincidunt
                            praesent semper feugiat nibh. Dignissim diam quis
                            enim lobortis scelerisque fermentum dui faucibus.
                            Etiam tempor orci eu lobortis elementum nibh. Sit
                            amet porttitor eget dolor morbi non. Id venenatis a
                            condimentum vitae. Ultrices dui sapien eget mi
                            proin. Leo a diam sollicitudin tempor id eu nisl
                            nunc. Non curabitur gravida arcu ac. Sagittis eu
                            volutpat odio facilisis mauris sit amet massa vitae.
                            Dolor sit amet consectetur adipiscing elit ut
                            aliquam purus sit. Dictum varius duis at consectetur
                            lorem donec. Commodo nulla facilisi nullam vehicula
                            ipsum a. Commodo odio aenean sed adipiscing diam
                            donec adipiscing. Praesent semper feugiat nibh sed
                            pulvinar proin gravida hendrerit lectus. Enim nulla
                            aliquet porttitor lacus luctus accumsan tortor
                            posuere. Vel turpis nunc eget lorem dolor sed.
                            Consectetur a erat nam at lectus. Ornare lectus sit
                            amet est placerat. Dis parturient montes nascetur
                            ridiculus mus mauris. Neque sodales ut etiam sit
                            amet nisl. Duis ultricies lacus sed turpis tincidunt
                            id aliquet. Mauris in aliquam sem fringilla ut morbi
                            tincidunt augue. Sit amet consectetur adipiscing
                            elit duis tristique. Ipsum a arcu cursus vitae
                            congue mauris rhoncus aenean. Maecenas pharetra
                            convallis posuere morbi leo urna. Augue ut lectus
                            arcu bibendum at varius. Fames ac turpis egestas
                            integer eget aliquet. Sed egestas egestas fringilla
                            phasellus faucibus scelerisque eleifend donec. Eu
                            nisl nunc mi ipsum faucibus vitae aliquet nec. Fusce
                            id velit ut tortor pretium viverra suspendisse.
                            Venenatis tellus in metus vulputate. Orci eu
                            lobortis elementum nibh tellus molestie nunc non
                            blandit. Vel fringilla est ullamcorper eget nulla
                            facilisi etiam dignissim diam. Ac tortor vitae purus
                            faucibus ornare suspendisse. Aliquet nec ullamcorper
                            sit amet. Amet aliquam id diam maecenas. Quam lacus
                            suspendisse faucibus interdum posuere lorem ipsum
                            dolor sit. Egestas erat imperdiet sed euismod.
                            Adipiscing bibendum est ultricies integer quis
                            auctor elit sed vulputate. Mi ipsum faucibus vitae
                            aliquet nec ullamcorper sit. Viverra adipiscing at
                            in tellus integer feugiat scelerisque. Potenti
                            nullam ac tortor vitae. Nec dui nunc mattis enim ut.
                            Et malesuada fames ac turpis egestas sed. Sagittis
                            eu volutpat odio facilisis mauris sit amet massa.
                            Nisl nunc mi ipsum faucibus vitae aliquet nec
                            ullamcorper. Tempor id eu nisl nunc mi ipsum
                            faucibus vitae aliquet. Viverra aliquet eget sit
                            amet tellus cras. Metus vulputate eu scelerisque
                            felis imperdiet. Et molestie ac feugiat sed. Nec
                            feugiat in fermentum posuere urna nec tincidunt. Vel
                            eros donec ac odio tempor orci dapibus ultrices in.
                            Enim sit amet venenatis urna cursus eget nunc.
                            Lobortis feugiat vivamus at augue eget arcu dictum
                            varius. Dolor magna eget est lorem ipsum dolor sit
                            amet. Sed vulputate odio ut enim blandit volutpat.
                            Faucibus purus in massa tempor nec feugiat nisl
                            pretium. Elit duis tristique sollicitudin nibh sit
                            amet. At elementum eu facilisis sed.
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
