import * as React from 'react';

//Redux:

//Component:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ColumnFrame } from './ColumnFrame';

//Styles:
const styles = StyleSheet.create({
    columnWrapper: {
        flexDirection: 'column',
        marginTop: 20,
    },
    sheet: {
        flexDirection: 'column',
        margin: 10,
        padding: 10,
    },
    sheetName: {
        fontSize: 13,
    },
});

//Interfaces:

interface IComponentProps {
    viewTemplate: any;
}

/**
 * @description This frame represents individual 'sheets' within each template.
 *
 */

export const SheetFrame = ({ viewTemplate }: IComponentProps): JSX.Element => {
    const composeSheetFrames = (): JSX.Element[] => {
        return viewTemplate?.templateEditingSurfaceBlocks.map((sheet: any) => (
            <View style={styles.sheet} key={sheet.sheetId} wrap={true}>
                <Text style={styles.sheetName}>{sheet.sheetName}</Text>
                <View style={styles.columnWrapper}>
                    <ColumnFrame
                        viewTemplate={viewTemplate}
                        sheetContent={sheet.sheetContent}
                        sheetOrder={sheet.sheetOrder}
                    />
                </View>
            </View>
        ));
    };

    return <View>{composeSheetFrames()}</View>;
};
