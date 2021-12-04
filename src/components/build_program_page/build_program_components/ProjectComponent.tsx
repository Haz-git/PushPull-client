import * as React from 'react';
import { isMobile } from 'react-device-detect';

//Components:
import Text from '../../general_components/Text';
import { ColorSwatch } from '@mantine/core';
import { useContextMenu } from 'react-contexify';

//Styles:
import styled from 'styled-components';
import historyObject from '../../../utils/historyObject';

const MainContainer = styled.div<IMainContainerProps>`
    display: block;
    padding: 0.75rem 0.75rem;
    margin: 0rem 0.5rem 0.5rem 0.5rem;
    background: ${(props) => (props.$isSelected ? '#f8dcce' : '#ffffff')};
    border-radius: 0.2rem;
    border: none;
    text-decoration: none;

    box-shadow: ${(props) =>
        props.$isSelected
            ? 'none'
            : 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'};
`;

const ProjectHeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    cursor: default;
`;

const SwatchContainer = styled.div`
    width: 20px;
    height: 20px;
`;

//Interfaces:
interface IMainContainerProps {
    $isSelected: boolean;
}

interface IComponentProps {
    createdBy: {
        createdDate: string;
        userfrontUserId: number;
        username: string;
        userImage: string;
    };
    projectColorHex: string;
    projectDesc: string;
    projectMembers: any[];
    projectTemplates: any[];
    projectName: string;
    updatedDate: string;
    projectUuid: string;
    toggleRenameProjectModal: (status: boolean, projectUuid: string) => void;
    toggleRecolorProjectModal: (status: boolean, projectUuid: string) => void;
    toggleDeleteProjectModal: (status: boolean, projectUuid: string) => void;
    isSelected: boolean;
}

const ProjectComponent = ({
    createdBy,
    projectColorHex,
    projectDesc,
    projectMembers,
    projectTemplates,
    projectName,
    projectUuid,
    updatedDate,
    toggleRenameProjectModal,
    toggleRecolorProjectModal,
    toggleDeleteProjectModal,
    isSelected = false,
}: IComponentProps): JSX.Element => {
    const MENU_ID = 'PROJECTCOMPONENTCONTEXTMENU';
    const { show } = useContextMenu({
        id: MENU_ID,
        props: {
            projectUuid,
            toggleRenameProjectModal,
            toggleRecolorProjectModal,
            toggleDeleteProjectModal,
        },
    });

    const componentClickHandler = (e: React.MouseEvent) => {
        historyObject.push(
            `/builder/dashboard/project?name=${projectName}&uuid=${projectUuid}`
        );
    };

    const displayContextMenu = (event: React.MouseEvent) => {
        if (event.cancelable) event.preventDefault();
        show(event);
    };

    return (
        <MainContainer
            onContextMenu={displayContextMenu}
            $isSelected={isSelected}
            onClick={componentClickHandler}
        >
            <ProjectHeaderWrapper>
                <HeaderContainer>
                    <SwatchContainer>
                        <ColorSwatch
                            size={20}
                            radius={3}
                            color={`${projectColorHex}`}
                        />
                    </SwatchContainer>
                    <Text
                        text={projectName}
                        fontSize="1rem"
                        truncateWidth="10rem"
                    />
                </HeaderContainer>
            </ProjectHeaderWrapper>
        </MainContainer>
    );
};

export default ProjectComponent;
