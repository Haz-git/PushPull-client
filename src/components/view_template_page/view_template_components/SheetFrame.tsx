import * as React from 'react';

//Redux:

//Component:
import { Text, View, StyleSheet } from '@react-pdf/renderer';

//Styles:
const styles = StyleSheet.create({
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces

export const SheetFrame = () => {
    return (
        <View style={styles.section}>
            <Text style={styles.text}>Week 1</Text>
        </View>
    );
};
