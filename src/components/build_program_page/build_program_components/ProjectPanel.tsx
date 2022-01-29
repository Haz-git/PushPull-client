import React from 'react';
import { useEffect } from 'react';

//Router:
import { useParams, Link } from 'react-router-dom';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import Text from '../../general_components/Text';
import GeneralButton from '../../general_components/GeneralButton';
import ProjectComponent from './ProjectComponent';
import { Loader } from '@mantine/core';
import ProjectContextMenu from './ProjectContextMenu';

//Utils:
import useQuery from '../../../utils/hooks/useQuery';
import { deviceMin } from '../../../devices/breakpoints';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';
import { Clock } from '@styled-icons/fluentui-system-regular/Clock';
import { DocumentCopy } from '@styled-icons/fluentui-system-regular/DocumentCopy';
import { ArrowUpload } from '@styled-icons/fluentui-system-regular/ArrowUpload';
import { AppFolder } from '@styled-icons/fluentui-system-filled/AppFolder';
import { Folder } from '@styled-icons/fluentui-system-filled/Folder';
import { Add } from '@styled-icons/fluentui-system-regular/Add';

const AddIcon = styled(Add)`
    height: 1.1rem;
    width: 1.1rem;
    color: rgba(0, 0, 34, 1);
`;

const FolderIcon = styled(Folder)`
    height: 1.5rem;
    width: 1.5rem;
    color: rgba(0, 0, 34, 0.7);
`;

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

const ProjectIcon = styled(AppFolder)`
    height: 1.7rem;
    width: 1.7rem;
    color: rgba(0, 0, 34, 1);
`;

const MainContainer = styled.section<IMainContainer>`
    background: #ffffff;
    position: fixed;
    border-right: 1px solid #d6d6d6;
    height: 100%;
    text-align: left;
    padding-bottom: 7rem;
    overflow-y: scroll;
    z-index: 80;

    @media ${deviceMin.mobileS} {
        width: 11rem;
        max-width: 11rem;
    }

    @media ${deviceMin.mobileM} {
        width: 12rem;
        max-width: 12rem;
    }

    @media ${deviceMin.mobileL} {
        width: 13rem;
        max-width: 13rem;
    }

    @media ${deviceMin.browserSm} {
        width: 14rem;
        max-width: 14rem;
    }

    @media ${deviceMin.laptop} {
        width: 15rem;
        max-width: 15rem;
    }

    @media ${deviceMin.laptopL} {
        width: 16rem;
        max-width: 16rem;
    }
`;

const ViewContainer = styled.div`
    margin: 1rem 0rem 0rem 0rem;
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
    background: ${(props) => (props.$isSelected ? '#f8dcce' : 'transparent')};
`;
const ProjectsContainer = styled.div`
    padding: 1rem 0rem;
`;

const NoProjectContainer = styled.div`
    padding: 0.75rem 0.75rem;
    margin: 0rem 0.5rem 0rem 0.5rem;
    border-radius: 0.3rem;
    background: #ececec;
`;

const ProjectHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    padding: 0rem 1rem 0.5rem 1rem;
    margin: 0rem 0rem 0.5rem 0rem;
    border: none;
`;

const CreateNewProjectContainer = styled.div`
    border-top: 1px solid #d6d6d6;
    padding: 1rem 0.5rem;
`;

//Interfaces:

interface IMainContainer {
    $height: number;
}
interface IViewTextButton {
    $isSelected: boolean;
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
    const { dashboardView } = useParams<{ dashboardView: string }>();
    const { width, height } = useWindowDimensions();
    const query = useQuery();
    const builderProjects = useSelector(
        (state: RootStateOrAny) => state?.builderProjects
    );

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
        if (builderProjects && builderProjects.length > 0) {
            return builderProjects.map((project: any) => (
                <ProjectComponent
                    key={project.id}
                    projectUuid={project.id}
                    createdBy={project.createdBy}
                    projectColorHex={project.projectColor}
                    projectDesc={project.projectDesc}
                    projectMembers={project.projectMembers}
                    projectTemplates={project.projectTemplates}
                    projectName={project.projectName}
                    updatedDate={project.updatedDate}
                    toggleDeleteProjectModal={toggleDeleteProjectModal}
                    toggleRecolorProjectModal={toggleRecolorProjectModal}
                    toggleRenameProjectModal={toggleRenameProjectModal}
                    isSelected={renderSelectedButtons(project.id)}
                />
            ));
        } else {
            return (
                <NoProjectContainer>
                    <Text text="No Projects" subText={true} />
                </NoProjectContainer>
            );
        }
    };

    const truncateBtnLabel = (label: 'DEFAULT' | 'INPROGRESS') => {
        if (label !== 'INPROGRESS') {
            if (width && width < 1440) return 'New Project';
            return 'Create New Project';
        }

        if (width && width < 1440) return 'Creating...';
        return 'Creating Project...';
    };

    return (
        <>
            <MainContainer $height={height}>
                <ViewContainer>
                    <ViewTextButton
                        to={`/builder/dashboard/recents`}
                        $isSelected={renderSelectedButtons('recents')}
                    >
                        <RecentIcon />
                        <Text text="Recents" fontSize="1rem" fontWeight="500" />
                    </ViewTextButton>
                    <ViewTextButton
                        to={`/builder/dashboard/published`}
                        $isSelected={renderSelectedButtons('published')}
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
                        $isSelected={renderSelectedButtons('drafts')}
                    >
                        <DocumentIcon />
                        <Text text="Drafts" fontSize="1rem" fontWeight="500" />
                    </ViewTextButton>
                </ViewContainer>
                <ProjectsContainer>
                    <ProjectHeader>
                        <ProjectIcon />
                        <Text
                            text="Projects"
                            fontSize="1rem"
                            fontWeight="500"
                        />
                    </ProjectHeader>
                    {renderBuilderProjects()}
                </ProjectsContainer>
                <CreateNewProjectContainer>
                    <GeneralButton
                        buttonLabel={
                            isCreatingNewProject
                                ? truncateBtnLabel('INPROGRESS')
                                : truncateBtnLabel('DEFAULT')
                        }
                        onClick={() => toggleProjectModal(true)}
                        rightIconMargin="0rem 0rem .1rem .5rem"
                        buttonIconRight={
                            isCreatingNewProject ? (
                                <Loader color="white" size="xs" />
                            ) : (
                                <AddIcon />
                            )
                        }
                        buttonIconLeft={<FolderIcon />}
                        leftIconMargin="0rem .5rem 0rem 0rem"
                        isDisabledOnLoading={isCreatingNewProject}
                        padding=".4rem .2rem"
                        width="100%"
                        hoverShadow="none"
                        hoverTransform="none"
                        hoverColor="#d6d6d6"
                        buttonBackground="#ffffff"
                        disableShadow={true}
                        textShadow="none"
                        border="1px solid #d6d6d6"
                        buttonTextColor="rgba(0, 0, 34, 1)"
                    />
                </CreateNewProjectContainer>
            </MainContainer>
            <ProjectContextMenu id={'PROJECTCOMPONENTCONTEXTMENU'} />
        </>
    );
};

export default ProjectPanel;
