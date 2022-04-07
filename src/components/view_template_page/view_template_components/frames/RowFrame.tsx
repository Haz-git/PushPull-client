import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { BlockFrame } from './BlockFrame';
import { ConfiguredSetFrame } from './ConfiguredSetFrame';

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
        maxWidth: 300,
        marginRight: 10,
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
interface IComponentProps {
    blockDetails: any;
    index: number;
}

/**
 * @description This frame represents each exercise row.
 *
 */

export const RowFrame = ({
    blockDetails,
    index,
}: IComponentProps): JSX.Element => {
    return (
        <View style={styles.flexRow}>
            <View style={styles.orderItem}>
                <Text style={styles.text}>{index}</Text>
            </View>
            <View style={styles.exerciseItem}>
                <Text style={styles.text}>{blockDetails.name}</Text>
            </View>
            <View style={styles.exerciseDescriptionItem}>
                <ConfiguredSetFrame
                    sets={blockDetails.sets}
                    reps={blockDetails.reps}
                    hasConfiguredSets={blockDetails.hasConfiguredSets}
                    configuredSets={blockDetails.configuredSets}
                    weightImperial={blockDetails.weightImperial}
                    weightMetric={blockDetails.weightMetric}
                />
            </View>
        </View>
    );
};
