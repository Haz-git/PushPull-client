import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { findTemplates } from '../../../redux/templates/templateActions';

//Components:
import TemplateComponent from './TemplateComponent';
import TemplateComponentSkeleton from './TemplateComponentSkeleton';

//Utils:
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

interface IComponentProps {
    projectUuid: string | null;
    dashboardTemplatesLoadedCallback: (status: boolean) => void;
}

const ProjectTemplates = ({
    projectUuid,
    dashboardTemplatesLoadedCallback,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const templates = useSelector(
        (state: RootStateOrAny) => state?.projectTemplates
    );

    //Loader State:
    const [areTemplatesLoaded, setAreTemplatesLoaded] = useState(false);

    useEffect(() => {
        if (areTemplatesLoaded) setAreTemplatesLoaded(!areTemplatesLoaded);
        dispatch(
            findTemplates(
                (status: boolean) => setAreTemplatesLoaded(status),
                dashboardTemplatesLoadedCallback,
                projectUuid
            )
        );
    }, [projectUuid]);

    const renderProjectTemplates = () => {
        if (templates && templates.length > 0) {
            return templates.map((template: any) => (
                <TemplateComponent
                    templateFileTitle={template.templateFileTitle}
                    createdAt={template.createdAt}
                    id={template.id}
                    updatedAt={template.updatedAt}
                    key={template.id}
                />
            ));
        }

        return <>NO TEMPLATES</>;
    };

    return (
        <MainContainer>
            {areTemplatesLoaded ? (
                <>{renderProjectTemplates()}</>
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
