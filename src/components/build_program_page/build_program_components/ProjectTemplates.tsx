import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { findTemplates } from '../../../redux/templates/templateActions';

//Router:
import { useParams } from 'react-router-dom';

//Components:
import { ReactComponent as NoTemplateSVG } from '../../../assets/template_none.svg';
import TemplateComponent from './TemplateComponent';
import TemplateComponentSkeleton from './TemplateComponentSkeleton';
import Text from '../../general_components/Text';

//Utils:
import { deviceMin } from '../../../devices/breakpoints';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 2rem;
    }

    @media ${deviceMin.tabletp} {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(16rem, auto));
        align-items: stretch;
        justify-content: stretch;
        row-gap: 2rem;
        column-gap: 2rem;
        margin: 1rem 1rem 0rem 1rem;
    }
`;

const NoTemplatesContainer = styled.div`
    cursor: default;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding: 1rem 1rem;
`;

const SVGContainer = styled.div``;

const TextContainer = styled.div`
    padding: 1rem 1rem;
    background: #ececec;
    border-radius: 0.4rem;
`;

//Interfaces:

interface IComponentProps {
    projectUuid: string | null;
    dashboardTemplatesLoadedCallback: (status: boolean) => void;
    toggleDeleteTemplateModal: (
        status: boolean,
        templateId: string,
        projectUuid?: string | null
    ) => void;
}

const ProjectTemplates = ({
    projectUuid,
    dashboardTemplatesLoadedCallback,
    toggleDeleteTemplateModal,
}: IComponentProps): JSX.Element => {
    let { dashboardView } = useParams<{ dashboardView: string }>();
    const dispatch = useDispatch();
    const templates = useSelector(
        (state: RootStateOrAny) => state?.projectTemplates
    );

    //Loader State:
    const [areTemplatesLoaded, setAreTemplatesLoaded] = useState(false);

    //State hander for selected template components:
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const isNonProjectView = () => {
        if (
            !projectUuid &&
            dashboardView !== 'project' &&
            (dashboardView === 'recents' ||
                dashboardView === 'published' ||
                dashboardView === 'drafts')
        )
            return true;

        return false;
    };

    useEffect(() => {
        if (areTemplatesLoaded) setAreTemplatesLoaded(!areTemplatesLoaded);
        if (isNonProjectView()) {
            dispatch(
                findTemplates(
                    (status: boolean) => setAreTemplatesLoaded(status),
                    dashboardTemplatesLoadedCallback,
                    null,
                    dashboardView
                )
            );
        } else {
            dispatch(
                findTemplates(
                    (status: boolean) => setAreTemplatesLoaded(status),
                    dashboardTemplatesLoadedCallback,
                    projectUuid,
                    null
                )
            );
        }
    }, [projectUuid, dashboardView]);

    const isTemplateSelected = (id: string) => {
        if (id !== selectedTemplate) return false;
        return true;
    };

    const renderProjectTemplates = () => {
        if (templates && templates.length > 0) {
            return (
                <MainContainer>
                    {templates.map((template: any) => (
                        <TemplateComponent
                            templateFileTitle={template.templateFileTitle}
                            templateSnapshot={template.templateSnapshot}
                            createdAt={template.createdAt}
                            id={template.id}
                            updatedAt={template.updatedAt}
                            key={template.id}
                            isSelected={isTemplateSelected(template.id)}
                            onSelectTemplate={() =>
                                setSelectedTemplate(template.id)
                            }
                            projectUuid={projectUuid}
                            toggleDeleteTemplateModal={
                                toggleDeleteTemplateModal
                            }
                        />
                    ))}
                </MainContainer>
            );
        }

        return (
            <NoTemplatesContainer>
                <SVGContainer>
                    <NoTemplateSVG />
                </SVGContainer>
                <TextContainer>
                    <Text text="You don't have any templates here yet." />
                </TextContainer>
            </NoTemplatesContainer>
        );
    };

    return (
        <>
            {areTemplatesLoaded ? (
                <>{renderProjectTemplates()}</>
            ) : (
                <MainContainer>
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                </MainContainer>
            )}
        </>
    );
};

export default ProjectTemplates;
