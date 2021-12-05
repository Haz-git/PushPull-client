import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import Text from '../../general_components/Text';
import useQuery from '../../../utils/hooks/useQuery';
import ProjectInfo from './ProjectInfo';
import GeneralButton from '../../general_components/GeneralButton';
import ProjectNotFound from './ProjectNotFound';
import { Burger } from '@mantine/core';
import ProjectPanel from './ProjectPanel';
import { Transition } from '@mantine/core';

//utils:
import { deviceMin } from '../../../devices/breakpoints';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

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
    width: 100%;
`;

const BurgerContainer = styled.div``;

const ViewLabelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    top: 3.75rem;
    position: sticky;
    border-bottom: 1px solid #d6d6d6;
    margin-bottom: 1rem;
    background: #ffffff;
    z-index: 50;

    @media ${deviceMin.mobileS} {
        padding: 0.25rem 1rem;
        column-gap: 1rem;
    }

    @media ${deviceMin.tabletp} {
        padding: 1rem 0rem;
        column-gap: 1.5rem;
    }
`;

const ViewLabel = styled.div`
    @media ${deviceMin.tabletp} {
        margin-left: 2rem;
    }
`;

const TemplateButtonContainer = styled.div`
    @media ${deviceMin.mobileS} {
        margin-left: auto;
    }

    @media ${deviceMin.tabletp} {
        margin-left: 0;
    }
`;

const CustomDrawer = styled.div<CustomDrawerProps>`
    top: 7.3rem;
    position: fixed;
    z-index: 99 !important;
    margin-top: -9px;
    height: 100%;

    @media ${deviceMin.mobileS} {
        margin-top: -16px;
    }

    @media ${deviceMin.mobileM} {
        margin-top: -9px;
    }
`;
const DashboardItemContainer = styled.div`
    width: 100%;
    z-index: 30;

    @media ${deviceMin.mobileS} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media ${deviceMin.tabletp} {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0rem 1rem;
    }
`;

const TemplateContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.tabletp} {
        flex-grow: 10;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(9rem, 12rem));
    }
`;

const ProjectInformationContainer = styled.div`
    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.tabletp} {
        flex-grow: 0;
        top: 10rem;
        position: sticky;
    }
`;

const TemplateExample = styled.div`
    height: 10rem;
    width: 10rem;
    border: 1px solid black;
    margin: 1rem 1rem;
