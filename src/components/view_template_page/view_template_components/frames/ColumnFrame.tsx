import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';

//Styles:
const styles = StyleSheet.create({
    columnContainer: {
        border: '1px solid black',
        marginTop: 5,
        marginBottom: 5,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:

/**
 * @description This frame represents individal 'columns' within each template. Defaulted to 'Day 1', 'Day 2', etc.
 * Wrap is false here to prevent cut-off during PDF page separation.
 */

export const ColumnFrame = (): JSX.Element => {
    return (
        <View wrap={false} style={styles.columnContainer}>
            <Text style={styles.text}>Day 'X'</Text>
            <View>
                <GridFrame />
            </View>
        </View>
    );
};
