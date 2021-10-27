import * as React from 'react';

//Components:
import UserAuthForm from './UserAuthForm';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    padding: 1rem 1rem;
`;

//Interfaces:

interface IComponentProps {
    closeAuthDrawerContainer: () => void;
}

const PasswordResetForm = ({
    closeAuthDrawerContainer,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <UserAuthForm
                authStateRenderView="RESETPASSWORD"
                closeAuthDrawerContainer={closeAuthDrawerContainer}
            />
        </MainContainer>
    );
};

export default PasswordResetForm;
