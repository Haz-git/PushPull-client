import React from 'react';
import styled from 'styled-components';

//Styles:
const StyledGeneralButton = styled.button<IGeneralButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${(props) => props.border};
    border-top: ${(props) => props.borderTop};
    border-bottom: ${(props) => props.borderBottom};
    border-left: ${(props) => props.borderLeft};
    border-right: ${(props) => props.borderRight};
    margin: ${(props) => props.margin};
    background: ${(props) => props.buttonBackground};
    padding: ${(props) => props.padding};
    border-radius: ${(props) => props.borderRadius};
    font-family: 'Lato', sans-serif;
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    color: ${(props) => props.buttonTextColor};
    box-shadow: ${(props) =>
        props.disableShadow === true
            ? 'none'
            : 'rgba(0, 0, 0, 0.5) 0px 1px 2px'};
    overflow: hidden;
    width: ${(props) => props.width};
    text-shadow: ${(props) => props.textShadow};
    transition: all 0.1s ease-in;
    height: ${(props) => props.height};

    &:focus {
        outline: none;
    }

    &:hover {
        box-shadow: ${(props) => props.hoverShadow};
        background-color: ${(props) => props.hoverColor};
        transform: ${(props) => props.hoverTransform};
    }
`;

const LeftIconContainer = styled.div<IGeneralButtonProps>`
    margin: ${(props) => props.leftIconMargin};
`;

const RightIconContainer = styled.div<IGeneralButtonProps>`
    margin: ${(props) => props.rightIconMargin};
`;

//Interface:

interface IGeneralButtonProps {
    buttonLabel?: string;
    name?: string;
    onClick?: React.MouseEventHandler;
    buttonBackground?: string;
    buttonTextColor?: string;
    isDisabledOnLoading?: boolean;
    buttonIconLeft?: JSX.Element | null;
    buttonIconRight?: JSX.Element | null;
    disableShadow?: boolean;
    leftIconMargin?: string;
    rightIconMargin?: string;
    fontSize?: string;
    hoverColor?: string;
    fontWeight?: string;
    hoverTransform?: string;
    hoverShadow?: string;
    width?: string;
    padding?: string;
    margin?: string;
    textShadow?: string;
    border?: string;
    borderTop?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRight?: string;
    height?: string;
    borderRadius?: string;
    type?: 'button' | 'submit' | 'reset';
}

const GeneralButton = ({
    buttonLabel = 'Button',
    name = 'Button',
    buttonBackground = '#7678ED',
    buttonTextColor = 'white',
    onClick,
    isDisabledOnLoading = false,
    buttonIconLeft,
    buttonIconRight,
    disableShadow = false,
    leftIconMargin = '0rem 0.25rem 0rem 0rem',
    rightIconMargin = '0rem 0rem 0rem .25rem',
    fontSize = '1em',
    hoverColor = 'none',
    fontWeight = '600',
    hoverTransform = 'scale(1.01)',
    hoverShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px,rgba(0, 0, 0, 0.3) 0px 7px 13px -1px,rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
    width = '100%',
    padding = '.8rem 1rem',
    margin = '0rem 0rem',
    textShadow = 'rgba(0, 0, 34, .5) 1px 1px 0',
    border = 'none',
    borderTop = 'none',
    borderBottom = 'none',
    borderLeft = 'none',
    borderRight = 'none',
    height = 'auto',
    borderRadius = '0.2rem',
    type = 'submit',
}: IGeneralButtonProps): JSX.Element => {
    const renderBtnLabel = () => {
        if (buttonLabel !== '') return buttonLabel;
        return null;
    };
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
                margin={margin}
                textShadow={textShadow}
                border={border}
                height={height}
                borderRadius={borderRadius}
                type={type}
                borderTop={borderTop}
                borderBottom={borderBottom}
                borderLeft={borderLeft}
                borderRight={borderRight}
            >
                <LeftIconContainer leftIconMargin={leftIconMargin}>
                    {buttonIconLeft && buttonIconLeft}
                </LeftIconContainer>
                {renderBtnLabel()}
                <RightIconContainer rightIconMargin={rightIconMargin}>
                    {buttonIconRight && buttonIconRight}
                </RightIconContainer>
            </StyledGeneralButton>
        </>
    );
};

export default GeneralButton;
