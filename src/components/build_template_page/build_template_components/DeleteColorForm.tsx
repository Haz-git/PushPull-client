import * as React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';
import { ButtonContainer } from '../../build_program_page/build_program_components/AddProjectForm';

const MainContainer = styled.div`
    width: 14rem;
`;

const TextDivider = styled.div`
    height: 0.5rem;
`;

//Interfaces:

export const DeleteColorForm = () => {
    return (
        <MainContainer>
            <div>
                <Text
                    text="Deleting your color will unlink all blocks connected to this color."
                    subText={true}
                    fontSize=".9rem"
                    fontWeight="800"
                />
                <TextDivider />
                <Text
                    text="This action is irreversible."
                    subText={true}
                    fontSize=".9rem"
                    fontWeight="800"
                    textColor="#AF1432"
                />
                <TextDivider />
            </div>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Delete"
                    width="6rem"
                    buttonBackground="#AF1432"
                    fontSize="1rem"
                    height="2rem"
                    leftIconMargin="0rem .3rem -.2rem 0rem"
                />
            </ButtonContainer>
        </MainContainer>
    );
};
