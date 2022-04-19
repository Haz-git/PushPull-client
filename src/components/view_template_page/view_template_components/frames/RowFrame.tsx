import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { BlockFrame } from './BlockFrame';
import { ConfiguredSetFrame } from './ConfiguredSetFrame';

//Styles:
const styles = StyleSheet.create({
    blockMainContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    exerciseItem: {
        width: '100%',
        maxWidth: 165,
        marginRight: 10,
        textAlign: 'center',
        alignContent: 'center',
    },
    exerciseDescriptionItem: {
        width: '100%',
        maxWidth: 330,
        textAlign: 'center',
    },
    orderItem: {
        width: 20,
        marginRight: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 10,
    },
    divider: {
        height: 2,
        borderRadius: 10,
        backgroundColor: '#e5e5e5',
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
        <>
            <View style={styles.blockMainContainer}>
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
            <View style={styles.divider} />
        </>
    );
};
