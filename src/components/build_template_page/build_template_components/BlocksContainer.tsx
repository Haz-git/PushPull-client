import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 1rem 1rem;
    border-bottom: 1px solid #525252;
`;

const TitleContainer = styled.div``;

//Interfaces:

interface IComponentProps {
    blockTitle: string;
    blocks?: any[];
}

const BlocksContainer = ({
    blockTitle,
    blocks,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <TitleContainer>
                <Text text={blockTitle} textColor="#ffffff" />
            </TitleContainer>
        </MainContainer>
    );
};

export default BlocksContainer;
