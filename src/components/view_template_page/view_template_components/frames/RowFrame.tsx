import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { BlockFrame } from './BlockFrame';

//Styles:
const styles = StyleSheet.create({
    exerciseItem: {
        width: '100%',
        maxWidth: 165,
        marginRight: 10,
        border: '1px solid black',
        textAlign: 'center',
        alignContent: 'center',
    },
    exerciseDescriptionItem: {
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
                <Text style={styles.text}>Bench Press</Text>
            </View>
            <View style={styles.exerciseDescriptionItem}>
                <BlockFrame />
            </View>
            <View style={styles.exerciseDescriptionItem}>
                <BlockFrame />
            </View>
            <View style={styles.exerciseDescriptionItem}>
                <Text style={styles.text}>110</Text>
            </View>
            <View style={styles.exerciseDescriptionItem}>
                <Text style={styles.text}>Na</Text>
            </View>
        </View>
    );
};
