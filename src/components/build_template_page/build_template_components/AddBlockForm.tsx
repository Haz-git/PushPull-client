import React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';

//Redux:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 0rem 0.5rem;
`;

//Interfaces:

interface IComponentProps {}

const AddBlockForm = () => {
    return (
        <MainContainer>
            <div>
                <GeneralButton
                    buttonLabel="Click to add test block"
                    onClick={() => console.log('test')}
                />
            </div>
        </MainContainer>
    );
};

export default AddBlockForm;
