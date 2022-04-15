import * as React from 'react';

//Redux

//Components
import { Tooltip } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';

//Styles
import { BackIcon, ButtonWrapper } from './FixedToolbar';

//Interfaces

interface IComponentProps {
    shouldDisplay: boolean;
}

/**
 * @description This view differs from FixedToolbarGuestView as this view is meant for users that are not logged into PushPull.
 */

export const FixedToolbarAnonymousView = ({
    shouldDisplay,
}: IComponentProps): JSX.Element => {
    return (
        <>
            <Tooltip
                label="Return To Homepage"
                position="right"
                placement="center"
            >
                <ButtonWrapper>
                    <GeneralButton
                        buttonLabel=""
                        buttonIconLeft={<BackIcon />}
                        leftIconMargin="0"
                        rightIconMargin="0"
                        onClick={() => historyObject.push(`/`)}
                    />
                </ButtonWrapper>
            </Tooltip>
        </>
    );
};
