import * as React from 'react';
import { useState, useEffect } from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import LoadProgress from '../nprogress/LoadProgress';
import Toolbar from './build_template_components/Toolbar';
import EditingSurface from './build_template_components/EditingSurface';
import GeneralModal from '../general_components/GeneralModal';
import AddBlockForm from './build_template_components/AddBlockForm';
import { GlobalSettingsForm } from './build_template_components/GlobalSettingsForm';
import { v4 as uuid } from 'uuid';
import useQuery from '../../utils/hooks/useQuery';
import historyObject from '../../utils/historyObject';
import UnauthorizedTemplate from './build_template_components/UnauthorizedTemplate';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import {
    addEditingSurfaceBlock,
    queryTemplate,
    reorderEditingSurfaceColumn,
} from '../../redux/templates/templateActions';

//Styles:
import styled from 'styled-components';
import ViewerInteractionsForm from './build_template_components/ViewerInteractionsForm';
import { useNotifications } from '@mantine/notifications';
import { CancelIcon } from '../build_program_page/build_program_components/AddProjectForm';

const MainContainer = styled.section``;

const EditingSurfaceGridWrapper = styled.div`
    background: #ffffff;
    width: 100%;

    @media ${deviceMin.mobileS} {
        display: block;
        height: 100%;
    }

    @media ${deviceMin.laptop} {
        display: grid;
        height: 100%;
        grid-template-columns: 14rem auto;
    }

    @media ${deviceMin.laptopL} {
        grid-template-columns: 14rem auto;
    }
`;

//Helper functions:

const isEmptyObj = (object: Object): boolean => {
    return (
        object &&
        Object.keys(object).length === 0 &&
        Object.getPrototypeOf(object) === Object.prototype
    );
};

const findSheetContent = (
    arr: any[],
    sheetId: string | undefined | null
): any => {
    if (!arr || !sheetId) {
        return;
    }

    return arr.find((item) => item.sheetId === sheetId);
};

