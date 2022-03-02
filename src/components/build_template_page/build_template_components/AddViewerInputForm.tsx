import * as React from 'react';

//Components:
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { defaultFieldStyle } from '../../../styles/fieldStyles';
import { TextInput, Select } from '@mantine/core';

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
                        //Set requirements here. If rules are broke errors object is updated.
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
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            label="Response Type"
                            placeholder="Number"
                            styles={defaultFieldStyle}
                            data={[
                                { value: 'Number', label: 'Number' },
                                { value: 'Text', label: 'Text' },
                            ]}
                            onChange={field.onChange}
                            // error={error}
                        />
                    )}
                />

                <input type="submit" />
            </form>
        </MainContainer>
    );
};
