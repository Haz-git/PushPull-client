import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import Text from '../../general_components/Text';
import { Collapse } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import { v4 as uuid } from 'uuid';
//Styles:
import styled from 'styled-components';
import { CaretDown } from '@styled-icons/fluentui-system-filled/CaretDown';

const CaretDownIcon = styled(CaretDown)`
    height: 1.75rem;
    width: 1.75rem;
    color: #e07133;
`;

const MainContainer = styled.div`
    font-family: 'Lato';
    font-size: 1rem;
    padding: 0.5rem 0.35rem 0.5rem 0.35rem;
`;

const Spacer = styled.div`
    height: 0.25rem;
`;

const SetWrapper = styled.div``;

const SetContainer = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 0.8fr 0.8fr 1.2fr;
`;

const ExerciseDetails = styled.div`
    text-align: center;
    padding: 0.2rem 0.2rem;
    background: #ececec;
    margin: 0 0.1rem;
    border-radius: 0.3rem;
`;

const ExerciseDetailSpacer = styled.div`
    height: 0.2rem;
`;

//Interfaces:

interface IComponentProps {
    shouldShowCollapseLayout: boolean;
    composedWeightUnit: string | undefined;
    configuredSets: any;
}

export const BlockTypeExerciseDataCollapse = ({
    shouldShowCollapseLayout,
    composedWeightUnit,
    configuredSets,
}: IComponentProps): JSX.Element => {
    const [isCollapseOpen, toggleCollapse] = useState(false);

    useEffect(() => {
        //Setting UUID for keys initially here. Docs mention wise to do it only once instead of
        //Something I've been doing for a while: key={uuid()}.. oops!
        Object.values(configuredSets).map((set: any) => {
            set['uuid'] = uuid();
        });
    }, [configuredSets]);

    const renderTotalSets = (): React.ReactNode => {
        //For some reason, this still returns a "unique key prop" error even though outermost element has a unique key...
        return Object.values(configuredSets).map((set: any) => (
            <SetWrapper key={set.uuid}>
                <Spacer />
                <SetContainer>
                    <ExerciseDetails>
                        <Text
                            text={`Set`}
                            fontSize=".75rem"
                            fontWeight="800"
                            subText={true}
                        />
                        <ExerciseDetailSpacer />
                        <Text
                            text={set.fieldId}
                            fontSize="1rem"
                            fontWeight="800"
                            mainText={true}
                        />
                    </ExerciseDetails>
                    <ExerciseDetails>
                        <Text
                            text={`Reps`}
                            fontSize=".75rem"
                            fontWeight="800"
                            subText={true}
                        />
                        <ExerciseDetailSpacer />
                        <Text
                            text={set.reps}
                            fontSize="1rem"
                            fontWeight="800"
                            mainText={true}
                        />
                    </ExerciseDetails>
                    <ExerciseDetails>
                        <Text
                            text={composedWeightUnit}
                            fontSize=".75rem"
                            fontWeight="800"
                            subText={true}
                        />
                        <ExerciseDetailSpacer />
                        <Text
                            text={
                                composedWeightUnit === 'Kgs'
                                    ? set.weightMetric
                                    : set.weightImperial
                            }
                            fontSize="1rem"
                            fontWeight="800"
                            mainText={true}
                        />
                    </ExerciseDetails>
                </SetContainer>
            </SetWrapper>
        ));
    };

    return (
        <>
            {shouldShowCollapseLayout ? (
                <MainContainer>
                    <GeneralButton
                        onClick={() => toggleCollapse(!isCollapseOpen)}
                        buttonLabel={`Total Sets (${
                            Object.keys(configuredSets).length
                        })`}
                        padding=".1rem .2rem"
                        disableShadow={true}
                        hoverShadow="none"
                        hoverTransform="none"
                        hoverColor="none"
                        cursor="pointer"
                        buttonBackground="#ececec"
                        buttonTextColor="rgba(0, 0, 34, 1)"
                        textShadow="none"
                        fontSize=".9rem"
                        fontWeight="800"
                        buttonIconLeft={<CaretDownIcon />}
                    />
                    <Spacer />
                    <Collapse in={isCollapseOpen}>{renderTotalSets()}</Collapse>
                </MainContainer>
            ) : null}
        </>
    );
};