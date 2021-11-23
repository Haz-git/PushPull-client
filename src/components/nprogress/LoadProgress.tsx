import * as React from 'react';

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
    min-height: ${(props) =>
        props.isLoadBuilderMode
            ? `calc(100vh - 3.5rem)`
            : `calc(100vh - 7.25rem)`};
    background-color: ${(props) =>
        props.isLoadBuilderMode ? '#2c2c2c' : 'rgba(244, 244, 244, 1)'};
`;

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    align-items: center;
    justify-content: center;
`;

const ProgressLogoContainer = styled.div`
    width: 30rem;
`;

const ProgressText = styled.h1<IStyledProps>`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${(props) =>
        props.isLoadBuilderMode ? '#ffffff' : props.theme.subText}; ;
`;

const ProgressBarContainer = styled.div`
    height: 1rem;
    width: 30rem;
`;

//Interfaces:

interface IStyledProps {
    isLoadBuilderMode: boolean;
}

interface IComponentProps {
    isLoadBuilderMode: boolean;
    isAnimating: boolean;
    animationDuration?: number;
    minimum?: number;
    incrementDuration?: number;
}

const LoadProgress = ({
    isLoadBuilderMode = true,
    isAnimating,
    animationDuration = 200,
    minimum = 0,
    incrementDuration = 800,
}: IComponentProps): JSX.Element => {
    const { isFinished, progress } = useNProgress({
        isAnimating,
        animationDuration,
        incrementDuration,
        minimum,
    });

    const renderLoadProgress = () => {
        if (isLoadBuilderMode && isLoadBuilderMode === true) {
            return (
                <>
                    <ProgressLogoContainer>
                        <DarkLogoSVG />
                    </ProgressLogoContainer>
                    <ProgressText isLoadBuilderMode={isLoadBuilderMode}>
                        Entering Builder Mode...
                    </ProgressText>
                    <ProgressBarContainer>
                        <Progress
                            size="xl"
                            value={progress * 100}
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
        }
        return (
            <>
                <ProgressLogoContainer>
                    <LogoSVG />
                </ProgressLogoContainer>
                <ProgressText isLoadBuilderMode={isLoadBuilderMode}>
                    Entering Review Form...
                </ProgressText>
                <ProgressBarContainer>
                    <Progress
                        size="xl"
                        value={progress * 100}
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
            <ProgressContainerWrapper isLoadBuilderMode={isLoadBuilderMode}>
                <ProgressContainer>{renderLoadProgress()}</ProgressContainer>
            </ProgressContainerWrapper>
        </MainContainer>
    );
};

export default LoadProgress;
