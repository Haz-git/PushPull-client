import * as React from 'react';

//Components:

//Styles:

//Interfaces:

interface IComponentProps {
    match: {
        params: {
            id: any;
        };
    };
}

const MainBuildProgramView = ({
    match: {
        params: { id },
    },
}: IComponentProps): JSX.Element => {
    return <div>Building program {id}</div>;
};

export default MainBuildProgramView;
