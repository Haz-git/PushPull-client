import * as React from 'react';
import { useState } from 'react';

//Components:
import { Avatar, ColorSwatch } from '@mantine/core';
import Text from '../../general_components/Text';
import GeneralButton from '../../general_components/GeneralButton';
import DividerLine from '../../general_components/DividerLine';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

//Utils:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Redux:
import { useDispatch } from 'react-redux';

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
    margin: 0rem 1.5rem 0rem 1.5rem;
    border-radius: 0.4rem;
    background: #f1f1f1;
    width: 25rem;
    max-width: 25rem;
`;

const InfoHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    margin-bottom: 1.5rem;
    min-width: 0;
    width: 100%;
`;

const InfoSwatch = styled.div`
    flex-grow: 0;
`;

const InfoHeader = styled.div`
    flex-grow: 8;
    min-width: 0;
    width: 100%;
    word-break: break-word;
`;

const InfoDesc = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    column-gap: 0.5rem;
    width: 100%;
    min-width: 0;
`;
const EditButton = styled.button`
    flex-grow: 0;
    padding: 0.2rem 0.2rem;
    border-radius: 50%;
    border: 1px solid #d6d6d6;

    &:hover {
        background: #d6d6d6;
    }
`;

const DescContainer = styled.div<StyledProps>`
    flex-grow: 8;
    overflow-y: scroll;
    max-height: ${(props) => `${props.height - 420}px`};
    font-size: 1rem;
    font-weight: 600;
    color: rgba(0, 0, 34, 0.7);
    min-width: 0;
    width: 15rem;
    white-space: pre-wrap;
`;

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

interface StyledProps {
    height: number;
}

interface IComponentProps {
    currProject: any;
    toggleNewDescModal: (
        status: boolean,
        projectUuid: string,
        currProjectDesc: string
    ) => void;
}

const ProjectInfo = ({
    currProject,
    toggleNewDescModal,
}: IComponentProps): JSX.Element => {
    dayjs.extend(LocalizedFormat);
    const { height } = useWindowDimensions();
    const {
        projectColor,
        projectDesc,
        projectMembers,
        projectName,
        projectTemplates,
        updatedDate,
        createdBy,
        id,
    } = currProject;

    const renderProjectDesc = () => {
        if (projectDesc !== '')
            return (
                <>
                    <DescContainer height={height}>{projectDesc}</DescContainer>
                    <EditButton
                        onClick={() =>
                            toggleNewDescModal(true, id, projectDesc)
                        }
                    >
                        <EditIcon />
                    </EditButton>
                </>
            );

        return (
            <GeneralButton
                buttonLabel="Add a description"
                leftIconMargin="0rem .5rem .1rem 0rem"
                padding=".3rem 0rem"
                width="12rem"
                hoverShadow="none"
                hoverTransform="none"
                hoverColor="#d6d6d6"
                buttonBackground="#ffffff"
                disableShadow={true}
                buttonIconLeft={<EditIcon />}
                textShadow="none"
                border="1px solid #d6d6d6"
                buttonTextColor="rgba(0, 0, 34, .7)"
                fontSize="1rem"
                onClick={() => toggleNewDescModal(true, id, projectDesc)}
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
                    <ColorSwatch size={35} radius={5} color={projectColor} />
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
                    <Text text="Created By" fontSize="1rem" fontWeight="700" />
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
