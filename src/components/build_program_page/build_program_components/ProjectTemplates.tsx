import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { findTemplates } from '../../../redux/templates/templateActions';

//Components:
import TemplateComponentSkeleton from './TemplateComponentSkeleton';

//Utils:
import useQuery from '../../../utils/hooks/useQuery';
import { deviceMin } from '../../../devices/breakpoints';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding-top: 1rem;

    @media ${deviceMin.mobileS} {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
    }

    @media ${deviceMin.tabletp} {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(18rem, 20rem));
        row-gap: 2rem;
    }
`;

//Interfaces:

const ProjectTemplates = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const projectUuid = query.get('uuid');
    const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

    useEffect(() => {
        dispatch(
            findTemplates(
                (status: boolean) => setIsProjectsLoaded(status),
                projectUuid
            )
        );
    }, [projectUuid]);

    return (
        <MainContainer>
            {isProjectsLoaded ? (
                <>PROJECTS LOADED</>
            ) : (
                <>
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                    <TemplateComponentSkeleton />
                </>
            )}
        </MainContainer>
    );
};

export default ProjectTemplates;
