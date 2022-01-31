import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainText = styled.p<IComponentProps>`
    font-family: 'Lato';
    font-weight: ${(props) => Number(props.fontWeight)};
    color: ${(props) => props.textColor};
    font-size: ${(props) => props.fontSize};
    width: ${(props) => props.truncateWidth};
    white-space: ${(props) =>
        props.truncateWidth === '100%' ? 'normal' : 'nowrap'};
    overflow: ${(props) =>
        props.truncateWidth === '100%' ? 'visible' : 'hidden'};
    text-overflow: ${(props) =>
        props.truncateWidth === '100%' ? 'clip' : 'ellipsis'};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    text-shadow: ${(props) => props.textShadow};
`;

//Interfaces:

interface IComponentProps {
    text?: string;
    fontWeight?: string;
    textColor?: string;
    fontSize?: string;
    subText?: boolean;
    mainText?: boolean;
    truncateWidth?: string | undefined;
    textShadow?: string;
}

const Text = ({
    text,
    fontWeight = '700',
    textColor,
    fontSize = '1rem',
    subText,
    mainText,
    truncateWidth = '100%',
    textShadow = 'none',
}: IComponentProps): JSX.Element => {
    const renderTextColor = () => {
        if (textColor) return textColor;
        if (!textColor && !mainText && subText) return 'rgba(0, 0, 34, .7)';
        if (!textColor && !subText && mainText) return 'rgba(0, 0, 34, 1)';
    };

    return (
        <MainText
            fontWeight={fontWeight}
            textColor={renderTextColor()}
            fontSize={fontSize}
            truncateWidth={truncateWidth}
            textShadow={textShadow}
        >
            {text}
        </MainText>
    );
};

export default Text;
