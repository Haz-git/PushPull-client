import React from 'react';
import { useState } from 'react';

//Components:
import Text from '../../general_components/Text';
import { TextInput, Textarea, Select } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import useQuery from '../../../utils/hooks/useQuery';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { updateTemplate } from '../../../redux/templates/templateActions';

//Styles:
import styled from 'styled-components';
import { loaderTypes } from '../../../redux/uiLoader/loader-types';

const MainContainer = styled.div`
    padding: 0rem 0.5rem;
    position: relative;
`;

const FormContainer = styled.div``;

const Spacer = styled.div`
    height: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 0.5rem;
    padding: 1rem 0rem 0rem 0rem;
`;

interface ITemplateStateObject {
    templateFileTitle: string;
    templateFileDesc: string;
    templateWeightUnit: string;
    templateLegend: any[];
    templateUserInputs: any[];
}

interface IComponentProps {
    toggleGlobalSettingsModal: (state: boolean) => void;
}

export const GlobalSettingsForm = ({
    toggleGlobalSettingsModal,
}: IComponentProps): JSX.Element => {
    const query = useQuery();
    const currentSheetId = query.get('sheetId');
    const dispatch = useDispatch();
    //TODO: Rename userInputs to viewerInputs as it makes more sense.
    const {
        templateFileTitle,
        templateFileDesc,
        templateWeightUnit,
        templateLegend,
        templateUserInputs,
        projectId,
        id,
    } = useSelector((state: RootStateOrAny) => state?.template);

    //Error state:
    const [hasError, setHasError] = useState(false);

    //Modal Error State:
    const [templateState, setTemplateState] = useState({
        templateFileTitle: templateFileTitle,
        templateFileDesc: templateFileDesc,
        templateWeightUnit: templateWeightUnit,
        templateLegend: templateLegend,
        templateUserInputs: templateUserInputs,
    });

    const handleUserInput = (name: string, val: string | number | []): void => {
        setTemplateState({
            ...templateState,
            [name]: val,
        });
    };

    const checkTemplateTitleLength = (): boolean => {
        return templateState.templateFileTitle.length;
    };

    const filterBetweenUserInputAndState = (
        stateObject: any,
        userObject: any
    ): any[] => {
        return Object.keys(userObject).filter(
            (item: any) => userObject[item] !== stateObject[item]
        );
        //Don't know how to get rid of TS Error without using 'any' here..
    };

    const convertNewChangeArrayToObject = (array: any[]): any => {
        if (!array.length) {
            return {};
        }
        let changeObj = {} as ITemplateStateObject;

        array.forEach((item: keyof ITemplateStateObject) => {
            changeObj[item] = templateState[item];
        });

        return changeObj;
    };

    const findUserNewChanges = (): any => {
        const newChanges = filterBetweenUserInputAndState(
            {
                templateFileTitle,
                templateFileDesc,
                templateWeightUnit,
                templateLegend,
                templateUserInputs,
            },
            templateState
        );

        return convertNewChangeArrayToObject(newChanges);
    };

    const handleSaveGlobalSettings = () => {
        if (!checkTemplateTitleLength()) {
            setHasError(true);
            return;
        }

        return dispatch(
            updateTemplate(
                (status) => {},
                id,
                findUserNewChanges(),
                true,
                projectId,
                toggleGlobalSettingsModal,
                loaderTypes.GLOBAL_SETTINGS_MODAL
            )
        );
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
                    label="Template Title"
                    placeholder={templateState.templateFileTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (hasError) {
                            setHasError(false);
                        }
                        handleUserInput('templateFileTitle', e.target.value);
                    }}
                    value={templateState.templateFileTitle}
                    error={hasError}
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
                    label="Template Description"
                    placeholder={templateState.templateFileDesc}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleUserInput('templateFileDesc', e.target.value);
                    }}
                    value={templateState.templateFileDesc}
                />
                <Spacer />
                <Select
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
                    label="Template Measurement Unit"
                    placeholder="Choose a Category"
                    data={[
                        {
                            value: 'IMPERIAL',
                            label: 'Imperial System (Lbs)',
                        },
                        {
                            value: 'METRIC',
                            label: 'Metric System (Kg)',
                        },
                    ]}
                    value={templateState.templateWeightUnit}
                    onChange={(value: string) => {
                        handleUserInput('templateWeightUnit', value);
                    }}
                    required
                />
                <Spacer />
                <ButtonContainer>
                    <GeneralButton
                        buttonLabel="Save"
                        width="6rem"
                        buttonBackground="#41A312"
                        fontSize="1rem"
                        height="2rem"
                        leftIconMargin="0rem .3rem -.2rem 0rem"
                        onClick={() => handleSaveGlobalSettings()}
                    />
                    <GeneralButton
                        buttonLabel="Cancel"
                        width="6rem"
                        buttonBackground="#ececec"
                        buttonTextColor="rgba(0, 0, 34, 1)"
                        textShadow="none"
                        disableShadow={true}
                        hoverShadow="none"
                        border="1px solid #c6c6c6"
                        fontSize="1rem"
                        height="2rem"
                        onClick={() => toggleGlobalSettingsModal(false)}
                    />
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    );
};
