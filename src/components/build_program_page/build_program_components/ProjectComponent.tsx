import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
import { ColorSwatch } from '@mantine/core';
import { useContextMenu } from 'react-contexify';
import { Transition } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import historyObject from '../../../utils/historyObject';

const MainContainer = styled.div<IMainContainerProps>`
    padding: 0.75rem 0.75rem;
    border: 1px solid black;
    margin: 0rem 0rem 1rem 0rem;
    background: ${(props) => (props.$isSelected ? '#f8dcce' : 'transparent')};
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

    const displayContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        show(event);
    };

    const componentClickHandler = (e: React.MouseEvent) => {
        historyObject.push(`/builder/dashboard/project?uuid=${projectUuid}`);
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
                            radius={50}
                            color={`${projectColorHex}`}
                        />
                    </SwatchContainer>
                    <Text
                        text={projectName}
                        fontSize="1rem"
                        truncateWidth="9rem"
                    />
                </HeaderContainer>
            </ProjectHeaderWrapper>
        </MainContainer>
    );
};

export default ProjectComponent;
