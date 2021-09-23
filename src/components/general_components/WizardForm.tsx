import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import WizardStepNavigationColumn from '../general_components/WizardStepNavigationColumn';
import GeneralButton from '../general_components/GeneralButton';
import { Progress } from '@mantine/core';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section``;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 8fr;
    height: 100vh;
`;

const ChildrenContainer = styled.div``;

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
}

const WizardForm = ({ children }: IComponentProps): JSX.Element => {
    const [viewIndex, setViewIndex] = useState(0);

    //Handle Prev or Next Requests:
    const handleNext = () => {
        if ((children as any)[viewIndex + 1] !== undefined) {
            setViewIndex(viewIndex + 1);
        }
    };

    const handlePrev = () => {
        if (viewIndex > 0) {
            setViewIndex(viewIndex - 1);
        }
    };

    //Handle requests to a specific view:
    const handleSpecificViewRequest = (viewNum: number) => {
        if (viewNum >= 0 && viewNum < (children as any).length)
            setViewIndex(viewNum);
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
        if (children) {
            if (viewIndex >= 0)
                return (viewIndex / ((children as any).length - 1)) * 100;
        }
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

    return (
        <MainContainer>
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
                    </ButtonContainer>
                </ChildrenContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default WizardForm;
