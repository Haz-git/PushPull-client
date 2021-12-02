import * as React from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import Text from '../../general_components/Text';
import useQuery from '../../../utils/hooks/useQuery';
import ProjectInfo from './ProjectInfo';
import GeneralButton from '../../general_components/GeneralButton';

//Router:
import { useParams } from 'react-router-dom';
//Styles:
import styled from 'styled-components';
import { Template } from '@styled-icons/heroicons-solid/Template';
import { Plus } from '@styled-icons/heroicons-solid/Plus';

const TemplateIcon = styled(Template)`
    height: 1.5rem;
    width: 1.5rem;
    color: #e07133;
`;

const PlusIcon = styled(Plus)`
    height: 1.1rem;
    width: 1.1rem;
    color: rgba(0, 0, 34, 0.7);
`;

const MainContainer = styled.section`
    background: #ffffff;
    height: 100%;
    width: 100%;
`;

const ViewLabelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    top: 3.75rem;
    position: sticky;
    border-bottom: 1px solid #d6d6d6;
    padding: 1rem 0rem;
    margin-bottom: 1rem;
    background: #ffffff;
    z-index: 50;
    column-gap: 1.5rem;
`;

const ViewLabel = styled.div`
    margin-left: 2rem;
`;

const TemplateButtonContainer = styled.div``;

const DashboardItemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`;

const TemplateContainer = styled.div`
    flex-grow: 10;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 12rem));
`;

const ProjectInformationContainer = styled.div`
    flex-grow: 0;
    top: 10rem;
    position: sticky;
`;

const TemplateExample = styled.div`
    height: 10rem;
    width: 10rem;
    border: 1px solid black;
    margin: 1rem 1rem;
`;

//Interfaces:

interface IDashboardPanel {
    toggleNewDescModal: (
        status: boolean,
        projectUuid: string,
        currProjectDesc: string
    ) => void;
}

const DashboardPanel = ({
    toggleNewDescModal,
}: IDashboardPanel): JSX.Element => {
    let { dashboardView } = useParams<{ dashboardView: string }>();
    const builderProjects = useSelector(
        (state: RootStateOrAny) => state?.builderProjects
    );
    let query = useQuery();

    const identifyIfProject = () => {
        if (dashboardView === 'project') return true;
        return false;
    };

    const findUserProject = () => {
        let projectUuid = query.get('uuid');
        let targetProject = builderProjects.find(
            (project: any) => project.id === projectUuid
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
                        <TemplateButtonContainer>
                            <GeneralButton
                                buttonLabel="New Template File"
                                leftIconMargin="0rem .5rem 0rem 0rem"
                                padding=".4rem .4rem"
                                width="100%"
                                hoverShadow="none"
                                hoverTransform="none"
                                hoverColor="#d6d6d6"
                                buttonBackground="#ffffff"
                                disableShadow={true}
                                textShadow="none"
                                border="1px solid #d6d6d6"
                                buttonTextColor="rgba(0, 0, 34, 1)"
                                buttonIconLeft={<TemplateIcon />}
                                buttonIconRight={<PlusIcon />}
                                rightIconMargin="0rem 0rem .15rem .5rem"
                                margin="0 0"
                            />
                        </TemplateButtonContainer>
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
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
                            <TemplateExample />
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
                            <ProjectInfo
                                currProject={findUserProject()}
                                toggleNewDescModal={toggleNewDescModal}
                            />
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
