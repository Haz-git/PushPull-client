import React from 'react';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';
import { addProject } from '../../../redux/builder/builderActions';

//Components:
import Text from '../../general_components/Text';
import GeneralButton from '../../general_components/GeneralButton';
import ProjectComponent from './ProjectComponent';
import { Loader } from '@mantine/core';
import ProjectContextMenu from './ProjectContextMenu';

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
    width: 20rem;
    max-width: 20rem;
    padding-bottom: 7rem;
    overflow-y: scroll;
`;

const ViewContainer = styled.div`
    margin: 1rem 0rem 1rem 0rem;
    border-bottom: 1px solid #d6d6d6;
`;

const ViewTextIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    padding: 0rem 0rem 1rem 0rem;
    margin: 0rem 1rem 0rem 1rem;
`;

const CreateNewProjectContainer = styled.div`
    padding: 1rem 1rem;
`;

const ProjectsContainer = styled.div``;

//Interfaces:

interface IComponentProps {
    toggleProjectModal: (status: boolean) => void;
    toggleRenameProjectModal: (status: boolean) => void;
    toggleRecolorProjectModal: (status: boolean) => void;
    toggleDeleteProjectModal: (status: boolean) => void;
    isCreatingNewProject: boolean;
}

const ProjectPanel = ({
    toggleProjectModal,
    isCreatingNewProject,
    toggleRenameProjectModal,
    toggleRecolorProjectModal,
    toggleDeleteProjectModal,
}: IComponentProps): JSX.Element => {
    const { projects } = useSelector((state: RootStateOrAny) => state?.builder);

    const renderBuilderProjects = () => {
        if (projects.length > 0) {
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
                    <ViewTextIcon>
                        <RecentIcon />
                        <Text text="Recents" fontSize="1rem" fontWeight="500" />
                    </ViewTextIcon>
                    <ViewTextIcon>
                        <PublishIcon />
                        <Text
                            text="Published"
                            fontSize="1rem"
                            fontWeight="500"
                        />
                    </ViewTextIcon>
                    <ViewTextIcon>
                        <DocumentIcon />
                        <Text text="Drafts" fontSize="1rem" fontWeight="500" />
                    </ViewTextIcon>
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
