import * as React from 'react';

//Components:
import { ColorSwatch } from '@mantine/core';
import Text from '../../general_components/Text';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';
import { Add } from '@styled-icons/fluentui-system-regular/Add';

const AddIcon = styled(Add)`
    height: 1.25rem;
    width: 1.25rem;
    color: rgba(0, 0, 34, 0.7);
`;

const MainContainer = styled.div`
    padding: 1rem 1rem;
`;

const InfoHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    margin-bottom: 1.5rem;
`;

const InfoSwatch = styled.div``;

const InfoHeader = styled.div``;

const InfoDesc = styled.div``;

//Interfaces:

interface IComponentProps {
    currProject: any;
}

const ProjectInfo = ({ currProject }: IComponentProps): JSX.Element => {
    const {
        projectColorHex,
        projectDesc,
        projectMembers,
        projectName,
        projectTemplates,
        updatedDate,
        createdBy,
    } = currProject;

    const renderProjectDesc = () => {
        if (projectDesc !== '')
            return <Text text={projectDesc} fontSize="1rem" fontWeight="500" />;

        return (
            <GeneralButton
                buttonLabel="Add a description"
                iconMargin="0rem 1rem .1rem 0rem"
                padding=".3rem 0rem"
                width="12rem"
                hoverShadow="none"
                hoverTransform="none"
                hoverColor="#d6d6d6"
                buttonBackground="#ffffff"
                disableShadow={true}
                buttonIcon={<AddIcon />}
                textShadow="none"
                border="1px solid #d6d6d6"
                buttonTextColor="rgba(0, 0, 34, .7)"
                fontSize="1rem"
            />
        );
    };

    return (
        <MainContainer>
            <InfoHeaderContainer>
                <InfoSwatch>
                    <ColorSwatch size={35} radius={5} color={projectColorHex} />
                </InfoSwatch>
                <InfoHeader>
                    <Text
                        text={projectName}
                        fontSize="1.5rem"
                        fontWeight="800"
                        mainText={true}
                    />
                </InfoHeader>
            </InfoHeaderContainer>
            <InfoDesc>{renderProjectDesc()}</InfoDesc>
        </MainContainer>
    );
};

export default ProjectInfo;
