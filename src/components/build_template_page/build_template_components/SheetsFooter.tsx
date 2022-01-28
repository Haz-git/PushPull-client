import React from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

//Components:
import { SheetTab } from './SheetTab';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import styled from 'styled-components';
import { PlusLg } from '@styled-icons/bootstrap/PlusLg';

const AddIcon = styled(PlusLg)`
    color: #e07133;
    height: 1.2rem;
    width: 1.2rem;
`;

const MainContainer = styled.div`
    position: fixed;
    bottom: 0;
    background: #d6d6d6;
    width: 100%;
    height: 2.5rem;
    width: 100%;
`;

const AddSheetContainer = styled.div``;

const SheetContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

//Interfaces:

export const SheetsFooter = (): JSX.Element => {
    const sheets = useSelector(
        (state: RootStateOrAny) => state?.template?.templateEditingSurfaceBlocks
    );

    return (
        <MainContainer>
            <SheetContainer>
                <AddSheetContainer>
                    <GeneralButton
                        height="2.5rem"
                        borderRadius="0"
                        hoverTransform="none"
                        hoverShadow="none"
                        buttonLabel=""
                        buttonIconLeft={<AddIcon />}
                        buttonBackground="#2c2c2c"
                        leftIconMargin="0rem"
                        rightIconMargin="0rem"
                        margin="1px 1px 0px 0px"
                        outline="1px solid #d6d6d6"
                    />
                </AddSheetContainer>
                {sheets?.map((sheet: any) => (
                    <SheetTab
                        sheetName={sheet.weekName}
                        sheetId={sheet.weekId}
                    />
                ))}
            </SheetContainer>
        </MainContainer>
    );
};
