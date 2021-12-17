import * as React from 'react';
import { deviceMin } from '../../devices/breakpoints';

//Components:
import { useNProgress } from '@tanem/react-nprogress';
import { Progress } from '@mantine/core';
import { ReactComponent as DarkLogoSVG } from '../../assets/dark_logo.svg';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section``;

const ProgressContainerWrapper = styled.div<IStyledProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    /* min-height: ${(props) =>
        props.darkMode ? `calc(100vh - 3.5rem)` : `calc(100vh - 7.25rem)`}; */
    height: 100vh;
    background-color: ${(props) =>
        props.darkMode ? '#2c2c2c' : 'rgba(244, 244, 244, 1)'};
`;

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    align-items: center;
    justify-content: center;
`;

const ProgressLogoContainer = styled.div`
    width: 15rem;
`;

const ProgressText = styled.h1<IStyledProps>`
    font-size: 1.35rem;
    font-weight: 500;
    color: ${(props) => (props.darkMode ? '#ffffff' : '#1b0c0c')};

    @media ${deviceMin.mobileS} {
        font-size: 1.1rem;
        font-weight: 500;
    }

    @media ${deviceMin.browserSm} {
        font-size: 1.35rem;
    }
`;

const ProgressBarContainer = styled.div`
    height: 1rem;

    @media ${deviceMin.mobileS} {
        width: 17rem;
    }

    @media ${deviceMin.mobileM} {
        width: 20rem;
    }
`;

//Interfaces:

interface IStyledProps {
    darkMode: boolean;
}

interface IComponentProps {
    darkMode: boolean;
    isAnimating: boolean;
    animationDuration?: number;
    minimum?: number;
    incrementDuration?: number;
    loadingText?: string;
}

const LoadProgress = ({
    darkMode = false,
    isAnimating,
    animationDuration = 200,
    minimum = 0,
    incrementDuration = 800,
    loadingText = 'Entering Builder Mode...',
}: IComponentProps): JSX.Element => {
    const { isFinished, progress } = useNProgress({
        isAnimating,
        animationDuration,
        incrementDuration,
        minimum,
    });

    const renderLogo = () => {
        if (darkMode) return <DarkLogoSVG />;
        return <LogoSVG />;
    };

    const renderLoadProgress = () => {
        return (
            <>
                <ProgressLogoContainer>{renderLogo()}</ProgressLogoContainer>
                <ProgressText darkMode={darkMode}>{loadingText}</ProgressText>
                <ProgressBarContainer>
                    <Progress
                        size="md"
                        value={isAnimating ? progress * 100 : 0}
                        styles={{
                            root: {
                                background: '#ffffff',
                            },
                            bar: {
                                background: '#e07133',
                            },
                        }}
                    />
                </ProgressBarContainer>
            </>
        );
    };

    return (
        <MainContainer>
            <ProgressContainerWrapper darkMode={darkMode}>
                <ProgressContainer>{renderLoadProgress()}</ProgressContainer>
            </ProgressContainerWrapper>
        </MainContainer>
    );
};

export default LoadProgress;
