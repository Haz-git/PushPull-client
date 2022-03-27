import * as React from 'react';
import { useState } from 'react';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { ModalActionTypes } from '../../../redux/modals/action-types';
import { toggleModal } from '../../../redux/modals/modalActions';
import { updateTemplate } from '../../../redux/templates/templateActions';

//Components:
import { TextInput, Textarea, ColorInput } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import { v4 as uuid } from 'uuid';

//Styles:
import styled from 'styled-components';
import { loaderTypes } from '../../../redux/uiLoader/loader-types';

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
    const [hasFormError, setHasFormError] = useState<boolean>(false);

    const handleUserInput = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        if (hasFormError) {
            setHasFormError(false);
        }

        setColorDetails({
            ...colorDetails,
            [event.target.name]: event.target.value,
        });
    };

    const isFormValid = (): boolean => {
        if (!colorDetails.label || !colorDetails.colorHex) {
            return false;
        }

        return true;
    };

    const handleSaveColor = (): void => {
        if (!isFormValid()) {
            setHasFormError(true);
            return;
        }

        const { label, description, colorHex } = colorDetails;
        const newColorArray = [
            ...currentSavedColors,
            { id: uuid(), label, description, colorHex },
        ];

        dispatch(
            updateTemplate(
                (status) => {},
                template.id,
                { templateLegend: newColorArray },
                true,
                false,
                null,
                null,
                loaderTypes.VIEWER_INTERACTIONS_SETTINGS_MODAL
            )
        );

        dispatch(
            toggleModal(ModalActionTypes.ADD_COLOR_SWATCH_POPOVER, 'CLOSE')
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
                    error={hasFormError}
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
                    onChange={(hexcode: string) =>
                        setColorDetails({ ...colorDetails, colorHex: hexcode })
                    }
                    error={hasFormError}
                />
            </FormContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Save Color"
                    padding=".4rem .2rem"
                    onClick={handleSaveColor}
                />
            </ButtonContainer>
        </MainContainer>
    );
};
