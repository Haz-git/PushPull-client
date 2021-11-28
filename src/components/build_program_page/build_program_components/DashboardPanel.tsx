import * as React from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import Text from '../../general_components/Text';
import useQuery from '../../../utils/hooks/useQuery';
import ProjectInfo from './ProjectInfo';

//Router:
import { useParams } from 'react-router-dom';
//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    background: #ffffff;
    height: 100%;
    width: 100%;
`;

const ViewLabelContainer = styled.div`
    border-bottom: 1px solid #d6d6d6;
    padding: 1rem 0rem;
    margin-bottom: 1rem;
`;

const ViewLabel = styled.div`
    margin-left: 2rem;
`;

const DashboardItemContainer = styled.div`
    width; 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

const TemplateContainer = styled.div`
    flex-grow: 10;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 12rem));
`;

const ProjectInformationContainer = styled.div`
    flex-grow: 1;
`;

const TemplateExample = styled.div`
    height: 10rem;
    width: 10rem;
    border: 1px solid black;
    margin: 1rem 1rem;
`;

//Interfaces:

const DashboardPanel = () => {
    let { dashboardView } = useParams<{ dashboardView: string }>();
    const { projects } = useSelector((state: RootStateOrAny) => state?.builder);
    let query = useQuery();

    const identifyIfProject = () => {
        if (dashboardView === 'project') return true;
        return false;
    };

    const findUserProject = () => {
        let projectUuid = query.get('uuid');
        let targetProject = projects.find(
            (project: any) => project.projectUuid === projectUuid
        );
        if (targetProject) return targetProject;
    };

    const renderDashboardView = () => {
        if (
            (identifyIfProject() && findUserProject()) ||
            (!identifyIfProject() && dashboardView === 'recents') ||
            dashboardView === 'published' ||
            dashboardView === 'drafts'
        ) {
            return (
                <>
                    <ViewLabelContainer>
                        <ViewLabel>
                            <Text
                                text={renderViewLabelText()}
                                fontSize="1.1rem"
                                fontWeight="900"
                            />
                        </ViewLabel>
                    </ViewLabelContainer>
                    <DashboardItemContainer>
                        {renderProjectInformation()}
                    </DashboardItemContainer>
                </>
            );
        }

        return 'Project not found. Either this project does not exist, has been deleted, or the link is incorrect.';
    };

    const renderViewLabelText = () => {
        if (dashboardView) {
            switch (dashboardView) {
                case 'recents':
                    return 'Recently Viewed';
                case 'published':
                    return 'Published Templates';
                case 'drafts':
                    return 'Drafts In Progress';
                case 'project':
                    let projName = query.get('name');
                    return projName || 'Project';
                default:
                    return undefined;
            }
        }

        return undefined;
    };

    const renderProjectInformation = () => {
        if (identifyIfProject()) {
            if (findUserProject()) {
                return (
                    <>
                        <TemplateContainer>
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                        </TemplateContainer>
                        <ProjectInformationContainer>
                            <ProjectInfo currProject={findUserProject()} />
                        </ProjectInformationContainer>
                    </>
                );
            }
        }

        return (
            <TemplateContainer>
                <TemplateExample />
                <TemplateExample />
                <TemplateExample />
                <TemplateExample />
                <TemplateExample />
                <TemplateExample />
                <TemplateExample />
                <TemplateExample />
            </TemplateContainer>
        );
    };

    return <MainContainer>{renderDashboardView()}</MainContainer>;
};

export default DashboardPanel;
