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
import { DeleteSheetForm } from './build_template_components/DeleteSheetForm';
import { EditBlockForm } from './build_template_components/EditBlockForm';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import {
    addEditingSurfaceBlock,
    queryTemplate,
    reorderEditingSurfaceColumn,
    clearTemplate,
} from '../../redux/templates/templateActions';
import { toggleModal } from '../../redux/modals/modalActions';
import { ModalActionTypes } from '../../redux/modals/action-types';

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
    }
`;

//Helper functions:

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
    const currentSheetId = query.get('sheetId');
    const dispatch = useDispatch();
    const notifications = useNotifications();
    useEffect(() => {
        dispatch(queryTemplate(fileUuid));

        return () => {
            dispatch({ type: 'RESET_ERROR_MESSAGE' });
        };
    }, []);

    const { isLoading: isEditBlockModalLoading } = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.EDIT_BLOCK_MODAL
    );

    const { isLoading: isMainViewLoading } = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.MAIN_BUILD_TEMPLATE_VIEW
    );

    const { isLoading: isAddBlockModalLoading } = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.ADD_BLOCK_MODAL
    );

    const { isLoading: isViewerInteractionsSettingsModalLoading } = useSelector(
        (state: RootStateOrAny) =>
            state?.uiLoader?.VIEWER_INTERACTIONS_SETTINGS_MODAL
    );
    //Loader state for global settings modal on update
    const { isLoading: isGlobalSettingsModalLoading } = useSelector(
        (state: RootStateOrAny) => state?.uiLoader?.GLOBAL_SETTINGS_MODAL
    );

    const error = useSelector((state: RootStateOrAny) => state?.errors);

    const toolbarBlocks = useSelector(
        (state: RootStateOrAny) => state?.template?.templateToolbarBlocks
    );

    const editingSurfaceBlocks = useSelector(
        (state: RootStateOrAny) => state?.template?.templateEditingSurfaceBlocks
    );

    const { isOpen: isSheetDeletionModalOpened } = useSelector(
        (state: RootStateOrAny) => state?.modals?.DELETE_SHEET_CONFIRMATION
    );

    const { isOpen: isEditBlockModalOpened } = useSelector(
        (state: RootStateOrAny) => state?.modals?.EDIT_BLOCK
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
                currentSheetId
            );

            if (!currentSheet) {
                historyObject.push(
                    `/file/${fileUuid}?sheetId=${editingSurfaceBlocks[0]['sheetId']}`
                );

                notifications.showNotification({
                    title: 'Your sheet has been deleted.',
                    message: `If this is unexpected, please report this issue.`,
                    color: 'red',
                    autoClose: 5000,
                    icon: <CancelIcon />,
                });
                return;
            }

            setEditingSurfaceColumns(currentSheet.sheetOrder);
            setEditingSurfaceElements(currentSheet.sheetContent);
            setToolbarElements(generateLists(toolbarColumns, toolbarBlocks));
        }
    }, [toolbarBlocks, editingSurfaceBlocks, currentSheetId]);

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
                    currentSheetId,
                    newColumnOrder
                )
            );

            return;
        }

        //Only remove element from list if source is not 'Blocks' or 'Saved Blocks' from toolbar.

        let manipulatedElement, newSourceList;

        if (result.source.droppableId !== 'Blocks') {
            //handles blocks passed between columns within editing surface.
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
                    sheetId: currentSheetId,
                    sheetContent: editingSurfaceList,
                })
            );
        } else {
            //Element is passed from toolbar to editing surface
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
                    sheetId: currentSheetId,
                    sheetContent: editingSurfaceList,
                })
            );
        }
    };

    const renderTemplateView = () => {
        if (error) {
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
                            size="md"
                            closeOnClickOutside={false}
                            title="Block Details"
                            openBoolean={isEditBlockModalOpened}
                            isLoading={isEditBlockModalLoading}
                            closeFunc={() =>
                                dispatch(
                                    toggleModal(
                                        ModalActionTypes.EDIT_BLOCK,
                                        'CLOSE'
                                    )
                                )
                            }
                        >
                            <EditBlockForm />
                        </GeneralModal>
                        <GeneralModal
                            size="md"
                            closeOnClickOutside={true}
                            title="Confirm Deletion"
                            openBoolean={isSheetDeletionModalOpened}
                            closeFunc={() =>
                                dispatch(
                                    toggleModal(
                                        ModalActionTypes.DELETE_SHEET_CONFIRMATION,
                                        'CLOSE'
                                    )
                                )
                            }
                        >
                            <DeleteSheetForm
                                sheetId={currentSheetId}
                                templateId={fileUuid}
                            />
                        </GeneralModal>
                        <GeneralModal
                            isLoading={isViewerInteractionsSettingsModalLoading}
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
                            isLoading={isGlobalSettingsModalLoading}
                            closeOnClickOutside={false}
                            title="Template Global Settings"
                            openBoolean={openGlobalModal}
                            closeFunc={() => setOpenGlobalModal(false)}
                        >
                            <GlobalSettingsForm
                                toggleGlobalSettingsModal={controlGlobalModal}
                            />
                        </GeneralModal>
                        <GeneralModal
                            isLoading={isAddBlockModalLoading}
                            closeOnClickOutside={false}
                            title="Add New Block"
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
