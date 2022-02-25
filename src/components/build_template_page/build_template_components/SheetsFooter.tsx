import React from 'react';
import { useRef, useState } from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { addSheet } from '../../../redux/templates/templateActions';
import { SheetsFooterNavButtons } from './SheetsFooterNavButtons';

//Components:
import { SheetTab } from './SheetTab';
import GeneralButton from '../../general_components/GeneralButton';
import { Tooltip } from '@mantine/core';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';
import { PlusLg } from '@styled-icons/bootstrap/PlusLg';

const AddIcon = styled(PlusLg)`
    color: #ffffff;
    height: 1rem;
    width: 1rem;
`;

const MainContainer = styled.div`
    position: fixed;
    bottom: 0;
    background: #d6d6d6;
    height: 2.5rem;
    width: 100%;
`;

const AddSheetContainer = styled.div``;

const SheetContainer = styled.div<ISheetContainerProps>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: ${({ width }) => `${width - 240}px`};
    height: 100%;
`;

const SheetNavigationButtonsContainer = styled.div`
    margin-left: auto;
    height: 100%;
`;

const SheetTabContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    overflow-x: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        background: transparent; /* make scrollbar transparent */
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
`;

//Interfaces:

interface ISheetContainerProps {
    width: number;
}

export const SheetsFooter = (): JSX.Element => {
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const templateId = useSelector(
        (state: RootStateOrAny) => state?.template?.id
    );
    const sheets = useSelector(
        (state: RootStateOrAny) => state?.template?.templateEditingSurfaceBlocks
    );

    //Scroll states:
    const [scrollX, setScrollX] = useState(0);
    const [scrollEnd, setScrollEnd] = useState(false);

    //Ref to control sheetsContainer:
    const scroll = useRef<any>(null);

    const shouldScrollEnd = (): boolean => {
        return (
            Math.floor(
                scroll.current.scrollWidth - scroll.current.scrollLeft
            ) <= scroll.current.offsetWidth
        );
    };

    //Slide function:
    const slide = (shift: number): void => {
        scroll.current.scrollLeft += shift;
        setScrollX(scrollX + shift);
        return setScrollEnd(shouldScrollEnd());
    };

    //Identify scroll position:

    const scrollCheck = (): void => {
        setScrollX(scroll.current.scrollLeft);
        return setScrollEnd(shouldScrollEnd());
    };

    return (
        <MainContainer>
            <SheetContainer width={width}>
                <AddSheetContainer>
                    <Tooltip
                        transition="fade"
                        label="Add Sheet"
                        color="dark"
                        withArrow
                    >
                        <GeneralButton
                            height="2.5rem"
                            borderRadius="0"
                            hoverTransform="none"
                            hoverShadow="none"
                            buttonLabel=""
                            buttonIconLeft={<AddIcon />}
                            buttonBackground="#2c2c2c"
                            leftIconMargin="0rem"
                            rightIconMargin="0rem"
                            margin="1px 1px 0px 0px"
                            outline="1px solid #d6d6d6"
                            hoverColor="#464646"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(addSheet(templateId));
                            }}
                        />
                    </Tooltip>
                </AddSheetContainer>
                <SheetTabContainer ref={scroll} onScroll={scrollCheck}>
                    {sheets?.map((sheet: any) => (
                        <SheetTab
                            sheetName={sheet.sheetName}
                            sheetId={sheet.sheetId}
                            templateId={templateId}
                            key={sheet.sheetId}
                        />
                    ))}
                </SheetTabContainer>
                <SheetNavigationButtonsContainer>
                    <SheetsFooterNavButtons handleScrollSlide={slide} />
                </SheetNavigationButtonsContainer>
            </SheetContainer>
        </MainContainer>
    );
};
