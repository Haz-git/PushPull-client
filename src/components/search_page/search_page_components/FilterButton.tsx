import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';
import { ChevronRight } from '@styled-icons/boxicons-solid/ChevronRight';

//Icons:
const RightArrowIcon = styled(ChevronRight)`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => props.theme.subText};
`;

const MainContainer = styled.button`
    padding: 1rem 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.3rem;
    cursor: pointer;
    border: none;
    background: inherit;
    transition: 0.3s all ease-in-out;

    &:hover {
        text-decoration: none;
        outline: none;
        background: #dbdbdb;
    }
`;

const FilterLabelText = styled.h3`
    font-size: ${(props) => props.theme.fontSizes.md};
    color: ${(props) => props.theme.subText};
`;

//Interfaces:
interface IComponentProps {
    filterLabel: string;
}

const FilterButton = ({ filterLabel }: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <FilterLabelText>{filterLabel}</FilterLabelText>
            <RightArrowIcon />
        </MainContainer>
    );
};

export default FilterButton;
