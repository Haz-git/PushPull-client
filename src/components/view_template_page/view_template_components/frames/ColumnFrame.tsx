import * as React from 'react';
import { useMemo } from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';
import { v4 as uuid } from 'uuid';

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
const constructHeaderName = (columnHeader: string): string => {
    return columnHeader.includes(`%SECRET%ID%`)
        ? columnHeader.substring(0, columnHeader.indexOf(`%SECRET%ID%`))
        : columnHeader;
};

export const ColumnFrame = ({
    viewTemplate,
    sheetContent,
    sheetOrder,
}: IComponentProps): JSX.Element => {
    const composeColumnFrames = (): JSX.Element[] => {
        return sheetOrder.map((columnHeader: string, index: number) => (
            <View
                wrap={false}
                style={styles.columnContainer}
                key={sheetContent.sheetId}
            >
                <Text style={styles.text}>
                    {constructHeaderName(columnHeader)}
                </Text>
                <View>
                    <GridFrame
                        viewTemplate={viewTemplate}
                        sheetContent={sheetContent}
                        sheetOrder={sheetOrder}
                        columnHeader={columnHeader}
                    />
                </View>
            </View>
        ));
    };

    return <View>{composeColumnFrames()}</View>;
};
