import * as React from 'react';
import { useState, useEffect } from 'react';

//Components:
import GeneralButton from '../general_components/GeneralButton';

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

    return (
        <div>
            {renderWizardFormViews()}
            <GeneralButton buttonLabel="Back" onClick={handlePrev} />
            <GeneralButton buttonLabel="Next" onClick={handleNext} />
        </div>
    );
};

export default WizardForm;
