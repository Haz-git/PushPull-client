import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';
import { CaretUp } from '@styled-icons/fluentui-system-filled/CaretUp';
import { CaretDown } from '@styled-icons/fluentui-system-filled/CaretDown';
import { ArrowRightAlt } from '@styled-icons/material-rounded/ArrowRightAlt';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';
import GeneralButton from '../../general_components/GeneralButton';

//Icons:

const DeleteIcon = styled(Delete)`
    height: 1.7rem;
    width: 1.7rem;
    color: white;
`;

const CaretUpIcon = styled(CaretUp)`
    height: 1.7rem;
    width: 1.7rem;
    color: ${(props) => props.theme.accentColors.green};
`;

const CaretDownIcon = styled(CaretDown)`
    height: 1.7rem;
    width: 1.7rem;
    color: ${(props) => props.theme.accentColors.red};
`;

const ArrowRightIcon = styled(ArrowRightAlt)`
    height: 1.7rem;
    width: 1.7rem;
    color: ${(props) => props.theme.subText};
`;

const MainContainer = styled.div`
    display: grid;
    width: 100%;
    max-width: 20rem;
    grid-template-columns: 85% auto;
    border-radius: 0.3rem;
    border: none;
    background: #ffffff;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 1px 5px 0px,
        rgba(14, 30, 37, 0.32) 0px 1px 3px 0px;
    margin-bottom: 1rem;
`;

const ExerciseCardTitle = styled.h2`
    font-size: 1.2rem;
    color: ${(props) => props.theme.mainText};
    font-weight: 700;
`;

const ExerciseText = styled.p`
    font-size: 1rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
`;

const TitleContainer = styled.div`
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    border-bottom: 1px solid #ececec;
`;

const InfoContainer = styled.div``;

const WeightContainer = styled.div`
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const IconContainer = styled.div``;

const ButtonContainer = styled.div`
    max-width: 3rem;
`;

//Interfaces:

interface IComponentProps {
    exerciseTitle: string;
    initialWeight: number;
    finalWeight: number;
    weightUnit: string;
    exerciseId: string;
    removeExerciseCard: (exerciseId: string) => void;
}

const ExerciseCard = ({
    exerciseTitle,
    initialWeight,
    finalWeight,
    weightUnit,
    exerciseId,
    removeExerciseCard,
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
            <ButtonContainer>
                <GeneralButton
                    height="100%"
                    buttonBackground="#AF1432"
                    disableShadow={true}
                    width="100%"
                    buttonIcon={<DeleteIcon />}
                    buttonLabel=""
                    iconMargin="0"
                    hoverShadow="none"
                    borderRadius="0rem .2rem .2rem 0rem"
                    onClick={() => removeExerciseCard(exerciseId)}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default ExerciseCard;
