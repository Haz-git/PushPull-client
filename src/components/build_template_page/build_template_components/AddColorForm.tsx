import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

//Components:
import { TextInput, Textarea, ColorInput } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';
import { updateTemplate } from '../../../redux/templates/templateActions';

const MainContainer = styled.div``;

const FormContainer = styled.div``;

const Divider = styled.div`
    height: 0.4rem;
`;

const ButtonContainer = styled.div`
    margin: 1rem 0rem 0rem 0rem;
`;

export const AddColorForm = () => {
    const dispatch = useDispatch();
    const currentSavedColors = useSelector(
        (state: RootStateOrAny) => state?.template?.templateLegend
    );
    const template = useSelector((state: RootStateOrAny) => state?.template);
    const [colorDetails, setColorDetails] = useState({
        label: '',
        description: '',
        colorHex: '',
    });
    const [formError, toggleFormError] = useState(false);

    const handleUserInput = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        if (formError) {
            toggleFormError(false);
        }

        setColorDetails({
            ...colorDetails,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = (): boolean => {
        if (!colorDetails.label || !colorDetails.colorHex) {
            return false;
        }

        return true;
    };

    const handleSaveColor = (): void => {
        if (!validateForm()) {
            toggleFormError(true);
            return;
        }

        const { label, description, colorHex } = colorDetails;

        const newColorArray = [
            ...currentSavedColors,
            { label, description, colorHex },
        ];

        dispatch(
            updateTemplate(
                (status) => console.log(status),
                template.id,
                { templateLegend: newColorArray },
                true,
                null
            )
        );
    };

    return (
        <MainContainer>
            <FormContainer>
                <TextInput
                    name="label"
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.8rem',
                            fontWeight: 500,
                        },
                    }}
                    required
                    label="Color Label"
                    placeholder={'Label your color'}
                    onChange={handleUserInput}
                    error={formError}
                />
                <Divider />
                <Textarea
                    name="description"
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.8rem',
                            fontWeight: 500,
                            height: '4rem',
                        },
                    }}
                    label="Color Description"
                    placeholder="Describe what your color means.."
                    onChange={handleUserInput}
                />
                <Divider />
                <ColorInput
                    name="colorHex"
                    required
                    styles={{
                        label: {
                            color: 'rgba(0, 0, 34, .7)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.9rem',
                            fontWeight: 700,
                            marginBottom: '.25rem',
                        },
                        input: {
                            color: 'rgba(0, 0, 34, 1)',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '.8rem',
                            fontWeight: 500,
                        },
                    }}
                    placeholder="Pick your color"
                    label="Select Color"
                    disallowInput
                    dropdownZIndex={9999}
                    onChange={(e: string) =>
                        setColorDetails({ ...colorDetails, colorHex: e })
                    }
                    error={formError}
                />
            </FormContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Save Color"
                    padding=".5rem .2rem"
                    onClick={handleSaveColor}
                />
            </ButtonContainer>
        </MainContainer>
    );
};
