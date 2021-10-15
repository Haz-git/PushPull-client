import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import { deviceMin } from '../../devices/breakpoints';
import scrollToTop from '../../utils/scrollToTop';
import WizardStepNavigationColumn from '../general_components/WizardStepNavigationColumn';
import GeneralButton from '../general_components/GeneralButton';
import { Progress } from '@mantine/core';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    height: 100vh;
    overflow: scroll;
`;

const ProgressBarContainer = styled.div`
    top: 0;
    position: sticky;
    position: -webkit-sticky;
    z-index: 50;
`;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 8fr;

    @media ${deviceMin.mobileS} {
        display: block;
    }

    @media ${deviceMin.browserSm} {
        display: grid;
        grid-template-columns: 1fr 8fr;
    }
`;

const ChildrenContainer = styled.div`
    margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-right: 2rem;
`;

//Interfaces:

interface IComponentProps {
    children: React.ReactNode;
    progressIndicator: number;
}

const WizardForm = ({
    children,
    progressIndicator,
}: IComponentProps): JSX.Element => {
    //Scroll to top on component render:
    useEffect(() => {
        scrollToTop();
    }, []);

    const [viewIndex, setViewIndex] = useState(0);

    const returnChildrenLength = () => {
        if (children) {
            return (children as any).length;
        }
    };

    //Handle Prev or Next Requests:
    const handleNext = () => {
        if ((children as any)[viewIndex + 1] !== undefined) {
            setViewIndex(viewIndex + 1);
            scrollToTop();
        }
    };

    const handlePrev = () => {
        if (viewIndex > 0) {
            setViewIndex(viewIndex - 1);
            scrollToTop();
        }
    };

    //Handle requests to a specific view:
    const handleSpecificViewRequest = (viewNum: number) => {
        if (viewNum >= 0 && viewNum < (children as any).length)
            setViewIndex(viewNum);
        scrollToTop();
    };

    //Render different wizard form views:
    const renderWizardFormViews = () => {
        if (children) {
            return <>{(children as any)[viewIndex]}</>;
        }
    };

    //Renders the length of the progress bar
    const renderLengthProgressBar = () => {
        //Instead of rendering the progress bar via the number of children, we should render the length of the progress bar via number of fields entered..later

        let currentProgress = 0;
        if (progressIndicator) {
            currentProgress = progressIndicator * 9.091;
        }

        return currentProgress;
    };

    //Parses the id's of the children, and turns them into the WizardStepNavigationColumn's Step Titles:
    const parseChildrenIdToStepTitle = () => {
        if (children) {
            let stepTitles: any[] = [];

            for (let i = 0; i < (children as any).length; i++) {
                let tempObj: { [key: string]: any } = {};

                tempObj['stepNum'] = i;
                tempObj['stepTitle'] = (children as any)[i].props.id;

                stepTitles.push(tempObj);
            }

            return stepTitles;
        }
    };

    const renderPaginationButtons = () => {
        if (returnChildrenLength() === viewIndex + 1) {
            //if length of children === viewIndex, it means we are at the last page.
            return (
                <>
                    <GeneralButton
                        buttonLabel="Back"
                        onClick={handlePrev}
                        width="6rem"
                    />
                    <GeneralButton
                        buttonLabel="Submit my Review"
                        onClick={handleNext}
                        width="12rem"
                    />
                </>
            );
        }

        return (
            <>
                <GeneralButton
                    buttonLabel="Back"
                    onClick={handlePrev}
                    width="6rem"
                />
                <GeneralButton
                    buttonLabel="Next"
                    onClick={handleNext}
                    width="6rem"
                />
            </>
        );
    };

    return (
        <MainContainer>
            <ProgressBarContainer>
                <Progress
                    value={renderLengthProgressBar()}
                    radius="xs"
                    styles={{
                        root: {
                            background: '#e5e5e5',
                        },
                        bar: {
                            background: '#e07133',
                        },
                    }}
                />
            </ProgressBarContainer>
            <FormContainer>
                <WizardStepNavigationColumn
                    numSteps={(children as any).length}
                    currentStep={viewIndex}
                    steps={parseChildrenIdToStepTitle()}
                    requestView={handleSpecificViewRequest}
                />
                <ChildrenContainer>
                    {renderWizardFormViews()}
                    <ButtonContainer>
                        {renderPaginationButtons()}
                    </ButtonContainer>
                </ChildrenContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default WizardForm;
