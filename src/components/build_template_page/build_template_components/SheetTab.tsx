import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.button`
    border: none;
    text-decoration: none;
    background: #ececec;
    width: fit-content;
    height: 100%;
    padding: 0rem 1rem;
    outline: 1px solid #d6d6d6;
    margin-top: 1px;
    margin-left: 1px;
`;

//Interfaces:

interface IComponentProps {
    sheetId: string;
    sheetName: string;
}

export const SheetTab = ({
    sheetId,
    sheetName,
}: IComponentProps): JSX.Element => {
    return <MainContainer>{sheetName}</MainContainer>;
};
