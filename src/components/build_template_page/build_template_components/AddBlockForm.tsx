import React from 'react';
import { useState } from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import { TextInput, Textarea, NumberInput } from '@mantine/core';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { addToolbarBlock } from '../../../redux/templates/templateActions';
//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 0rem 0.5rem;
`;

const FormContainer = styled.div``;

const Spacer = styled.div`
    height: 1rem;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
`;

const ButtonContainer = styled.div`
    margin: 2rem 0rem 1rem 0rem;
`;

//Interfaces:

interface IComponentProps {
    closeModal: () => void;
}

const AddBlockForm = ({ closeModal }: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const currTemplate = useSelector(
        (state: RootStateOrAny) => state?.template
    );

    //Modal input state
    const [userInput, setUserInput] = useState({
        name: '',
        desc: '',
        sets: '0',
        reps: '0',
    });

    //Error state:
    const [hasError, setHasError] = useState(false);

    const checkUserBeforeSubmission = () => {
        if (userInput.name === '') {
            return false;
        }

        return true;
    };

    const handleUserInput = (name: string, val: string | number) => {
        setUserInput({
            ...userInput,
            [name]: val,
        });
    };

    const dispatchBlock = () => {
        if (checkUserBeforeSubmission()) {
            dispatch(
                addToolbarBlock(currTemplate.id, { blockDetails: userInput })
            );

            return closeModal();
        }

        return setHasError(true);
    };

    return (
        <MainContainer>
            <FormContainer>
                <TextInput
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 500,
                        },
                    }}
                    required
                    label="Block Name"
                    placeholder={'Name your exercise'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (hasError) setHasError(false);
                        handleUserInput('name', e.target.value);
                    }}
                    value={userInput.name}
                    error={hasError}
                    // disabled={isCreatingNewProject}
                />
                <Spacer />
                <Textarea
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 500,
                            height: '8rem',
                        },
                    }}
                    label="Block Description"
                    placeholder="Block name and description can be updated at any time"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleUserInput('desc', e.target.value);
                    }}
                    value={userInput.desc}
                    // disabled={isCreatingNewProject}
                />
                <Spacer />
                <FlexWrapper>
                    <NumberInput
                        value={Number(userInput.sets)}
                        label="Total Sets"
                        min={0}
                        max={99}
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
                        onChange={(val: number) =>
                            handleUserInput('sets', String(val))
                        }
                    />
                    <NumberInput
                        value={Number(userInput.reps)}
                        label="Reps Per Set"
                        min={0}
                        max={99}
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
                        onChange={(val: number) =>
                            handleUserInput('reps', String(val))
                        }
                    />
                </FlexWrapper>
            </FormContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Click to add test block"
                    onClick={dispatchBlock}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default AddBlockForm;
