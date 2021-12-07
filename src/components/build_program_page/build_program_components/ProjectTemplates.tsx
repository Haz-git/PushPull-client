import * as React from 'react';
import { useState, useEffect } from 'react';

//Redux:
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { findTemplates } from '../../../redux/templates/templateActions';

//Components:

//Utils:
import useQuery from '../../../utils/hooks/useQuery';

//Styles:

//Interfaces:

const ProjectTemplates = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

    useEffect(() => {
        dispatch(
            findTemplates(
                (status: boolean) => setIsProjectsLoaded(status),
                query.get('uuid')
            )
        );
    }, []);

    return <div>Project Templates...</div>;
};

export default ProjectTemplates;
