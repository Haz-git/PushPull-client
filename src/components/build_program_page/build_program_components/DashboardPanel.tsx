import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
import useQuery from '../../../utils/hooks/useQuery';

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
    flex-grow: 4;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 12rem));
`;

const ProjectInformationContainer = styled.div`
    padding: 1rem 1rem;
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
    let query = useQuery();

    const renderViewLabel = () => {
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

    return (
        <MainContainer>
            <ViewLabelContainer>
                <ViewLabel>
                    <Text
                        text={renderViewLabel()}
                        fontSize="1.1rem"
                        fontWeight="900"
                    />
                </ViewLabel>
            </ViewLabelContainer>
            <DashboardItemContainer>
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
                    Project Info here
                </ProjectInformationContainer>
            </DashboardItemContainer>
        </MainContainer>
    );
};

export default DashboardPanel;
