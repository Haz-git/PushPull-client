import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Redux:

//Styles:
import styled from 'styled-components';
import { Spacer } from './AddBlockForm';

const MainContainer = styled.div`
    padding: 0.5rem 0.5rem;
    border-radius: 0.3rem;
    background: #ececec;
    width: fit-content;
`;

//Interfaces:
interface IComponentProps {
    shouldDisplay: boolean;
}

export const AddBlockFormInputLinkLabel = ({
    shouldDisplay,
}: IComponentProps): JSX.Element => {
    return (
        <>
            {shouldDisplay && (
                <MainContainer>
                    <Text
                        text="Linking a viewer input will reset all your weight values."
                        textColor="#AF1432"
                        fontSize=".9rem"
                    />
                    <Text
                        text="Weight will then be replaced by a percentage value (.01 - 1)."
                        textColor="#AF1432"
                        fontSize=".9rem"
                    />
                </MainContainer>
            )}
        </>
    );
};
