import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import { DragDropContext } from 'react-beautiful-dnd';
import LoadProgress from '../nprogress/LoadProgress';
import Toolbar from './build_template_components/Toolbar';
import EditingSurface from './build_template_components/EditingSurface';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import GeneralModal from '../general_components/GeneralModal';
import AddBlockForm from './build_template_components/AddBlockForm';
import { v4 as uuid } from 'uuid';

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

//Helper Functions: For DragDropContext

//Fake data gen:
const getItems = (count: any, prefix: any) =>
    Array.from({ length: count }, (v, k) => k).map((k) => {
        const randomId = uuid();
        return {
            id: `item-${randomId}`,
            prefix,
            content: `item ${randomId}`,
        };
    });

const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

const lists = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

const generateLists = () =>
    //getItems(10, listKey) <- Pass this into empty array below to provide dummy data.
    lists.reduce((acc, listKey) => ({ ...acc, [listKey]: [] }), {});

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

    //Elements for drag drop context:
    const [elements, setElements] = useState(generateLists()) as any;

    useEffect(() => {
        // controlTemplateLoadingStatus(true);
        setElements(generateLists());
        dispatch(queryTemplate(fileUuid));
    }, []);

    const isLoading = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.isLoading
    );
    const [isPanningDisabled, setStatePanning] = useState(true);
    const togglePanningStatus = () => setStatePanning(!isPanningDisabled);

    const [openBlockModal, setOpenBlockModal] = useState(false);
    const controlBlockModal = (state: boolean) => setOpenBlockModal(state);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...(elements as any) };

        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );

        setElements(listCopy);
    };

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
                        <AddBlockForm
                            closeModal={() => setOpenBlockModal(false)}
                        />
                    </GeneralModal>
                    <MainContainer>
                        <DragDropContext onDragEnd={onDragEnd}>
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
                        </DragDropContext>
                    </MainContainer>
                </>
            )}
        </>
    );
};

export default MainBuildTemplateView;
