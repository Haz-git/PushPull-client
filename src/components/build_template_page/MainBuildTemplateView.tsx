import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import LoadProgress from '../nprogress/LoadProgress';
import Toolbar from './build_template_components/Toolbar';

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

    useEffect(() => {
        // controlTemplateLoadingStatus(true);
        dispatch(queryTemplate(fileUuid));
    }, []);

    const isLoading = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.isLoading
    );

    const template = useSelector((state: RootStateOrAny) => state?.template);

    return (
        <>
            {isLoading === true ? (
                <LoadProgress
                    darkMode={true}
                    isAnimating={true}
                    loadingText="Generating Template..."
                    minimum={50}
                />
            ) : (
                <>
                    <Toolbar />
                    <div>Template view </div>
                </>
            )}
        </>
    );
};

export default MainBuildTemplateView;
