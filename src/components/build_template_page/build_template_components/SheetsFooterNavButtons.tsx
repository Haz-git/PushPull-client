import * as React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';
import { CaretLeft } from 'styled-icons/fluentui-system-filled';
import { CaretRight } from 'styled-icons/fluentui-system-filled';

const LeftIcon = styled(CaretLeft)`
    height: 1.5rem;
    width: 1.5rem;
    color: #e07133;
`;

const RightIcon = styled(CaretRight)`
    height: 1.5rem;
    width: 1.5rem;
    color: #e07133;
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
`;

const MoveButton = styled.button`
    outline: none;
    background: inherit;
    border: none;
`;

//Interfaces:

interface IComponentProps {
    handleScrollSlide: (shift: number) => void;
}

export const SheetsFooterNavButtons = ({
    handleScrollSlide,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <MoveButton onClick={() => handleScrollSlide(-700)}>
                <LeftIcon />
            </MoveButton>
            <MoveButton onClick={() => handleScrollSlide(700)}>
                <RightIcon />
            </MoveButton>
        </MainContainer>
    );
};
