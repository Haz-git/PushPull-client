import * as React from 'react';

//Redux

//Components
import { Tooltip } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import historyObject from '../../../utils/historyObject';

//Styles
import { ButtonWrapper, CopyIcon, BackIcon } from './FixedToolbar';

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
    return <div>FixedToolbarGuestView</div>;
};
