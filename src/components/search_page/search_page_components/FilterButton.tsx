import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';
import { ChevronRight } from '@styled-icons/boxicons-solid/ChevronRight';
import { Close } from '@styled-icons/ionicons-sharp/Close';

//Icons:
const RightArrowIcon = styled(ChevronRight)`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => props.theme.subText};
`;

const CloseIcon = styled(Close)`
    height: 1.25rem;
    width: 1.25rem;
    color: ${(props) => props.theme.subText};
`;

const MainContainer = styled.button`
    padding: 1.25rem 1rem;
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
        background: #e8e8e8;
    }
`;

const FilterLabelText = styled.h3`
    font-size: 1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 600;
`;

//Selection Styles:
const MainSelectedWrapper = styled.div`
    position: relative;
`;

const MainSelectedContainer = styled.button`
    padding: 0.8rem 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.3rem;
    cursor: pointer;
    border: none;
    border-left: 7px solid ${(props) => props.theme.accentColors.orange};
    background: #ffffff;
    transition: 0.2s all linear;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;

    &:hover {
        text-decoration: none;
        outline: none;
    }
`;

const OnSelectedTextContainer = styled.div`
    text-align: left;
`;

const OnSelectedFilterButtonText = styled.h3`
    font-size: 0.7rem;
    color: ${(props) => props.theme.subText};
    font-weight: 400;
    margin-bottom: 0.25rem;
`;

const CurrentSelectionText = styled.h2`
    font-size: 1rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
    letter-spacing: 0.25px;
`;

const CloseButtonDiv = styled.button`
    position: absolute;
    top: 50%;
    left: 85%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    padding: 0.5rem 0.5rem;
    border-radius: 50%;
    transition: 0.3s all ease-in-out;
    border: none;
    outline: none;
    background: #ffffff;

    &:hover {
        background: #e8e8e8;
    }
`;

//Interfaces:
interface IComponentProps {
    name?: string;
    filterLabel: string;
    onClick?: React.MouseEventHandler;
    onFilterRemoval?: React.MouseEventHandler;
    currentSelection?: string;
}

const FilterButton = ({
    filterLabel,
    onClick,
    currentSelection = 'any', //default prop set to 'any', because default value in state is 'any'.
    onFilterRemoval,
    name,
}: IComponentProps): JSX.Element => {
    const renderFilterButton = () => {
        if (currentSelection !== 'any') {
            return (
                <MainSelectedWrapper>
                    <MainSelectedContainer name={name} onClick={onClick}>
                        <OnSelectedTextContainer>
                            <OnSelectedFilterButtonText>
                                {filterLabel}
                            </OnSelectedFilterButtonText>
                            <CurrentSelectionText>
                                {currentSelection.charAt(0).toUpperCase() +
                                    currentSelection.slice(1)}
                            </CurrentSelectionText>
                        </OnSelectedTextContainer>
                    </MainSelectedContainer>
                    <CloseButtonDiv name={name} onClick={onFilterRemoval}>
                        <CloseIcon />
                    </CloseButtonDiv>
                </MainSelectedWrapper>
            );
        } else {
            return (
                <MainContainer name={name} onClick={onClick}>
                    <FilterLabelText>{filterLabel}</FilterLabelText>
                    <RightArrowIcon />
                </MainContainer>
            );
        }
    };

    return <>{renderFilterButton()}</>;
};

export default FilterButton;
