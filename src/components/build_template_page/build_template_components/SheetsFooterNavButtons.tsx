import * as React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import { Tooltip } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import { CaretLeft } from 'styled-icons/fluentui-system-filled';
import { CaretRight } from 'styled-icons/fluentui-system-filled';

const LeftIcon = styled(CaretLeft)<IScrollButton>`
    height: 1.25rem;
    width: 1.25rem;
    color: ${({ isAllowed }) => (isAllowed === true ? '#e07133' : '#ececec')};
`;

const RightIcon = styled(CaretRight)<IScrollButton>`
    height: 1.25rem;
    width: 1.25rem;
    color: ${({ isAllowed }) => (isAllowed === true ? '#e07133' : '#ececec')};
`;

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2c2c2c;
    height: 100%;
    outline: 1px solid #d6d6d6;
    margin-top: 1px;
    margin-left: 1px;
    padding: 0rem 0.5rem;
    column-gap: 0.5rem;
`;

const MoveButton = styled.button`
    outline: none;
    background: inherit;
    border: none;
`;

//Interfaces:

interface IScrollButton {
    isAllowed: boolean;
}

interface IComponentProps {
    handleScrollSlide: (shift: number) => void;
    horizontalScrollWidth: number;
    allowScrollLeft: boolean;
    allowScrollRight: boolean;
}

export const SheetsFooterNavButtons = ({
    handleScrollSlide,
    horizontalScrollWidth,
    allowScrollLeft,
    allowScrollRight,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <Tooltip transition="fade" label="Scroll Left" color="dark">
                <MoveButton
                    onClick={() => handleScrollSlide(-horizontalScrollWidth)}
                >
                    <LeftIcon isAllowed={allowScrollLeft} />
                </MoveButton>
            </Tooltip>
            <Tooltip transition="fade" label="Scroll Right" color="dark">
                <MoveButton
                    onClick={() => handleScrollSlide(horizontalScrollWidth)}
                >
                    <RightIcon isAllowed={allowScrollRight} />
                </MoveButton>
            </Tooltip>
        </MainContainer>
    );
};
