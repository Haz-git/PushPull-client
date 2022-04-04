import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { RowFrame } from './RowFrame';

//Styles:
const styles = StyleSheet.create({});

//Interfaces:
interface IComponentProps {
    blocks: any;
}

/**
 * @description This frame represents the container rendering out each exercise row.
 *
 */

export const RowFrameContainer = ({ blocks }: IComponentProps): JSX.Element => {
    const composeRowFrames = (): JSX.Element => {
        return blocks.map((block: any, index: number) => (
            <View>
                <RowFrame blockDetails={block.blockDetails} index={index} />
            </View>
        ));
    };

    return <View>{composeRowFrames()}</View>;
};
