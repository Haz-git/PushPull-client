import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
import { ColorSwatch } from '@mantine/core';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 0.75rem 0.75rem;
    border: 1px solid black;
    margin: 0rem 0rem 1rem 0rem;
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
    column-gap: 2rem;
`;

const SwatchContainer = styled.div`
    width: 20px;
    height: 20px;
`;

//Interfaces:
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
}

const ProjectComponent = ({
    createdBy,
    projectColorHex,
    projectDesc,
    projectMembers,
    projectTemplates,
    projectName,
    updatedDate,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <ProjectHeaderWrapper>
                <HeaderContainer>
                    <SwatchContainer>
                        <ColorSwatch
                            size={20}
                            radius={50}
                            color={`#${projectColorHex}`}
                        />
                    </SwatchContainer>
                    <Text text={projectName} fontSize="1rem" />
                </HeaderContainer>
            </ProjectHeaderWrapper>
        </MainContainer>
    );
};

export default ProjectComponent;
