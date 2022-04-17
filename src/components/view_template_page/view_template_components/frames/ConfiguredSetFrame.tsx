import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';

//Styles:
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
    },
    exerciseDescriptionItem: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 5,
    },
    text: {
        fontSize: 10,
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
                    <Text style={styles.text}>{item}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text style={styles.text}>{configuredSets[item].reps}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text style={styles.text}>
                        {configuredSets[item].weightImperial}
                    </Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text style={styles.text}>NA</Text>
                </View>
            </View>
        ));
    };

    const generateSetFrames = (): JSX.Element[] | JSX.Element => {
        if (hasConfiguredSets) {
            return generateConfiguredSetFrames();
        }

        return (
            <View style={styles.container}>
                <View style={styles.exerciseDescriptionItem}>
                    <Text style={styles.text}>{`1 - ${sets}`}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text style={styles.text}>{reps}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text style={styles.text}>{weightImperial}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <Text style={styles.text}>NA</Text>
                </View>
            </View>
        );
    };

    return <>{generateSetFrames()}</>;
};
