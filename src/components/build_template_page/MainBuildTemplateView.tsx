import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import LoadProgress from '../nprogress/LoadProgress';
import Toolbar from './build_template_components/Toolbar';
import EditingSurface from './build_template_components/EditingSurface';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { queryTemplate } from '../../redux/templates/templateActions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    background: #ffffff;
    width: 100%;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
    }

    @media ${deviceMin.laptop} {
        height: 100%;
        display: grid;
        grid-template-columns: 12rem auto;
        overflow: visible;
        padding: 0rem 0rem 2rem 0rem;
    }

    @media ${deviceMin.laptopL} {
        grid-template-columns: 16rem auto;
    }
`;

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
                <MainContainer>
                    <Toolbar />
                    <EditingSurface />
                </MainContainer>
            )}
        </>
    );
};

export default MainBuildTemplateView;
