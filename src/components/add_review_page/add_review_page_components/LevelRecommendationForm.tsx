import * as React from 'react';
import { useState } from 'react';

//Components:
import { Select } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import { ReactComponent as BeginnerLevelSVG } from '../../../assets/beginner.svg';
import { ReactComponent as IntermediateLevelSVG } from '../../../assets/intermediate.svg';
import { ReactComponent as AdvancedLevelSVG } from '../../../assets/advanced.svg';

//Styles:
import styled from 'styled-components';
import {
    MainContainer,
    FormTitleContainer,
    FormTitle,
    FormContainer,
    FormInputContainer,
    FormSubtitle,
    FormDescContainer,
    FormDesc,
} from './StarRatingsForm';

const SvgContainer = styled.button<SvgContainerProps>`
    text-align: center;
    height: 12rem;
    width: 15rem;
    padding: 1rem 1rem;
    background: ${(props) => (props.isSelected ? '#ffffff' : 'transparent')};
    border: ${(props) =>
        props.isSelected
            ? '1px solid rgba(224, 113, 51, 1)'
            : '1px solid #e5e5e5'};
    border-radius: 0.3rem;
    margin-right: 2rem;
    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
        background: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px,
            rgba(0, 0, 0, 0.23) 0px 1px 6px;
        transform: scale(1.01);
    }
`;

const SvgText = styled.p`
    font-size: 1.1rem;
    font-weight: 700;
    color: ${(props) => props.theme.subText};
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 2rem 0 1rem 0;
`;

const InfoContainer = styled.div``;

const InfoText = styled.p`
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.mainText};
`;

const NumberInputContainer = styled.div`
    margin: 2rem 0 1rem 0;
`;

//Interfaces

interface SvgContainerProps {
    isSelected: boolean;
}

interface IComponentProps {
    onChangeHandler: (name: string, val: string) => void;
}

const LevelRecommendationForm = ({
    onChangeHandler,
}: IComponentProps): JSX.Element => {
    const [userLevel, setUserLevel] = useState('');
    const [userRecommendation, setUserRecommendation] = useState('');

    const handleUserLevelSelection = (val: string) => {
        setUserLevel(val);
    };

    const handleUserRecommendationSelection = (val: string) => {
        setUserRecommendation(val);
    };

    const selectionDesc = {
        beginner:
            'Example: I have been training for a few months. Linear Progression works well for me.',
        intermediate:
            'Example: I have been training for a few years. Short-term Periodization works well for me.',
        advanced:
            'Example: I have been training for many years. Long-term Periodization works well for me.',
    };

    const parseInfoText = () => {
        if (userLevel !== '') {
            switch (userLevel) {
                case 'beginner':
                    return <InfoText>{selectionDesc.beginner}</InfoText>;
                case 'intermediate':
                    return <InfoText>{selectionDesc.intermediate}</InfoText>;
                case 'advanced':
                    return <InfoText>{selectionDesc.advanced}</InfoText>;
            }
        }
    };

    const identifySelected = (curr: string, selectionType: string) => {
        switch (selectionType) {
            case 'userLevel':
                if (curr === userLevel) return true;
                else return false;
            case 'recommendLevel':
                if (curr === userRecommendation) return true;
                else return false;
            default:
                return false;
        }
    };

    return (
        <MainContainer>
            <FormTitleContainer>
                <FormTitle>Level Recommendations</FormTitle>
            </FormTitleContainer>
            <FormContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        What level would you consider yourself to be?
                    </FormSubtitle>
                    <FormDescContainer>
                        <FormDesc>
                            There's no formal classification on this subject,
                            however a good judgement combines both the length of
                            time you've been training and response to training
                            stimulus.
                        </FormDesc>
                    </FormDescContainer>
                    <SelectContainer>
                        <SvgContainer
                            isSelected={identifySelected(
                                'beginner',
                                'userLevel'
                            )}
                            onClick={() =>
                                onChangeHandler('currentLevel', 'beginner')
                            }
                        >
                            <SvgText>Beginner</SvgText>
                            <BeginnerLevelSVG />
                        </SvgContainer>
                        <SvgContainer
                            isSelected={identifySelected(
                                'intermediate',
                                'userLevel'
                            )}
                            onClick={() =>
                                onChangeHandler('currentLevel', 'intermediate')
                            }
                        >
                            <SvgText>Intermediate</SvgText>
                            <IntermediateLevelSVG />
                        </SvgContainer>
                        <SvgContainer
                            isSelected={identifySelected(
                                'advanced',
                                'userLevel'
                            )}
                            onClick={() =>
                                onChangeHandler('currentLevel', 'advanced')
                            }
                        >
                            <SvgText>Advanced</SvgText>
                            <AdvancedLevelSVG />
                        </SvgContainer>
                    </SelectContainer>
                    <InfoContainer>{parseInfoText()}</InfoContainer>
                </FormInputContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        Who would you recommend this program to?
                    </FormSubtitle>
                    <SelectContainer>
                        <SvgContainer
                            name="recommendedLevel"
                            isSelected={identifySelected(
                                'beginner',
                                'recommendLevel'
                            )}
                            onClick={() =>
                                handleUserRecommendationSelection('beginner')
                            }
                        >
                            <SvgText>Beginner</SvgText>
                            <BeginnerLevelSVG />
                        </SvgContainer>
                        <SvgContainer
                            name="recommendedLevel"
                            isSelected={identifySelected(
                                'intermediate',
                                'recommendLevel'
                            )}
                            onClick={() =>
                                handleUserRecommendationSelection(
                                    'intermediate'
                                )
                            }
                        >
                            <SvgText>Intermediate</SvgText>
                            <IntermediateLevelSVG />
                        </SvgContainer>
                        <SvgContainer
                            name="recommendedLevel"
                            isSelected={identifySelected(
                                'advanced',
                                'recommendLevel'
                            )}
                            onClick={() =>
                                handleUserRecommendationSelection('advanced')
                            }
                        >
                            <SvgText>Advanced</SvgText>
                            <AdvancedLevelSVG />
                        </SvgContainer>
                    </SelectContainer>
                </FormInputContainer>
                <FormInputContainer>
                    <FormSubtitle>
                        Approximately how many days did you run this program?
                    </FormSubtitle>
                    <NumberInputContainer>
                        <NumberInput
                            label="Estimated Days"
                            min={1}
                            max={180}
                            required
                            styles={{
                                root: {
                                    maxWidth: '40rem',
                                },
                                label: {
                                    color: 'rgba(0, 0, 34, .7)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    marginBottom: '.25rem',
                                },
                                input: {
                                    color: 'rgba(0, 0, 34, 1)',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                },
                            }}
                        />
                    </NumberInputContainer>
                </FormInputContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default LevelRecommendationForm;
