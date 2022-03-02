import * as React from 'react';

//Components:
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { defaultFieldStyle } from '../../../styles/fieldStyles';
import { TextInput, Select } from '@mantine/core';

//Styles:
import styled from 'styled-components';

//Interfaces / enums:
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
    const { handleSubmit, control } = useForm<IFormInput>({
        defaultValues: {
            InputQuestion: '',
            ResponseType: ViewerResponseTypeEnum.Number,
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    console.log('render');

    //Controller component auto registers for non-native components.

    return (
        <MainContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="InputQuestion"
                    control={control}
                    rules={{ required: true }}
                    render={({
                        field: { onChange },
                        fieldState: { error },
                    }) => (
                        <TextInput
                            styles={defaultFieldStyle}
                            required
                            label="Question"
                            onChange={onChange}
                            // error={error}
                        />
                    )}
                />
                <Controller
                    name="ResponseType"
                    control={control}
                    rules={{ required: true }}
                    render={({
                        //Objects produced by controller are used to send controlled input values back to library
                        field: { onChange },
                        fieldState: { error },
                    }) => (
                        <Select
                            label="Response Type"
                            placeholder="Number"
                            styles={defaultFieldStyle}
                            data={[
                                { value: 'Number', label: 'Number' },
                                { value: 'Text', label: 'Text' },
                            ]}
                            onChange={onChange}
                            // error={error}
                        />
                    )}
                />

                <input type="submit" />
            </form>
        </MainContainer>
    );
};
