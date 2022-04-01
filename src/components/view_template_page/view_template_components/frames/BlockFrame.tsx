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
    column: {
        flexDirection: 'column',
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:

interface IComponentProps {
    itemCount?: number;
}

/**
 * @description This frame represents each block in an exercise row. Such as Set, Reps, Weight, or Rest.
 *
 */

export const BlockFrame = ({ itemCount }: IComponentProps): JSX.Element => {
    //Currently the items are created manually. We'll need to dynamically render out the set, rep, and weight count. They should be the same number however.

    return (
        <View style={styles.column}>
            <View>
                <Text>1</Text>
            </View>
            <View>
                <Text>2</Text>
            </View>
            <View>
                <Text>3</Text>
            </View>
            <View>
                <Text>4</Text>
            </View>
        </View>
    );
};
