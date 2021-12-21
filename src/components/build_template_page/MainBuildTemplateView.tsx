import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import LoadProgress from '../nprogress/LoadProgress';
import Toolbar from './build_template_components/Toolbar';
import EditingSurface from './build_template_components/EditingSurface';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import GeneralModal from '../general_components/GeneralModal';
import AddBlockForm from './build_template_components/AddBlockForm';

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
    const [isPanningDisabled, setStatePanning] = useState(true);
    const togglePanningStatus = () => setStatePanning(!isPanningDisabled);

    const [openBlockModal, setOpenBlockModal] = useState(false);
    const controlBlockModal = (state: boolean) => setOpenBlockModal(state);

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
                    <GeneralModal
                        openBoolean={openBlockModal}
                        closeFunc={() => setOpenBlockModal(false)}
                    >
                        <AddBlockForm />
                    </GeneralModal>
                    <MainContainer>
                        <Toolbar
                            controlBlockModal={controlBlockModal}
                            togglePanningStatus={togglePanningStatus}
                            isPanningDisabled={isPanningDisabled}
                        />
                        <TransformWrapper
                            panning={{ disabled: isPanningDisabled }}
                        >
                            <TransformComponent>
                                <EditingSurface />
                            </TransformComponent>
                        </TransformWrapper>
                    </MainContainer>
                </>
            )}
        </>
    );
};

export default MainBuildTemplateView;
