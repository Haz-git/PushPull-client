import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import LoadProgress from '../nprogress/LoadProgress';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { queryTemplate } from '../../redux/templates/templateActions';

//Styles:

//Interfaces:

interface IComponentProps {
    match: {
        params: {
            fileUuid: string;
        };
    };
}

const MainBuildTemplateView = ({
    match: {
        params: { fileUuid },
    },
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);

    useEffect(() => {
        dispatch(
            queryTemplate(fileUuid, (status: boolean) =>
                setIsTemplateLoaded(status)
            )
        );
    }, []);

    const template = useSelector((state: RootStateOrAny) => state?.template);

    return <>template view</>;
};

export default MainBuildTemplateView;
