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

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    display: grid;
    grid-template-rows: 4.5rem auto 10%;
    background: #2c2c2c;
    position: fixed;
    height: 100%;
    text-align: left;
    overflow-y: scroll;
    z-index: 80;

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

    @media ${deviceMin.laptop} {
        width: 15rem;
        max-width: 15rem;
    }

    @media ${deviceMin.laptopL} {
        width: 16rem;
        max-width: 16rem;
    }
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

const ToolsContainer = styled.div`
    align-self: end;
    display: grid;
    grid-template-columns: auto auto auto;
`;

//Interfaces:

interface IComponentProps {
    togglePanningStatus: () => void;
    isPanningDisabled: boolean;
    controlBlockModal: (state: boolean) => void;
}

const Toolbar = ({
    togglePanningStatus,
    isPanningDisabled,
    controlBlockModal,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const template = useSelector((state: RootStateOrAny) => state?.template);

    useEffect(() => {
        return () => {
            dispatch(deselectBlock());
        };
    }, []);

    const renderTemplateBlocks = () => {
        if (template?.templateBlocks) {
            return template.templateBlocks.map((block: any) => (
                <div
                    onDragStartCapture={() =>
                        dispatch(
                            selectBlock({
                                i: block.blockTitle.concat(`_${uuid()}`),
                            })
                        )
                    }
                    onClick={() =>
                        dispatch(
                            selectBlock({
                                i: block.blockTitle.concat(`_${uuid()}`),
                            })
                        )
                    }
                    draggable={true}
                    unselectable="on"
                    onDragStart={(e) =>
                        e.dataTransfer.setData('text/plain', '')
                    }
                    id={block.i}
                    key={block.i}
                >
                    {block.blockTitle}
                </div>
            ));
        }
    };

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
                        {renderTemplateBlocks()}
                    </Accordion.Item>
                    <Accordion.Item label="Saved blocks"></Accordion.Item>
                </Accordion>
            </AccordionContainer>
            <ToolsContainer>
                <GeneralButton
                    buttonLabel="Exit"
                    onClick={() =>
                        historyObject.push('/builder/dashboard/recents')
                    }
                />
                <GeneralButton
                    buttonLabel={
                        isPanningDisabled ? 'Activate pan' : 'Disable pan'
                    }
                    onClick={togglePanningStatus}
                />
                <GeneralButton buttonLabel="Add" />
            </ToolsContainer>
        </MainContainer>
    );
};

export default Toolbar;
