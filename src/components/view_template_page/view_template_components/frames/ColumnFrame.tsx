import * as React from 'react';
import { useMemo } from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';
import { v4 as uuid } from 'uuid';

//Styles:
const styles = StyleSheet.create({
    exerciseItem: {
        width: '100%',
        maxWidth: 165,
        marginRight: 10,
        border: '1px solid black',
        textAlign: 'center',
        alignContent: 'center',
    },
    exerciseDescriptionItem: {
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
    columnContainer: {
        border: '1px solid black',
        marginTop: 5,
        marginBottom: 5,
    },
    gridHeaderContainer: {
        flexDirection: 'row',
        marginLeft: 10,
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
                    <View style={styles.gridHeaderContainer}>
                        <View style={styles.orderItem}>
                            <Text style={styles.text}>#</Text>
                        </View>
                        <View style={styles.exerciseItem}>
                            <Text style={styles.text}>Exercise</Text>
                        </View>
                        <View style={styles.exerciseDescriptionItem}>
                            <Text style={styles.text}>Sets</Text>
                        </View>
                        <View style={styles.exerciseDescriptionItem}>
                            <Text style={styles.text}>Reps</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <Text style={styles.text}>Rest</Text>
                        </View>
                    </View>
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
