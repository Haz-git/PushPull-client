import * as React from 'react';
import { MobileView, BrowserView } from 'react-device-detect';

//Components:
import { deviceMin } from '../../../devices/breakpoints';
import { ReactComponent as UserNotFoundSVG } from '../../../assets/user_not_found.svg';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';

//Styles:
import styled from 'styled-components';
import {
    TextContainer,
    ErrorCode,
    HeaderText,
    SubText,
    ButtonContainer,
    SVGContainer,
    MobileMainContainer,
    MobileButtonContainer,
} from '../../not_found_page/NotFound';

const MainContainer = styled.section`
    @media ${deviceMin.mobileS} {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
        align-content: center;
    }

    @media ${deviceMin.laptopM} {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: 40% 60%;
        margin: 5rem auto;
        width: 100%;
        max-width: 100rem;
    }
`;

const MobileTextContainer = styled.div`
    display: block;
    position: relative;
    z-index: 10;
`;

const MobileErrorCode = styled.h1`
    font-size: 9rem;
    color: ${(props) => props.theme.accentColors.orange};
    font-weight: 800;
    z-index: 10;

    @media ${deviceMin.mobileS} {
        font-size: 5rem;
    }

    @media ${deviceMin.tablet} {
        font-size: 9rem;
    }

    @media ${deviceMin.laptop} {
    }
`;

const MobileSVGContainer = styled.div`
    z-index: 1;
    margin: 0 auto;

    @media ${deviceMin.mobileS} {
        padding: 0rem 2rem;
    }
`;

//Interfaces:

interface IComponentProps {
    requestedUser: string;
}

const UserNotFound = ({ requestedUser }: IComponentProps): JSX.Element => {
    return (
        <>
            <BrowserView>
                <MainContainer>
                    <TextContainer>
                        <ErrorCode>404</ErrorCode>
                        <HeaderText>{requestedUser} was not found.</HeaderText>
                        <SubText>Maybe they're lost in cyberspace?</SubText>
                        <ButtonContainer>
                            <GeneralButton
                                buttonLabel="Return to Homepage"
                                onClick={() => historyObject.push('/')}
                                width="15rem"
                            />
                        </ButtonContainer>
                    </TextContainer>
                    <SVGContainer>
                        <UserNotFoundSVG />
                    </SVGContainer>
                </MainContainer>
            </BrowserView>
            <MobileView>
                <MobileMainContainer>
                    <MobileErrorCode>404</MobileErrorCode>
                    <MobileSVGContainer>
                        <UserNotFoundSVG />
                    </MobileSVGContainer>
                    <MobileTextContainer>
                        <HeaderText>{requestedUser} was not found.</HeaderText>
                        <SubText>Maybe they're lost in cyberspace?</SubText>
                        <MobileButtonContainer>
                            <GeneralButton
                                buttonLabel="Return to Homepage"
                                onClick={() => historyObject.push('/')}
                                width="15rem"
                            />
                        </MobileButtonContainer>
                    </MobileTextContainer>
                </MobileMainContainer>
            </MobileView>
        </>
    );
};

export default UserNotFound;
