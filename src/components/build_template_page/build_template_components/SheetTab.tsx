import * as React from 'react';

//Components:
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.button`
    border: none;
    text-decoration: none;
    background: #2c2c2c;
    width: fit-content;
    height: 100%;
    padding: 0rem 1rem;
    outline: 1px solid #d6d6d6;
    margin-top: 1px;
    margin-left: 1px;
`;

const SheetTitleContainer = styled.div``;

//Interfaces:

interface IComponentProps {
    sheetId: string;
    sheetName: string;
}

export const SheetTab = ({
    sheetId,
    sheetName,
}: IComponentProps): JSX.Element => {
    return (
        <MainContainer>
            <SheetTitleContainer>
                <Text
                    text={sheetName}
                    textColor="#ffffff"
                    fontWeight="500"
                    fontSize=".9rem"
                />
            </SheetTitleContainer>
        </MainContainer>
    );
};
