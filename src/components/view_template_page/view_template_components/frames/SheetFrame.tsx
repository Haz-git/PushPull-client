import * as React from 'react';

//Redux:

//Component:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ColumnFrame } from './ColumnFrame';

//Styles:
const styles = StyleSheet.create({
    columnWrapper: {
        flexDirection: 'column',
        border: '1px solid black',
        marginTop: 20,
    },
    sheet: {
        flexDirection: 'column',
        margin: 10,
        padding: 10,
        border: '1px solid black',
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:

/**
 * @description This frame represents individual 'sheets' within each template.
 *
 */

export const SheetFrame = (): JSX.Element => {
    return (
        <View style={styles.sheet}>
            <Text style={styles.text}>Week 1</Text>
            <View style={styles.columnWrapper}>
                <ColumnFrame />
                <ColumnFrame />
                <ColumnFrame />
                <ColumnFrame />
                <ColumnFrame />
            </View>
        </View>
    );
};