`;

//Interfaces:

interface CustomDrawerProps {
    $height: number;
}

interface IDashboardPanel {
    toggleNewDescModal: (
        status: boolean,
        projectUuid: string,
        currProjectDesc: string
    ) => void;
    toggleProjectModal: (status: boolean) => void;
    toggleRenameProjectModal: (status: boolean, projectUuid: string) => void;
    toggleRecolorProjectModal: (status: boolean, projectUuid: string) => void;
    toggleDeleteProjectModal: (status: boolean, projectUuid: string) => void;
    isCreatingNewProject: boolean;
}

const DashboardPanel = ({
    toggleNewDescModal,
    toggleProjectModal,
    isCreatingNewProject,
    toggleRenameProjectModal,
    toggleRecolorProjectModal,
    toggleDeleteProjectModal,
}: IDashboardPanel): JSX.Element => {
    let { dashboardView } = useParams<{ dashboardView: string }>();
    const { width, height } = useWindowDimensions();
    const builderProjects = useSelector(
        (state: RootStateOrAny) => state?.builderProjects
    );
    let query = useQuery();

    const [isBurgerOpened, setIsBurgerOpened] = useState(false);
    const [isProjectPanelDrawerOpened, setStateProjectDrawer] = useState(false);

    const toggleProjectDrawer = (status: boolean) => {
        setStateProjectDrawer(status);
    };

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

    const renderBurgerMenuOnMobile = () => {
        if (width && width < 1024) {
            return (
                <BurgerContainer>
                    <Burger
                        opened={isProjectPanelDrawerOpened}
                        onClick={() => setStateProjectDrawer((x) => !x)}
                        color="rgba(224, 113, 51, 1)"
                        size={22}
                    />
                </BurgerContainer>
            );
        }
    };

    const renderBtn = () => {
        if (width) {
            if (width <= 320)
                return (
                    <GeneralButton
                        buttonLabel="Template"
                        padding=".3rem .3rem"
                        width="100%"
                        hoverShadow="none"
                        hoverTransform="none"
                        hoverColor="#d6d6d6"
                        buttonBackground="#ffffff"
                        disableShadow={true}
                        textShadow="none"
                        border="1px solid #d6d6d6"
                        buttonTextColor="rgba(0, 0, 34, 1)"
                        buttonIconRight={<PlusIcon />}
                        rightIconMargin="0rem 0rem .15rem .25rem"
                        fontSize=".9rem"
                        margin="0 0"
                    />
                );

            if (width >= 360 && width <= 375)
                return (
                    <GeneralButton
                        buttonLabel="New Template"
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
                        buttonIconRight={<PlusIcon />}
                        rightIconMargin="0rem 0rem .15rem .5rem"
                        margin="0 0"
                    />
                );

            if (width > 375)
                return (
                    <GeneralButton
                        buttonLabel="New Template"
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
                );
        }
    };

    const renderNotFoundView = () => {
        if (
            (identifyIfProject() && findUserProject()) ||
            (!identifyIfProject() && dashboardView === 'recents') ||
            dashboardView === 'published' ||
            dashboardView === 'drafts'
        ) {
            return (
                <DashboardItemContainer>
                    {renderProjectInformation()}
                </DashboardItemContainer>
            );
        }

        return (
            <div>
                <ProjectNotFound />
            </div>
        );
    };

    const truncateViewLabelTextOnMobile = () => {
        if (width <= 320) return '6rem';
        if (width <= 375) return '7rem';
        if (width >= 414) return '8rem';
        if (width < 414 && width <= 1024) return '15rem';
    };

    const renderDashboardView = () => {
        return (
            <>
                <ViewLabelContainer>
                    {renderBurgerMenuOnMobile()}
                    <ViewLabel>
                        <Text
                            text={renderViewLabelText()}
                            fontSize="1.1rem"
                            fontWeight="900"
                            truncateWidth={truncateViewLabelTextOnMobile()}
                        />
                    </ViewLabel>
                    <TemplateButtonContainer>
                        {renderBtn()}
                    </TemplateButtonContainer>
                </ViewLabelContainer>
                <Transition
                    mounted={isProjectPanelDrawerOpened}
                    transition="scale-x"
                    duration={200}
                    timingFunction="ease"
                >
                    {(styles) => (
                        <CustomDrawer style={styles} $height={height}>
                            <ProjectPanel
                                toggleProjectModal={toggleProjectModal}
                                isCreatingNewProject={isCreatingNewProject}
                                toggleDeleteProjectModal={
                                    toggleDeleteProjectModal
                                }
                                toggleRecolorProjectModal={
                                    toggleRecolorProjectModal
                                }
                                toggleRenameProjectModal={
                                    toggleRenameProjectModal
                                }
                            />
                        </CustomDrawer>
                    )}
                </Transition>
                {renderNotFoundView()}
            </>
        );
    };

    const renderViewLabelText = () => {
        if (dashboardView) {
            switch (dashboardView) {
                case 'recents':
                    return 'Recents';
                case 'published':
                    return 'Published';
                case 'drafts':
                    return 'Drafts';
                case 'project':
                    let projName = query.get('name');
                    return projName || 'Project';
                default:
                    return 'Not Found';
            }
        }

        return 'Not Found';
    };

    const renderProjectInformation = () => {
        if (identifyIfProject()) {
            if (findUserProject()) {
                return (
                    <>
                        <ProjectInformationContainer>
                            <ProjectInfo
                                currProject={findUserProject()}
                                toggleNewDescModal={toggleNewDescModal}
                            />
                        </ProjectInformationContainer>
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
