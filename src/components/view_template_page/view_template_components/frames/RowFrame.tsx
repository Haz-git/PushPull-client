import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';

//Styles:
const styles = StyleSheet.create({
    exerciseItem: {
        width: '100%',
        maxWidth: 165,
        marginRight: 10,
        border: '1px solid black',
        textAlign: 'center',
    },
    headerItem: {
        width: '100%',
        maxWidth: 75,
        marginRight: 10,
        border: '1px solid black',
        textAlign: 'center',
    },
    orderItem: {
        width: 20,
        marginRight: 10,
        border: '1px solid black',
        textAlign: 'center',
    },
    flexRow: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:

/**
 * @description This frame represents each exercise row.
 *
 */

export const RowFrame = () => {
    return (
        <View style={styles.flexRow}>
            <View style={styles.orderItem}>
                <Text>1</Text>
            </View>
            <View style={styles.exerciseItem}>
                <Text>Bench Press</Text>
            </View>
            <View style={styles.headerItem}>
                <Text>1</Text>
            </View>
            <View style={styles.headerItem}>
                <Text>24</Text>
            </View>
            <View style={styles.headerItem}>
                <Text>110</Text>
            </View>
            <View style={styles.headerItem}>
                <Text>Na</Text>
            </View>
        </View>
    );
};
