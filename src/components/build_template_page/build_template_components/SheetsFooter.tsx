import React from 'react';

//Redux:
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { addSheet } from '../../../redux/templates/templateActions';

//Components:
import { SheetTab } from './SheetTab';
import GeneralButton from '../../general_components/GeneralButton';
import { Tooltip } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import { PlusLg } from '@styled-icons/bootstrap/PlusLg';

const AddIcon = styled(PlusLg)`
    color: #ffffff;
    height: 1rem;
    width: 1rem;
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
    const dispatch = useDispatch();
    const templateId = useSelector(
        (state: RootStateOrAny) => state?.template?.id
    );
    const sheets = useSelector(
        (state: RootStateOrAny) => state?.template?.templateEditingSurfaceBlocks
    );

    return (
        <MainContainer>
            <SheetContainer>
                <AddSheetContainer>
                    <Tooltip
                        transition="fade"
                        label="Add Sheet"
                        color="dark"
                        withArrow
                    >
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
                            hoverColor="#464646"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(addSheet(templateId));
                            }}
                        />
                    </Tooltip>
                </AddSheetContainer>
                {sheets?.map((sheet: any) => (
                    <SheetTab
                        sheetName={sheet.sheetName}
                        sheetId={sheet.sheetId}
                        templateId={templateId}
                        key={sheet.sheetId}
                    />
                ))}
            </SheetContainer>
        </MainContainer>
    );
};
