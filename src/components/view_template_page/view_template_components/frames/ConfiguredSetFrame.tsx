import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';

//Styles:
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    exerciseDescriptionItem: {
        width: '100%',
        marginRight: 10,
        border: '1px solid black',
        textAlign: 'center',
    },
});

//Interfaces:

interface IComponentProps {
    configuredSets: any;
    hasConfiguredSets: boolean;
    sets: string;
    reps: string;
    weightImperial: string;
    weightMetric: string;
}

/**
 * @description This frame represents each block in an exercise row. Such as Set, Reps, Weight, or Rest.
 *
 * If hasConfiguredSets is false, then we render each style component with identical sets, reps and desired weight.
 * If hasConfiguredSets is true, then we render the configured sets, which should not be null.
 */

export const ConfiguredSetFrame = ({
    configuredSets,
    hasConfiguredSets,
    sets,
    reps,
    weightImperial,
    weightMetric,
}: IComponentProps): JSX.Element => {
    const generateConfiguredSetFrames = (): JSX.Element[] => {
        return Object.keys(configuredSets).map((item, i) => (
            <View style={styles.container}>
                <View style={styles.exerciseDescriptionItem}>
                    <Text>{item}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text>{configuredSets[item].reps}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text>{configuredSets[item].weightImperial}</Text>
                </View>
            </View>
        ));
    };

    const generateSetFrames = (): JSX.Element[] | JSX.Element => {
        if (hasConfiguredSets) {
            return generateConfiguredSetFrames();
        }

        return Array(Number(sets)).fill(
            <>
                <View style={styles.exerciseDescriptionItem}>
                    <Text>{sets}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text>{reps}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text>{weightImperial}</Text>
                </View>
            </>
        );
    };

    return <>{generateSetFrames()}</>;
};