const generateLists = (list: any, blocks: any) =>
    //getItems(10, listKey) <- Pass this into empty array below to provide dummy data.
    list.reduce(
        (acc: any, listKey: any) => ({
            ...acc,
            [listKey]: blocks || [],
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
    const query = useQuery();
    const currSheetId = query.get('sheetId');
    const dispatch = useDispatch();
    const notifications = useNotifications();
    useEffect(() => {
        dispatch(queryTemplate(fileUuid));
    }, []);

    const isMainViewLoading = useSelector(
        (state: RootStateOrAny) =>
            state?.uiLoader?.mainBuildTemplateView?.isLoading
    );

    const isAddBlockModalLoading = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.addBlockModal?.isLoading
    );

    const template = useSelector((state: RootStateOrAny) => state?.template);

    const toolbarBlocks = useSelector(
        (state: RootStateOrAny) => state?.template?.templateToolbarBlocks
    );

    const editingSurfaceBlocks = useSelector(
        (state: RootStateOrAny) => state?.template?.templateEditingSurfaceBlocks
    );

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

    //Elements for drag drop context:
    const [editingSurfaceElements, setEditingSurfaceElements] = useState(
        {}
    ) as any;
    const [toolbarElements, setToolbarElements] = useState({}) as any;

    useEffect(() => {
        if (editingSurfaceBlocks && toolbarBlocks) {
            const currentSheet = findSheetContent(
                editingSurfaceBlocks,
                currSheetId
            );

            if (!currentSheet) {
                historyObject.push(
                    `/file/${fileUuid}?sheetId=${editingSurfaceBlocks[0]['sheetId']}`
                );

                notifications.showNotification({
                    title: 'Your sheet is missing or has been deleted.',
                    message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                    color: 'red',
                    autoClose: 10000,
                    icon: <CancelIcon />,
                });
                return;
            }

            setEditingSurfaceColumns(currentSheet.sheetOrder);
            setEditingSurfaceElements(currentSheet.sheetContent);
            setToolbarElements(generateLists(toolbarColumns, toolbarBlocks));
        }
    }, [toolbarBlocks, editingSurfaceBlocks, currSheetId]);

    // Modal control for Viewer interactions:
    const [openViewerInteractionsModal, setOpenViewerInteractionsModal] =
        useState(false);
    const controlViewerInteractionsModal = (state: boolean): void => {
        setOpenViewerInteractionsModal(state);
    };

    // Modal for viewing and editing Global Inputs:
    const [openGlobalModal, setOpenGlobalModal] = useState(false);
    const controlGlobalModal = (state: boolean): void => {
        setOpenGlobalModal(state);
    };

    // Block modal for adding Blocks:
    const [openBlockModal, setOpenBlockModal] = useState(false);
    const controlBlockModal = (state: boolean): void => {
        setOpenBlockModal(state);
    };

    //Loader state for global settings modal on update
    const { isLoading: isGlobalSettingsModalLoading } = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.globalSettingsModal
    );

    //Helper Functions: For DragDropContext

    const removeFromList = (list: any, index: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const duplicateBlockFromToolbarWithNewId = (item: any) => {
        //We can't have the same id, but we should have the same content.
        let newDuplicated = { ...item };
        newDuplicated.id = `${uuid()}`;
        return newDuplicated;
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
        const editingSurfaceList = { ...(editingSurfaceElements as any) };
        const toolbarList = { ...(toolbarElements as any) };

        const editingSurfaceSourceList =
            editingSurfaceList[result.source.droppableId];

        const toolbarSourceList = toolbarList[result.source.droppableId];

        //Check if user moved column instead of item:
        if (type === 'editing-surface-column') {
            //Create copy
            const newColumnOrder = Array.from(editingSurfaceColumns);
            newColumnOrder.splice(result.source.index, 1);
            newColumnOrder.splice(
                result.destination.index,
                0,
                result.draggableId
            );

            setEditingSurfaceColumns(newColumnOrder);

            dispatch(
                reorderEditingSurfaceColumn(
                    fileUuid,
                    currSheetId,
                    newColumnOrder
                )
            );

            return;
        }

        //Only remove element from list if source is not 'Blocks' or 'Saved Blocks' from toolbar.

        let manipulatedElement, newSourceList;

        if (result.source.droppableId !== 'Blocks') {
            //Control elements passed between date columns on editing surface.
            [manipulatedElement, newSourceList] = removeFromList(
                editingSurfaceSourceList,
                result.source.index
            );

            editingSurfaceList[result.source.droppableId] = newSourceList;

            const destinationList =
                editingSurfaceList[result.destination.droppableId];

            editingSurfaceList[result.destination.droppableId] = addToList(
                destinationList,
                result.destination.index,
                manipulatedElement
            );

            setEditingSurfaceElements(editingSurfaceList);
            dispatch(
                addEditingSurfaceBlock(fileUuid, {
                    sheetId: currSheetId,
                    sheetContent: editingSurfaceList,
                })
            );
        } else {
            //Element is passed from toolbar (BlockColumn) to DateColumn
            manipulatedElement = duplicateBlockFromToolbarWithNewId(
                toolbarSourceList[result.source.index]
            );

            const destinationList =
                editingSurfaceList[result.destination.droppableId];

            editingSurfaceList[result.destination.droppableId] = addToList(
                destinationList,
                result.destination.index,
                manipulatedElement
            );

            setEditingSurfaceElements(editingSurfaceList);
            dispatch(
                addEditingSurfaceBlock(fileUuid, {
                    sheetId: currSheetId,
                    sheetContent: editingSurfaceList,
                })
            );
        }
    };

    const renderTemplateView = () => {
        if (isEmptyObj(template)) {
            return <UnauthorizedTemplate />;
        }

        return (
            <>
                {isMainViewLoading === true ? (
                    <LoadProgress
                        darkMode={true}
                        isAnimating={true}
                        loadingText="Generating Template..."
                        minimum={50}
                    />
                ) : (
                    <>
                        <GeneralModal
                            size="lg"
                            closeOnClickOutside={false}
                            title="Viewer Interactions Settings"
                            openBoolean={openViewerInteractionsModal}
                            closeFunc={() =>
                                setOpenViewerInteractionsModal(false)
                            }
                        >
                            <ViewerInteractionsForm />
                        </GeneralModal>
                        <GeneralModal
                            closeOnClickOutside={false}
                            title="Template Global Settings"
                            openBoolean={openGlobalModal}
                            closeFunc={() => setOpenGlobalModal(false)}
                            isLoading={isGlobalSettingsModalLoading}
                        >
                            <GlobalSettingsForm
                                toggleGlobalSettingsModal={controlGlobalModal}
                            />
                        </GeneralModal>
                        <GeneralModal
                            closeOnClickOutside={false}
                            title="Add New Block"
                            openBoolean={openBlockModal}
                            closeFunc={() => setOpenBlockModal(false)}
                            isLoading={isAddBlockModalLoading}
                        >
                            <AddBlockForm
                                closeModal={() => setOpenBlockModal(false)}
                            />
                        </GeneralModal>
                        <MainContainer>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <EditingSurfaceGridWrapper>
                                    <Toolbar
                                        controlViewerInteractionsModal={
                                            controlViewerInteractionsModal
                                        }
                                        controlBlockModal={controlBlockModal}
                                        controlGlobalModal={controlGlobalModal}
                                        lists={toolbarColumns}
                                        elements={toolbarElements}
                                    />
                                    <Droppable
                                        droppableId="editing-surface-columns"
                                        direction="horizontal"
                                        type="editing-surface-column"
                                    >
                                        {(provided) => (
                                            <EditingSurface
                                                {...provided.droppableProps}
                                                ref={provided.innerRef} //According to https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md, innerRef was replaced with ref via the React16 forwardRef API.
                                                lists={editingSurfaceColumns}
                                                elements={
                                                    editingSurfaceElements
                                                }
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

    return <>{renderTemplateView()}</>;
};

export default MainBuildTemplateView;
