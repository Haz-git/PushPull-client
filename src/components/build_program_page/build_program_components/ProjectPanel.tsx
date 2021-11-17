import React from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { addProject } from '../../../redux/builder/builderActions';

//Components:
import Text from '../../general_components/Text';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';
import { Clock } from '@styled-icons/fluentui-system-regular/Clock';
import { DocumentCopy } from '@styled-icons/fluentui-system-regular/DocumentCopy';
import { ArrowUpload } from '@styled-icons/fluentui-system-regular/ArrowUpload';

const RecentIcon = styled(Clock)`
    height: 1.7rem;
    width: 1.7rem;
    color: rgba(0, 0, 34, 1);
`;

const DocumentIcon = styled(DocumentCopy)`
    height: 1.7rem;
    width: 1.7rem;
    color: rgba(0, 0, 34, 1);
`;

const PublishIcon = styled(ArrowUpload)`
    height: 1.7rem;
    width: 1.7rem;
    color: rgba(0, 0, 34, 1);
`;

const MainContainer = styled.section`
    background: #ffffff;
    position: fixed;
    border-right: 1px solid #d6d6d6;
    height: 100%;
    text-align: left;
    width: 20rem;
    max-width: 20rem;
`;

const ViewContainer = styled.div`
    margin: 1rem 0rem 1rem 0rem;
    border-bottom: 1px solid #d6d6d6;
`;

const ViewTextIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    padding: 0rem 0rem 1rem 0rem;
    margin: 0rem 1rem 0rem 1rem;
`;

const CreateNewProjectContainer = styled.div`
    padding: 1rem 1rem;
`;

//Interfaces:

interface IMainContainer {}

const ProjectPanel = () => {
    const dispatch = useDispatch();

    return (
        <MainContainer>
            <ViewContainer>
                <ViewTextIcon>
                    <RecentIcon />
                    <Text text="Recents" fontSize="1rem" fontWeight="500" />
                </ViewTextIcon>
                <ViewTextIcon>
                    <PublishIcon />
                    <Text text="Published" fontSize="1rem" fontWeight="500" />
                </ViewTextIcon>
                <ViewTextIcon>
                    <DocumentIcon />
                    <Text text="Drafts" fontSize="1rem" fontWeight="500" />
                </ViewTextIcon>
            </ViewContainer>
            <CreateNewProjectContainer>
                <GeneralButton
                    buttonLabel="Create New Project"
                    onClick={() =>
                        dispatch(
                            addProject((status) => console.log(status), {
                                projectName: 'testProject',
                                projectDesc: '',
                            })
                        )
                    }
                />
            </CreateNewProjectContainer>
        </MainContainer>
    );
};

export default ProjectPanel;
