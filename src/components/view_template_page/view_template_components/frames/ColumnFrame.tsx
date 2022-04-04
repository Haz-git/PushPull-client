import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';

//Styles:
const styles = StyleSheet.create({
    columnContainer: {
        border: '1px solid black',
        marginTop: 5,
        marginBottom: 5,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    text: {
        fontSize: 10,
    },
});

//Interfaces:
interface IComponentProps {
    viewTemplate: any;
    sheetContent: any;
    sheetOrder: any;
}

/**
 * @description This frame represents individal 'columns' within each template. Defaulted to 'Day 1', 'Day 2', etc.
 * Wrap is false here to prevent cut-off during PDF page separation.
 */

export const ColumnFrame = ({
    viewTemplate,
    sheetContent,
    sheetOrder,
}: IComponentProps): JSX.Element => {
    const composeColumnFrames = (): JSX.Element[] => {
        return Object.keys(sheetContent).map((item, i) => (
            <View
                wrap={false}
                style={styles.columnContainer}
                key={sheetContent.sheetId}
            >
                <Text style={styles.text}>{item}</Text>
                <View>
                    <GridFrame
                        viewTemplate={viewTemplate}
                        sheetContent={sheetContent}
                        sheetOrder={sheetOrder}
                    />
                </View>
            </View>
        ));
    };

    return <View>{composeColumnFrames()}</View>;
};
