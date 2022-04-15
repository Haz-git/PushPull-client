import * as React from 'react';

//Redux

//Components
import { Tooltip } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';

//Styles
import styled from 'styled-components';
import {
    ButtonWrapper,
    ViewingIcon,
    CopyIcon,
    PublishIcon,
    BackIcon,
} from './FixedToolbar';
//Interfaces
interface IComponentProps {
    shouldDisplay: boolean;
    onReturnSheetId: string;
    templateId: string;
}

/**
 * @description This view is only shown to the owner.
 */

export const FixedToolbarOwnerView = ({
    shouldDisplay,
    onReturnSheetId,
    templateId,
}: IComponentProps): JSX.Element => {
    return (
        <>
            <Tooltip
                label="Configure Viewing Access"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<ViewingIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                    />
                </ButtonWrapper>
            </Tooltip>
            <Tooltip
                label="Configure Duplication Access"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<CopyIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                    />
                </ButtonWrapper>
            </Tooltip>
            <Tooltip
                label="Upload To PushPull Ranking Catalog"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<PublishIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                    />
                </ButtonWrapper>
            </Tooltip>
            <Tooltip
                label="Return To Templates"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<BackIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                        onClick={() =>
                            historyObject.push(
                                `/file/${templateId}?sheetId=${onReturnSheetId}`
                            )
                        }
                    />
                </ButtonWrapper>
            </Tooltip>
        </>
    );
};
