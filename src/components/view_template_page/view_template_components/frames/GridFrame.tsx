import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridHeaderFrame } from './GridHeaderFrame';
import { RowFrame } from './RowFrame';

//Styles:
const styles = StyleSheet.create({
    grid: {
        flexDirection: 'column',
        padding: 10,
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:
interface IComponentProps {
    viewTemplate: any;
}

/**
 * @description This frame represents the grid enclosure.
 *
 */

export const GridFrame = ({ viewTemplate }: IComponentProps): JSX.Element => {
    return (
        <View style={styles.grid}>
            <GridHeaderFrame />
            <View>
                <RowFrame />
            </View>
            <View>
                <RowFrame />
            </View>
        </View>
    );
};
