import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
import { ReactComponent as DarkLogoSVG } from '../../../assets/dark_logo.svg';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    min-height: 100vh;
    width: 100vw;
    background: #2c2c2c;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem 1rem;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 15%;
`;

//Interfaces:

const UnauthorizedTemplate = () => {
    return (
        <MainContainer>
            <LogoContainer>
                <DarkLogoSVG />
                <Text
                    text="Sorry, You Do Not Have Access to This Template!"
                    textColor="#ffffff"
                    fontSize="1.1rem"
                />
                <GeneralButton
                    buttonLabel="Return To Dashboard"
                    onClick={() =>
                        historyObject.push(`/builder/dashboard/recents`)
                    }
                />
            </LogoContainer>
        </MainContainer>
    );
};

export default UnauthorizedTemplate;
