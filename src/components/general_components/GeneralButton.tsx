import React from 'react';
import styled from 'styled-components';

//Styles:
const StyledGeneralButton = styled.button<IGeneralButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: ${(props) => props.buttonBackground};
    padding: ${(props) => props.padding};
    border-radius: 0.3rem;
    font-family: 'Lato', sans-serif;
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    color: ${(props) => props.buttonTextColor};
    box-shadow: ${(props) =>
        props.disableShadow === true
            ? 'none'
            : 'rgba(0, 0, 0, 0.5) 0px 2px 4px'};
    overflow: hidden;
    width: ${(props) => props.width};

    transition: all 0.1s ease-in;

    &:focus {
        outline: none;
    }

    &:hover {
        box-shadow: ${(props) => props.hoverShadow};
        background-color: ${(props) => props.hoverColor};
        transform: ${(props) => props.hoverTransform};
    }
`;

const IconContainer = styled.div<IGeneralButtonProps>`
    margin-right: ${(props) => props.iconMargin};
`;

//Interface:

interface IGeneralButtonProps {
    buttonLabel?: string;
    name?: string;
    onClick?: React.MouseEventHandler;
    buttonBackground?: string;
    buttonTextColor?: string;
    isDisabledOnLoading?: boolean;
    buttonIcon?: JSX.Element | null;
    disableShadow?: boolean;
    iconMargin?: string;
    fontSize?: string;
    hoverColor?: string;
    fontWeight?: string;
    hoverTransform?: string;
    hoverShadow?: string;
    width?: string;
    padding?: string;
}

const GeneralButton = ({
    buttonLabel = 'Button',
    name = 'Button',
    buttonBackground = '#7678ED',
    buttonTextColor = 'white',
    onClick,
    isDisabledOnLoading = false,
    buttonIcon,
    disableShadow = false,
    iconMargin = '0.25rem',
    fontSize = '1em',
    hoverColor = 'none',
    fontWeight = '600',
    hoverTransform = 'scale(1.05)',
    hoverShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px,rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
    width = '100%',
    padding = '.8rem 1rem',
}: IGeneralButtonProps): JSX.Element => {
    return (
        <>
            <StyledGeneralButton
                onClick={onClick}
                name={name}
                buttonBackground={buttonBackground}
                buttonTextColor={buttonTextColor}
                disabled={isDisabledOnLoading}
                disableShadow={disableShadow}
                fontSize={fontSize}
                hoverColor={hoverColor}
                fontWeight={fontWeight}
                hoverTransform={hoverTransform}
                hoverShadow={hoverShadow}
                width={width}
                padding={padding}
            >
                <IconContainer iconMargin={iconMargin}>
                    {buttonIcon && buttonIcon}
                </IconContainer>
                {buttonLabel}
            </StyledGeneralButton>
        </>
    );
};

export default GeneralButton;
