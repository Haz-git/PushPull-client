import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';
import { CaretUp } from '@styled-icons/fluentui-system-filled/CaretUp';
import { CaretDown } from '@styled-icons/fluentui-system-filled/CaretDown';
import { ArrowRightAlt } from '@styled-icons/material-rounded/ArrowRightAlt';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';
import { Equals } from '@styled-icons/typicons/Equals';
import GeneralButton from '../../general_components/GeneralButton';

//Icons:

const EqualsIcon = styled(Equals)`
    height: 1.7rem;
    width: 1.7rem;
    color: ${(props) => props.theme.accentColors.blue};
`;

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

const MainContainer = styled.div<MainContainerProps>`
    display: grid;
    width: 100%;
    max-width: ${(props) => props.maxWidth};
    grid-template-columns: ${(props) =>
        props.hasDelete === true ? '85% auto' : '100%'};
    border-radius: 0.3rem;
    border: none;
    background: ${(props) => props.backgroundColor};
    box-shadow: rgba(14, 30, 37, 0.12) 0px 1px 5px 0px,
        rgba(14, 30, 37, 0.32) 0px 1px 3px 0px;
    margin-bottom: 1rem;
    word-break: break-word;
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

interface MainContainerProps {
    hasDelete: boolean;
    backgroundColor: string;
    maxWidth: string;
}

interface IComponentProps {
    exerciseTitle: string;
    initialWeight: number;
    finalWeight: number;
    weightUnit: string;
    exerciseId: string;
    removeExerciseCard: (exerciseId: string) => void;
    hasDelete?: boolean;
    backgroundColor?: string;
    maxWidth?: string;
}

const ExerciseCard = ({
    exerciseTitle,
    initialWeight,
    finalWeight,
    weightUnit,
    exerciseId,
    removeExerciseCard,
    hasDelete = true,
    backgroundColor = '#ffffff',
    maxWidth = '20rem',
}: IComponentProps): JSX.Element => {
    const renderCaretIcon = () => {
        if (finalWeight > initialWeight) {
            return <CaretUpIcon />;
        } else if (finalWeight === initialWeight) {
            return <EqualsIcon />;
        } else {
            return <CaretDownIcon />;
        }
    };

    return (
        <MainContainer
            hasDelete={hasDelete}
            backgroundColor={backgroundColor}
            maxWidth={maxWidth}
        >
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
            {hasDelete && (
                <ButtonContainer>
                    <GeneralButton
                        height="100%"
                        buttonBackground="#AF1432"
                        disableShadow={true}
                        width="100%"
                        buttonIconLeft={<DeleteIcon />}
                        buttonLabel=""
                        leftIconMargin="0"
                        hoverShadow="none"
                        borderRadius="0rem .2rem .2rem 0rem"
                        onClick={() => removeExerciseCard(exerciseId)}
                    />
                </ButtonContainer>
            )}
        </MainContainer>
    );
};

export default ExerciseCard;
