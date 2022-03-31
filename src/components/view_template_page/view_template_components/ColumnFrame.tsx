import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';

//Styles:
const styles = StyleSheet.create({
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
 *
 */

export const ColumnFrame = (): JSX.Element => {
    return <Text style={styles.text}>ColumnFrame</Text>;
};
