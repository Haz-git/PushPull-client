import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.button<StyledComponentProps>`
    padding: 1rem 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.3rem;
    cursor: pointer;
    border: none;
    border-left: ${(props) =>
        props.isActive === true
            ? `7px solid ${props.theme.accentColors.orange}`
            : `none`};
    background: ${(props) => (props.isActive === true ? `#ffffff` : `inherit`)};
    transition: 0.3s all ease-in-out;
    box-shadow: ${({ isActive }) =>
        isActive === false ? 'none' : 'rgba(0, 0, 0, 0.2) 0px 2px 4px'};

    &:hover {
        text-decoration: none;
        outline: none;
        background: ${(props) =>
            props.isActive === true ? `#ffffff` : `e8e8e8`};
    }
`;

const ChoiceLabelText = styled.h3<StyledComponentProps>`
    font-size: 0.9rem;
    color: ${(props) => props.theme.subText};
    font-weight: ${({ isActive }) => (isActive === false ? '500' : '700')};
`;

//Interfaces:

interface StyledComponentProps {
    isActive: boolean;
}

interface IComponentProps {
    choiceLabel: string;
    onClick?: React.MouseEventHandler;
    isActive: boolean;
}

const FilterChoice = ({
    choiceLabel,
    onClick,
    isActive,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer onClick={onClick} isActive={isActive}>
            <ChoiceLabelText isActive={isActive}>{choiceLabel}</ChoiceLabelText>
        </MainContainer>
    );
};

export default FilterChoice;
