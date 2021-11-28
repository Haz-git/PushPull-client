import * as React from 'react';

//Components:
import { Avatar, ColorSwatch } from '@mantine/core';
import Text from '../../general_components/Text';
import GeneralButton from '../../general_components/GeneralButton';
import DividerLine from '../../general_components/DividerLine';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

//Styles:
import styled from 'styled-components';
import { Edit } from '@styled-icons/fluentui-system-filled/Edit';

const EditIcon = styled(Edit)`
    height: 1.25rem;
    width: 1.25rem;
    color: rgba(0, 0, 34, 0.7);
`;

const MainContainer = styled.div`
    padding: 1rem 1rem;
    margin: 0rem 1rem 0rem 1rem;
    border-radius: 0.4rem;
    background: #f1f1f1;
`;

const InfoHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    margin-bottom: 1.5rem;
    max-width: 16rem;
`;

const InfoSwatch = styled.div`
    flex-grow: 1;
`;

const InfoHeader = styled.div`
    flex-grow: 2;
`;

const InfoDesc = styled.div``;

const CreatedBy = styled.div``;

const CreatedByHeader = styled.div`
    margin-bottom: 1rem;
`;

const CreatedByBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

//Interfaces:

interface IComponentProps {
    currProject: any;
}

const ProjectInfo = ({ currProject }: IComponentProps): JSX.Element => {
    dayjs.extend(LocalizedFormat);
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
            return (
                <Text
                    text={projectDesc}
                    fontSize="1.05rem"
                    fontWeight="600"
                    subText={true}
                />
            );

        return (
            <GeneralButton
                buttonLabel="Add a description"
                iconMargin="0rem .5rem .1rem 0rem"
                padding=".3rem 0rem"
                width="12rem"
                hoverShadow="none"
                hoverTransform="none"
                hoverColor="#d6d6d6"
                buttonBackground="#ffffff"
                disableShadow={true}
                buttonIcon={<EditIcon />}
                textShadow="none"
                border="1px solid #d6d6d6"
                buttonTextColor="rgba(0, 0, 34, .7)"
                fontSize="1rem"
            />
        );
    };

    const processTime = (time: string) => {
        if (time) return dayjs(time).format('LLLL');
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
                        fontSize="1.25rem"
                        fontWeight="800"
                        mainText={true}
                    />
                </InfoHeader>
            </InfoHeaderContainer>
            <InfoDesc>{renderProjectDesc()}</InfoDesc>
            <DividerLine
                border="1px solid #d6d6d6"
                margin="1.5rem 0rem 1.5rem 0rem"
            />
            <CreatedBy>
                <CreatedByHeader>
                    <Text text="Created By" fontSize="1rem" fontWeight="800" />
                </CreatedByHeader>
                <CreatedByBox>
                    <Avatar
                        src={createdBy.userImage}
                        size="sm"
                        alt="User image"
                        radius="xl"
                    />
                    <Text text={createdBy.username} fontSize="1rem" />
                </CreatedByBox>
                <Text
                    text={processTime(createdBy.createdDate)}
                    fontSize="1rem"
                    subText={true}
                />
            </CreatedBy>
        </MainContainer>
    );
};

export default ProjectInfo;
