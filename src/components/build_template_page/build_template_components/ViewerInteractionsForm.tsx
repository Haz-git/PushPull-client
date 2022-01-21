import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 0rem 0.5rem;
    position: relative;
`;

const DescContainer = styled.div``;

const ViewerInteractionsForm = () => {
    return (
        <MainContainer>
            <DescContainer>
                <Text
                    subText={true}
                    text="Customize how your viewers interact with your template by organizing your blocks with colors to describe corresponding exercises, or, adding inputs where viewers can fill in information."
                />
            </DescContainer>
        </MainContainer>
    );
};

export default ViewerInteractionsForm;
