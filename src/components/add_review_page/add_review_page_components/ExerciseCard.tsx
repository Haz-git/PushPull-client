import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';
import { CaretUp } from '@styled-icons/fluentui-system-filled/CaretUp';
import { CaretDown } from '@styled-icons/fluentui-system-filled/CaretDown';
import { ArrowRightAlt } from '@styled-icons/material-rounded/ArrowRightAlt';

//Icons:
const CaretUpIcon = styled(CaretUp)`
    height: 1.7rem;
    width: 1.7rem;
    color: green;
`;

const CaretDownIcon = styled(CaretDown)`
    height: 1.7rem;
    width: 1.7rem;
    color: red;
`;

const ArrowRightIcon = styled(ArrowRightAlt)`
    height: 1.7rem;
    width: 1.7rem;
    color: ${(props) => props.theme.subText};
`;

const MainContainer = styled.div`
    border-radius: 0.3rem;
    border: none;
    background: #ffffff;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 1px 5px 0px,
        rgba(14, 30, 37, 0.32) 0px 1px 3px 0px;
    margin-bottom: 1rem;
`;

const ExerciseCardTitle = styled.h2`
    font-size: 1rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

const ExerciseText = styled.p`
    font-size: 1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
`;

const TitleContainer = styled.div`
    padding: 0.5rem 0.5rem;
    border-bottom: 1px solid #ececec;
`;

const InfoContainer = styled.div``;

const WeightContainer = styled.div`
    padding: 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const IconContainer = styled.div``;

//Interfaces:

interface IComponentProps {
    exerciseTitle: string;
    initialWeight: number;
    finalWeight: number;
    weightUnit: string;
}

const ExerciseCard = ({
    exerciseTitle,
    initialWeight,
    finalWeight,
    weightUnit,
}: IComponentProps): JSX.Element => {
    const renderCaretIcon = () => {
        if (finalWeight > initialWeight) return <CaretUpIcon />;
        return <CaretDownIcon />;
    };

    return (
        <MainContainer>
            <InfoContainer>
                <TitleContainer>
                    <ExerciseCardTitle>{exerciseTitle}</ExerciseCardTitle>
                </TitleContainer>
                <WeightContainer>
                    <ExerciseText>{`${initialWeight} ${weightUnit}`}</ExerciseText>
                    <ArrowRightIcon />
                    <ExerciseText>{`${finalWeight} ${weightUnit}`}</ExerciseText>
                    <IconContainer>{renderCaretIcon()}</IconContainer>
                </WeightContainer>
            </InfoContainer>
        </MainContainer>
    );
};

export default ExerciseCard;
