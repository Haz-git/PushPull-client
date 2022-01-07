import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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

    //Column States for DnD functionality:

    const [editingSurfaceColumns, setEditingSurfaceColumns] = useState([
        'Day 1',
        'Day 2',
        'Day 3',
        'Day 4',
        'Day 5',
        'Day 6',
        'Day 7',
    ]);

    const [toolbarColumns, setToolbarColumns] = useState(['Blocks']);

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

    const generateLists = (list: any) =>
        //getItems(10, listKey) <- Pass this into empty array below to provide dummy data.
        list.reduce(
            (acc: any, listKey: any) => ({
                ...acc,
                [listKey]: getItems(4, listKey),
            }),
            {}
        );

    //Elements for drag drop context:
    const [editingSurfaceElements, setEditingSurfaceElements] = useState(
        generateLists(editingSurfaceColumns)
    ) as any;
    const [toolbarElements, setToolbarElements] = useState(
        generateLists(toolbarColumns)
    ) as any;

    useEffect(() => {
        // controlTemplateLoadingStatus(true);
        setEditingSurfaceElements(generateLists(editingSurfaceColumns));
        setToolbarElements(generateLists(toolbarColumns));
        dispatch(queryTemplate(fileUuid));
    }, []);

    const isLoading = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.isLoading
    );

    const [openBlockModal, setOpenBlockModal] = useState(false);
    const controlBlockModal = (state: boolean) => setOpenBlockModal(state);

    //Helper Functions: For DragDropContext

    const removeFromList = (list: any, index: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const duplicateFromToolbarBlockColumn = (list: any, index: any) => {
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

    const onDragEnd = (result: any) => {
        const { type } = result;

        if (!result.destination) {
            return;
        }
        const listCopy = { ...(editingSurfaceElements as any) };

        const sourceList = listCopy[result.source.droppableId];

        //Check if user moved column instead of item:
        if (type === 'column') {
            // console.log(
            //     `Source: ${result.source.index}, Destination: ${result.destination.index}`
            // );
            //Create copy
            const newColumnOrder = Array.from(editingSurfaceColumns);
            //Adding +1 is to factor for the 'Blocks' column.
            newColumnOrder.splice(result.source.index, 1);
            newColumnOrder.splice(
                result.destination.index,
                0,
                result.draggableId
            );

            setEditingSurfaceColumns(newColumnOrder);
            return;
        }

        //Only remove element from list if source is not 'Blocks' or 'Saved Blocks' from toolbar.

        let manipulatedElement, newSourceList;

        if (result.source.droppableId !== 'Blocks') {
            [manipulatedElement, newSourceList] = removeFromList(
                sourceList,
                result.source.index
            );
        } else {
            [manipulatedElement, newSourceList] =
                duplicateFromToolbarBlockColumn(
                    sourceList,
                    result.source.index
                );
        }

        listCopy[result.source.droppableId] = newSourceList;

        const destinationList = listCopy[result.destination.droppableId];

        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            manipulatedElement
        );

        setEditingSurfaceElements(listCopy);
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
                                    lists={toolbarColumns}
                                    elements={toolbarElements}
                                />
                                <Droppable
                                    droppableId="editing-surface-columns"
                                    direction="horizontal"
                                    type="column"
                                >
                                    {(provided) => (
                                        <EditingSurface
                                            {...provided.droppableProps}
                                            ref={provided.innerRef} //According to https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md, innerRef was replaced with ref via the React16 forwardRef API.
                                            lists={editingSurfaceColumns}
                                            elements={editingSurfaceElements}
                                        />
                                    )}
                                </Droppable>
                            </EditingSurfaceGridWrapper>
                        </DragDropContext>
                    </MainContainer>
                </>
            )}
        </>
    );
};

export default MainBuildTemplateView;
