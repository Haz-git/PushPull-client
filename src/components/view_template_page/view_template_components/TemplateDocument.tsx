import * as React from 'react';

//Components:
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { SheetFrame } from './frames/SheetFrame';
import { PageHeaderFrame } from './frames/PageHeaderFrame';

//Styles:
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        width: '100%',
        orientation: 'portrait',
    },
});

//Interfaces:
interface IComponentProps {
    viewTemplate: any;
}

export const TemplateDocument = ({
    viewTemplate,
}: IComponentProps): JSX.Element => {
    return (
        <Document>
            <Page object-fit="fill" size="A4" style={styles.page}>
                <PageHeaderFrame
                    title={viewTemplate?.templateFileTitle}
                    description={viewTemplate?.templateFileDesc}
                    weightUnit={viewTemplate?.templateWeightUnit}
                    updatedAt={viewTemplate?.updatedAt}
                />
                <SheetFrame />
            </Page>
        </Document>
    );
};
