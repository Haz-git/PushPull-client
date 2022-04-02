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
});

//Interfaces:

interface IComponentProps {
    itemCount?: number;
}

/**
 * @description This frame represents the template introduction header
 *
 */

export const PageHeaderFrame = () => {
    return (
        <View style={styles.container}>
            <Text>Test</Text>
        </View>
    );
};
