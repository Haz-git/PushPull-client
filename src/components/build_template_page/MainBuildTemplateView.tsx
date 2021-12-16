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
}

const MainBuildTemplateView = ({
    isTemplateLoading,
    controlTemplateLoadingStatus,
    match: {
        params: { fileUuid },
    },
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        controlTemplateLoadingStatus(true);
        dispatch(queryTemplate(fileUuid, controlTemplateLoadingStatus));
    }, []);

    const template = useSelector((state: RootStateOrAny) => state?.template);

    return (
        <>
            {!isTemplateLoading ? (
                <div>Template view </div>
            ) : (
                <div>loading</div>
            )}
        </>
    );
};

export default MainBuildTemplateView;
