import * as React from 'react';

//Components:
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { defaultFieldStyle } from '../../../styles/fieldStyles';
import { TextInput, Select } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';

//Interfaces / enums:
enum FieldName {
    InputQuestion = 'InputQuestion',
    ResponseType = 'ResponseType',
}

enum ViewerResponseTypeEnum {
    Text = 'Text',
    Number = 'Number',
}

interface IFormInput {
    InputQuestion: String;
    ResponseType: ViewerResponseTypeEnum;
}

const MainContainer = styled.div``;

export const AddViewerInputForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            InputQuestion: '',
            ResponseType: ViewerResponseTypeEnum.Number,
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    const hasFieldError = (errorObject: any, fieldName: FieldName): Boolean => {
        return fieldName in errorObject;
    };

    //Controller component auto registers for non-native components.

    return (
        <MainContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="InputQuestion"
                    control={control}
                    rules={{
                        //Set requirements here. If rules are broken errors object is updated.
                        required: {
                            value: true,
                            message: 'You must enter a question',
                        },
                    }}
                    //Objects (field) produced by controller are used to send controlled input values back to library
                    render={({ field }) => (
                        <TextInput
                            styles={defaultFieldStyle}
                            required
                            label="Question"
                            onChange={field.onChange}
                            error={hasFieldError(
                                errors,
                                FieldName.InputQuestion
                            )}
                        />
                    )}
                />
                <Controller
                    name="ResponseType"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message:
                                'You must enter a response type entered by the viewer.',
                        },
                    }}
                    render={({ field }) => (
                        <Select
                            label="Response Type"
                            required
                            placeholder="Number"
                            styles={defaultFieldStyle}
                            data={[
                                { value: 'Number', label: 'Number' },
                                { value: 'Text', label: 'Text' },
                            ]}
                            onChange={field.onChange}
                            error={hasFieldError(
                                errors,
                                FieldName.ResponseType
                            )}
                        />
                    )}
                />

                <GeneralButton
                    buttonLabel="Save Question"
                    type="submit"
                    padding=".4rem .2rem"
                    margin="1rem 0rem 0rem 0rem"
                />
            </form>
        </MainContainer>
    );
};
