import React from 'react';

//Components:

//Redux:

//Styles:

//Interfaces:

interface IComponentProps {
    closeModal: () => void;
    resetBlockValues: () => void;
}

export const ResetBlockValuesForm = ({
    closeModal,
    resetBlockValues,
}: IComponentProps): JSX.Element => {
    return <div>ResetBlockValuesForm</div>;
};
