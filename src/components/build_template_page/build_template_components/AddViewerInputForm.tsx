import * as React from 'react';

//Components:
import { useForm, SubmitHandler } from 'react-hook-form';

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
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    return (
        <MainContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Question</label>
                <input {...register('InputQuestion')} />
                <label>Response Type</label>
                <select {...register('ResponseType')}>
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                </select>
                <input type="submit" />
            </form>
        </MainContainer>
    );
};
