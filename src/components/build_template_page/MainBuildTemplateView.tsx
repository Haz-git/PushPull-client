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
    controlTemplateLoadingStatus: (status: boolean) => void;
    isTemplateLoading: boolean;
    match: {
        params: {
            fileUuid: string;
        };
    };
    rest: any;
}

const MainBuildTemplateView = ({
    match: {
        params: { fileUuid },
    },
    ...rest
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        // controlTemplateLoadingStatus(true);
        dispatch(
            queryTemplate(fileUuid, (status: boolean) => console.log(status))
        );
    }, []);

    const template = useSelector((state: RootStateOrAny) => state?.template);

    return (
        <>
            <div>Template view </div>
        </>
    );
};

export default MainBuildTemplateView;
