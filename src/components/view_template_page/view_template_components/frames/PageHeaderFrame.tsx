import * as React from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';

//Styles:
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 10,
        padding: 10,
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:

interface IComponentProps {
    title: string;
    description: string;
    weightUnit: string;
    updatedAt: string;
}

/**
 * @description This frame represents the template introduction header
 *
 */

export const PageHeaderFrame = ({
    title,
    description,
    weightUnit,
    updatedAt,
}: IComponentProps): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>{weightUnit}</Text>
            <Text style={styles.text}>{updatedAt}</Text>
        </View>
    );
};
