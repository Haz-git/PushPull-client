import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import { DragDropContext } from 'react-beautiful-dnd';
import LoadProgress from '../nprogress/LoadProgress';
import Toolbar from './build_template_components/Toolbar';
import EditingSurface from './build_template_components/EditingSurface';
import GeneralModal from '../general_components/GeneralModal';
import AddBlockForm from './build_template_components/AddBlockForm';
import { v4 as uuid } from 'uuid';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { queryTemplate } from '../../redux/templates/templateActions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section``;

const EditingSurfaceGridWrapper = styled.div`
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
            id: `${randomId}`,
            prefix,
            content: `CONTENT = ${(Math.random() + 1)
                .toString(36)
                .substring(7)}`,
        };
    });

const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    console.log(removed);
    return [removed, result];
};

const duplicateFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const originalDuplicated: any = result[index];
    //We can't have the same id, but we should have the same content.
    let newDuplicated = { ...originalDuplicated };
    newDuplicated.id = `${uuid()}`;
    return [newDuplicated, result];
};

const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

const lists = [
    'Blocks',
    'Day 1',
    'Day 2',
    'Day 3',
    'Day 4',
    'Day 5',
    'Day 6',
    'Day 7',
];

const generateLists = () =>
    //getItems(10, listKey) <- Pass this into empty array below to provide dummy data.
    lists.reduce(
        (acc: any, listKey: any) => ({
            ...acc,
            [listKey]: getItems(4, listKey),
        }),
        {}
    );

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

    const [openBlockModal, setOpenBlockModal] = useState(false);
    const controlBlockModal = (state: boolean) => setOpenBlockModal(state);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...(elements as any) };

        const sourceList = listCopy[result.source.droppableId];

        //Only remove element from list if source is not 'Blocks' or 'Saved Blocks' from toolbar.

        if (result.source.droppableId !== 'Blocks') {
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
        } else {
            const [duplicatedElement, newSourceList] = duplicateFromList(
                sourceList,
                result.source.index
            );
            listCopy[result.source.droppableId] = newSourceList;
            const destinationList = listCopy[result.destination.droppableId];
            listCopy[result.destination.droppableId] = addToList(
                destinationList,
                result.destination.index,
                duplicatedElement
            );

            setElements(listCopy);
        }
    };

    const returnToolbarElements = () => {
        let newElements = {} as any;
        newElements['Blocks'] = elements[Object.keys(elements)[0]];
        return newElements;
    };

    const returnEditingSurfaceElements = () => {
        let newElements = { ...elements };
        delete newElements[Object.keys(newElements)[0]];
        return newElements;
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
                            <EditingSurfaceGridWrapper>
                                <Toolbar
                                    controlBlockModal={controlBlockModal}
                                    lists={[lists[0]]}
                                    elements={returnToolbarElements()}
                                />

                                <EditingSurface
                                    lists={lists.slice(1)}
                                    elements={returnEditingSurfaceElements()}
                                />
                            </EditingSurfaceGridWrapper>
                        </DragDropContext>
                    </MainContainer>
                </>
            )}
        </>
    );
};

export default MainBuildTemplateView;
