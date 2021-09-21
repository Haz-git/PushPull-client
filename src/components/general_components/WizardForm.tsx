import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import GeneralButton from '../general_components/GeneralButton';
import { Progress } from '@mantine/core';

//Styles:

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
            if (viewIndex > 0) {
                return (viewIndex / ((children as any).length - 1)) * 100;
            } else {
                return 0;
            }
        }
    };

    return (
        <div>
            {renderWizardFormViews()}
            <GeneralButton buttonLabel="Back" onClick={handlePrev} />
            <GeneralButton buttonLabel="Next" onClick={handleNext} />
            <Progress
                value={renderLengthProgressBar()}
                styles={{
                    root: {
                        background: '#e5e5e5',
                    },
                    bar: {
                        background: '#e07133',
                    },
                }}
            />
        </div>
    );
};

export default WizardForm;
