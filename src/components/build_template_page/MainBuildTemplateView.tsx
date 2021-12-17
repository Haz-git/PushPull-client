import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import LoadProgress from '../nprogress/LoadProgress';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import {
    queryTemplate,
    clearTemplate,
} from '../../redux/templates/templateActions';

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

    useEffect(() => {
        // controlTemplateLoadingStatus(true);
        dispatch(queryTemplate(fileUuid));
    }, []);

    const isLoading = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.isLoading
    );

    console.log('isLoading from Template view', isLoading);
    const template = useSelector((state: RootStateOrAny) => state?.template);

    return (
        <>
            {isLoading === true ? (
                <div>Loading</div>
            ) : (
                <div>Template view </div>
            )}
        </>
    );
};

export default MainBuildTemplateView;
