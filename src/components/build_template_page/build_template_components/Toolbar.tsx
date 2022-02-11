import * as React from 'react';
import { useEffect } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import {
    selectBlock,
    deselectBlock,
} from '../../../redux/selectedBlock/selectedBlockActions';

//Components:
import historyObject from '../../../utils/historyObject';
import { ReactComponent as DarkLogoSVG } from '../../../assets/dark_logo.svg';
import { v4 as uuid } from 'uuid';
import { Accordion } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import { Droppable } from 'react-beautiful-dnd';
import BlockColumn from './BlockColumn';

//Styles:
import styled from 'styled-components';
import { IosArrowLeft } from '@styled-icons/fluentui-system-filled/IosArrowLeft';
import { ContentSettings } from 'styled-icons/fluentui-system-filled';
import { UserVoice } from '@styled-icons/boxicons-solid/UserVoice';

const SettingsIcon = styled(ContentSettings)`
    color: #ffffff;
    height: 1.75rem;
    width: 1.75rem;
`;

const ExitIcon = styled(IosArrowLeft)`
    color: #ffffff;
    height: 1.25rem;
    width: 1.25rem;
`;

const ViewerInteractionsIcon = styled(UserVoice)`
    color: #ffffff;
    height: 1.75rem;
    width: 1.75rem;
`;

const MainContainer = styled.section`
    display: grid;
    grid-template-rows: 4.5rem auto 1fr;
    background: #2c2c2c;
    position: fixed;
    height: 100%;
    text-align: left;
    overflow-y: scroll;
    z-index: 80;
    border-right: 1px solid #ececec;

    @media ${deviceMin.mobileS} {
        width: 11rem;
        max-width: 11rem;
    }

    @media ${deviceMin.mobileM} {
        width: 12rem;
        max-width: 12rem;
    }

    @media ${deviceMin.mobileL} {
        width: 13rem;
        max-width: 13rem;
    }

    @media ${deviceMin.browserSm} {
        width: 14rem;
        max-width: 14rem;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const LogoContainer = styled.div`
    position: relative;
    border-bottom: 1px solid #525252;

    @media ${deviceMin.mobileS} {
        height: 2rem;
        width: 10rem;
    }

    @media ${deviceMin.mobileM} {
        height: 2.5rem;
        width: 10rem;
    }

    @media ${deviceMin.mobileL} {
        height: 2.5rem;
        width: 10rem;
    }

    @media ${deviceMin.browserSm} {
        padding: 1rem 1rem;
        height: 4.5rem;
        width: 100%;
    }
`;

const AccordionContainer = styled.div`
    align-self: start;
`;

const DroppableContainer = styled.div``;

const ToolsContainer = styled.div`
    align-self: end;
    width: 100%;
`;

//Interfaces:

interface IComponentProps {
    controlViewerInteractionsModal: (state: boolean) => void;
    controlGlobalModal: (state: boolean) => void;
    controlBlockModal: (state: boolean) => void;
    lists: any;
    elements: any;
}

const Toolbar = ({
    controlViewerInteractionsModal,
    controlGlobalModal,
    controlBlockModal,
    lists,
    elements,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(deselectBlock());
        };
    }, []);

    return (
        <MainContainer>
            <LogoContainer>
                <DarkLogoSVG />
            </LogoContainer>
            <AccordionContainer>
                <Accordion iconPosition="right" multiple>
                    <Accordion.Item label="Blocks">
                        <GeneralButton
                            buttonLabel="Add Block"
                            onClick={() => controlBlockModal(true)}
                        />
                        <Droppable
                            droppableId="toolbar-columns"
                            type={'EXERCISE_BLOCK'}
                            isDropDisabled={true}
                        >
                            {(provided: any) => (
                                <DroppableContainer
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {lists?.map((listKey: any, index: any) => (
                                        <BlockColumn
                                            elements={elements[listKey]}
                                            prefix={listKey}
                                            key={listKey}
                                        />
                                    ))}
                                </DroppableContainer>
                            )}
                        </Droppable>
                    </Accordion.Item>
                    <Accordion.Item label="Saved blocks"></Accordion.Item>
                </Accordion>
            </AccordionContainer>
            <ToolsContainer>
                <GeneralButton
                    height="3.5rem"
                    buttonLabel="Viewer Interactions"
                    onClick={() => controlViewerInteractionsModal(true)}
                    width="100%"
                    buttonIconLeft={<ViewerInteractionsIcon />}
                    buttonBackground="transparent"
                    border="1px solid #525252"
                    borderBottom="1px solid #525252"
                    borderTop="1px solid #525252"
                    disableShadow={true}
                    hoverTransform="none"
                    hoverShadow="none"
                />
                <GeneralButton
                    height="3.5rem"
                    buttonLabel="Global Settings"
                    onClick={() => controlGlobalModal(true)}
                    width="100%"
                    buttonIconLeft={<SettingsIcon />}
                    border="1px solid #525252"
                    buttonBackground="transparent"
                    borderBottom="1px solid #525252"
                    borderTop="1px solid #525252"
                    disableShadow={true}
                    hoverTransform="none"
                    hoverShadow="none"
                />
                <GeneralButton
                    height="3.5rem"
                    buttonLabel="Back to Programs"
                    onClick={() =>
                        historyObject.push('/builder/dashboard/recents')
                    }
                    width="100%"
                    buttonIconLeft={<ExitIcon />}
                    buttonBackground="transparent"
                    disableShadow={true}
                    hoverTransform="none"
                    hoverShadow="none"
                />
            </ToolsContainer>
        </MainContainer>
    );
};

export default Toolbar;
