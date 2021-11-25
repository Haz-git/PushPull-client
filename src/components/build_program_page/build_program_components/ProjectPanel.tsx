import React from 'react';
import { useEffect } from 'react';

//Router:
import { useParams, Link } from 'react-router-dom';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';
import { addProject } from '../../../redux/builder/builderActions';

//Components:
import Text from '../../general_components/Text';
import GeneralButton from '../../general_components/GeneralButton';
import ProjectComponent from './ProjectComponent';
import { Loader } from '@mantine/core';
import ProjectContextMenu from './ProjectContextMenu';

//Utils:
import useQuery from '../../../utils/hooks/useQuery';

//Styles:
import styled from 'styled-components';
import { Clock } from '@styled-icons/fluentui-system-regular/Clock';
import { DocumentCopy } from '@styled-icons/fluentui-system-regular/DocumentCopy';
import { ArrowUpload } from '@styled-icons/fluentui-system-regular/ArrowUpload';

const RecentIcon = styled(Clock)`
    height: 1.7rem;
    width: 1.7rem;
    color: rgba(0, 0, 34, 1);
`;

const DocumentIcon = styled(DocumentCopy)`
    height: 1.7rem;
    width: 1.7rem;
    color: rgba(0, 0, 34, 1);
`;

const PublishIcon = styled(ArrowUpload)`
    height: 1.7rem;
    width: 1.7rem;
    color: rgba(0, 0, 34, 1);
`;

const MainContainer = styled.section`
    background: #ffffff;
    position: fixed;
    border-right: 1px solid #d6d6d6;
    height: 100%;
    text-align: left;
    width: 16rem;
    max-width: 16rem;
    padding-bottom: 7rem;
    overflow-y: scroll;
`;

const ViewContainer = styled.div`
    margin: 1rem 0rem 1rem 0rem;
    border-bottom: 1px solid #d6d6d6;
`;

const ViewTextButton = styled(Link)<IViewTextButton>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    padding: 0.5rem 1rem;
    margin: 0rem 0rem 0.5rem 0rem;
    border: none;
    background: ${(props) => (props.isSelected ? '#f8dcce' : 'transparent')};
`;

const CreateNewProjectContainer = styled.div`
    padding: 1rem 1rem;
`;

const ProjectsContainer = styled.div``;

//Interfaces:

interface IViewTextButton {
    isSelected: boolean;
}

interface IComponentProps {
    toggleProjectModal: (status: boolean) => void;
    toggleRenameProjectModal: (status: boolean, projectUuid: string) => void;
    toggleRecolorProjectModal: (status: boolean, projectUuid: string) => void;
    toggleDeleteProjectModal: (status: boolean, projectUuid: string) => void;
    isCreatingNewProject: boolean;
}

const ProjectPanel = ({
    toggleProjectModal,
    isCreatingNewProject,
    toggleRenameProjectModal,
    toggleRecolorProjectModal,
    toggleDeleteProjectModal,
}: IComponentProps): JSX.Element => {
    let { dashboardView } = useParams<{ dashboardView: string }>();
    let query = useQuery();
    const { projects } = useSelector((state: RootStateOrAny) => state?.builder);

    const renderSelectedButtons = (key: string) => {
        if (dashboardView && dashboardView === key) {
            return true;
        }

        if (dashboardView === 'project') {
            let currentProjectView = query.get('uuid');
            if (currentProjectView === key) return true;
        }

        return false;
    };

    const renderBuilderProjects = () => {
        if (projects && projects.length > 0) {
            return projects.map((project: any) => (
                <ProjectComponent
                    key={project.projectUuid}
                    projectUuid={project.projectUuid}
                    createdBy={project.createdBy}
                    projectColorHex={project.projectColorHex}
                    projectDesc={project.projectDesc}
                    projectMembers={project.projectMembers}
                    projectTemplates={project.projectTemplates}
                    projectName={project.projectName}
                    updatedDate={project.updatedDate}
                    toggleDeleteProjectModal={toggleDeleteProjectModal}
                    toggleRecolorProjectModal={toggleRecolorProjectModal}
                    toggleRenameProjectModal={toggleRenameProjectModal}
                    isSelected={renderSelectedButtons(project.projectUuid)}
                />
            ));
        } else {
            return 'NO PROJECTS';
        }
    };

    return (
        <>
            <MainContainer>
                <ViewContainer>
                    <ViewTextButton
                        to={`/builder/dashboard/recents`}
                        isSelected={renderSelectedButtons('recents')}
                    >
                        <RecentIcon />
                        <Text text="Recents" fontSize="1rem" fontWeight="500" />
                    </ViewTextButton>
                    <ViewTextButton
                        to={`/builder/dashboard/published`}
                        isSelected={renderSelectedButtons('published')}
                    >
                        <PublishIcon />
                        <Text
                            text="Published"
                            fontSize="1rem"
                            fontWeight="500"
                        />
                    </ViewTextButton>
                    <ViewTextButton
                        to={`/builder/dashboard/drafts`}
                        isSelected={renderSelectedButtons('drafts')}
                    >
                        <DocumentIcon />
                        <Text text="Drafts" fontSize="1rem" fontWeight="500" />
                    </ViewTextButton>
                </ViewContainer>
                <ProjectsContainer>{renderBuilderProjects()}</ProjectsContainer>
                <CreateNewProjectContainer>
                    <GeneralButton
                        buttonLabel={
                            isCreatingNewProject
                                ? 'Creating Project...'
                                : 'Create New Project'
                        }
                        onClick={() => toggleProjectModal(true)}
                        iconMargin="0rem .3rem -.2rem 0rem"
                        buttonIcon={
                            isCreatingNewProject ? (
                                <Loader color="white" size="xs" />
                            ) : null
                        }
                        isDisabledOnLoading={isCreatingNewProject}
                    />
                </CreateNewProjectContainer>
            </MainContainer>
            <ProjectContextMenu id={'PROJECTCOMPONENTCONTEXTMENU'} />
        </>
    );
};

export default ProjectPanel;
