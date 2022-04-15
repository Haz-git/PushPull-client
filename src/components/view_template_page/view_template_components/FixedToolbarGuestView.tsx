import * as React from 'react';

//Redux

//Components
import { Tooltip } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';

//Styles
import styled from 'styled-components';
import { ButtonWrapper, CopyIcon, BackIcon, RateIcon } from './FixedToolbar';

//Interfaces

interface IComponentProps {
    shouldDisplay: boolean;
}

/**
 * @description This view differs from FixedToolbarAnonymousView as this view is meant for users that are logged into PushPull.
 */

export const FixedToolbarGuestView = ({
    shouldDisplay,
}: IComponentProps): JSX.Element => {
    return (
        <>
            {shouldDisplay && (
                <>
                    <Tooltip
                        label="Copy Program"
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
                        label="Rate Program"
                        position="right"
                        placement="center"
                    >
                        <ButtonWrapper>
                            <GeneralButton
                                buttonLabel=""
                                buttonIconLeft={<RateIcon />}
                                leftIconMargin="0"
                                rightIconMargin="0"
                            />
                        </ButtonWrapper>
                    </Tooltip>
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
            )}
        </>
    );
};
