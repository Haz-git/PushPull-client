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
    configuredSets: any;
    hasConfiguredSets: boolean;
    sets: string;
    reps: string;
}

/**
 * @description This frame represents each block in an exercise row. Such as Set, Reps, Weight, or Rest.
 *
 * If hasConfiguredSets is false, then we render each style component with identical sets, reps and desired weight.
 * If hasConfiguredSets is true, then we render the configured sets, which should not be null.
 */

export const ConfiguredSetFrame = ({
    hasConfiguredSets,
    sets,
    reps,
}: IComponentProps): JSX.Element => {
    return <div>ConfiguredSetFrame</div>;
};
