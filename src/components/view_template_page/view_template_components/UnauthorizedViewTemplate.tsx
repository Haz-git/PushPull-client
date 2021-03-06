import React from 'react';

//Components:
import Text from '../../general_components/Text';
import { ReactComponent as DarkLogoSVG } from '../../../assets/dark_logo.svg';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';

//Redux:
import { useDispatch } from 'react-redux';
import { resetErrorNotification } from '../../../redux/errors/errorActions';
import { ErrorType } from '../../../redux/errors/action-types';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    height: 100vh;
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

interface IComponentProps {
    shouldDisplay: boolean;
    messageLabel: string;
    buttonLabel: string;
    redirectLink: string;
}

export const UnauthorizedViewTemplate = ({
    shouldDisplay,
    messageLabel,
    buttonLabel,
    redirectLink,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <>
            {shouldDisplay && (
                <MainContainer>
                    <LogoContainer>
                        <DarkLogoSVG />
                        <Text
                            text={messageLabel}
                            textColor="#ffffff"
                            fontSize="1.1rem"
                        />
                        <GeneralButton
                            buttonLabel={buttonLabel}
                            onClick={() => {
                                dispatch(
                                    resetErrorNotification(
                                        ErrorType.queryViewTemplateError
                                    )
                                );
                                historyObject.push(redirectLink);
                            }}
                        />
                    </LogoContainer>
                </MainContainer>
            )}
        </>
    );
};
