import * as React from 'react';

//Components:
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

//Styles:
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        width: '100%',
        orientation: 'portrait',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:

export const TemplateDocument = () => {
    return (
        <Document>
            <Page object-fit="fill" size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text}>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );
};
