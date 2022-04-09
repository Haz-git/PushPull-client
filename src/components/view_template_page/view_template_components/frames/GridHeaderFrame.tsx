import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';

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
    flexHeader: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:

/**
 * @description This frame represents the header for the grid enclosure.
 *
 */

export const GridHeaderFrame = () => {
    return (
        <View style={styles.flexHeader}>
            <View style={styles.orderItem}>
                <Text>#</Text>
            </View>
            <View style={styles.exerciseItem}>
                <Text>Exercise</Text>
            </View>
            <View style={styles.headerItem}>
                <Text>Set</Text>
            </View>
            <View style={styles.headerItem}>
                <Text>Reps</Text>
            </View>
            <View style={styles.headerItem}>
                <Text>Weight</Text>
            </View>
            <View style={styles.headerItem}>
                <Text>Rest</Text>
            </View>
        </View>
    );
};
