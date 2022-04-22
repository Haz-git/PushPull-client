import * as React from 'react';

//Redux:

//Components:
import TimeField from 'react-simple-timefield';
import Text from './Text';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    cursor: default;
`;

const LabelContainer = styled.div`
    margin-top: 0.2rem;
    cursor: default;
`;

const StyledInput = styled.input<IInputProps>`
    border: 1px solid #d1d4d6;
    width: 100%;
    padding: 0rem 0rem 0rem 0.8rem;
    border-radius: 0.3rem;
    height: 36px;
    color: rgba(0, 0, 34, 1);
    font-family: Lato, sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    outline: none; //Needs this to remove default black bold border.
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    pointer: ${({ isDisabled }) => (isDisabled ? 'text' : 'not-allowed')};
    background: ${({ isDisabled }) => (isDisabled ? '#eff1f2' : '#ffffff')};

    &:focus {
        border: 1px solid #e07133;
    }
`;

//Interfaces:

interface IInputProps {
    isDisabled?: boolean;
}

interface IComponentProps {
    label?: string;
    value?: string;
    onChange?: (event: any, value: string) => void;
    isDisabled?: boolean;
}

/**
 * @description Facade over react-simple-timefield
 *
 */

export const UITimeField = ({
    label,
    value,
    onChange,
    isDisabled,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <LabelContainer>
                <Text text={label} subText={true} />
            </LabelContainer>
            <TimeField
                onChange={onChange}
                value={value}
                input={
                    <StyledInput
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                    />
                }
            />
        </MainContainer>
    );
};
