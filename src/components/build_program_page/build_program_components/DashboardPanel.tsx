import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

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

//Interfaces:

const DashboardPanel = () => {
    let { dashboardView } = useParams<{ dashboardView: string }>();

    const renderViewLabel = () => {
        if (dashboardView) {
            switch (dashboardView) {
                case 'recents':
                    return 'Recently Viewed';
                case 'published':
                    return 'Published Templates';
                case 'drafts':
                    return 'Drafts In Progress';
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
        </MainContainer>
    );
};

export default DashboardPanel;
