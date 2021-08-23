import * as React from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import {
    updateCategory,
    updateEquipment,
    updateDifficulty,
    updateWorkoutSchedule,
    updateWorkoutLength,
} from '../../../redux/filterOptions/filterActions';
import { filterAndUpdateWorkoutPrograms } from '../../../redux/workoutPrograms/workoutProgramActions';

//Components:

//Styles:
import styled from 'styled-components';
import { Close } from '@styled-icons/ionicons-sharp/Close';

//Icons:
const CloseIcon = styled(Close)`
    height: 1.4rem;
    width: 1.4rem;
    color: #ffffff;
`;

const PillButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: ${(props) => props.theme.accentColors.orange};
    border-radius: 1.5rem;
    color: #ffffff;
    border: 2px solid rgba(255, 178, 134, 1);
    padding: 0.6rem 0.8rem;
    margin-right: 0.5rem;
`;

const ButtonText = styled.h3`
    color: #ffffff;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 500;
    white-space: nowrap;
`;

const CloseButton = styled.button`
    background: inherit;
    border: none;
    margin-left: 0.5rem;
    cursor: pointer;
`;

//Interfaces:

interface IComponentProps {
    filterType: string;
    pillLabel?: string;
    isResultsLoaded: boolean;
    handleIsResultsLoaded: (status: boolean) => void;
}

const MobileFilterPill = ({
    filterType,
    pillLabel,
    isResultsLoaded,
    handleIsResultsLoaded,
}: IComponentProps): JSX.Element => {
    //Redux dispatch hook:
    const dispatch = useDispatch();

    const removeFilter = (type: string) => {
        handleIsResultsLoaded(false);
        switch (type) {
            case 'category':
                dispatch(updateCategory('any'));
                dispatch(filterAndUpdateWorkoutPrograms(handleIsResultsLoaded));
                break;
            case 'equipment':
                dispatch(updateEquipment('any'));
                dispatch(filterAndUpdateWorkoutPrograms(handleIsResultsLoaded));
                break;
            case 'difficulty':
                dispatch(updateDifficulty('any'));
                dispatch(filterAndUpdateWorkoutPrograms(handleIsResultsLoaded));
                break;
            case 'workoutSchedule':
                dispatch(updateWorkoutSchedule('any'));
                dispatch(filterAndUpdateWorkoutPrograms(handleIsResultsLoaded));
                break;
            case 'workoutLength':
                dispatch(updateWorkoutLength('any'));
                dispatch(filterAndUpdateWorkoutPrograms(handleIsResultsLoaded));
                break;
        }
    };

    return (
        <PillButton>
            <ButtonText>{pillLabel}</ButtonText>
            <CloseButton onClick={() => removeFilter(filterType)}>
                <CloseIcon />
            </CloseButton>
        </PillButton>
    );
};

export default MobileFilterPill;
