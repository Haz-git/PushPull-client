import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';
import { Adjustments } from '@styled-icons/heroicons-outline/Adjustments';

//Icons:
const AdjustmentIcon = styled(Adjustments)`
    height: 1.5rem;
    width: 1.5rem;
    color: #ffffff;
    margin-left: 0.5rem;
`;

const MainContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: ${(props) => props.theme.accentColors.orange};
    /* background: #2d2c2a; */
    border-radius: 0.3rem;
    color: #ffffff;
    border: none;
    padding: 0.5rem 0.5rem;
`;

const ButtonText = styled.h3`
    color: #ffffff;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 500;
`;
//Interfaces:

interface IComponentProps {
    btnLabel: string;
    onClick: (status: boolean) => void;
}

const MobileFilterDrawerButton = ({
    btnLabel,
    onClick,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer onClick={() => onClick(true)}>
            <ButtonText>{btnLabel}</ButtonText>
            <AdjustmentIcon />
        </MainContainer>
    );
};

export default MobileFilterDrawerButton;
