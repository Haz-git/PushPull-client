import * as React from 'react';

//Redux:

//Component:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ColumnFrame } from './ColumnFrame';

//Styles:
const styles = StyleSheet.create({
    columnWrapper: {
        flexDirection: 'column',
        border: '1px solid black',
        marginTop: 20,
    },
    sheet: {
        flexDirection: 'column',
        margin: 10,
        padding: 10,
        border: '1px solid black',
    },
    text: {
        fontSize: 10,
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
            <View style={styles.sheet} key={sheet.sheetId}>
                <Text style={styles.text}>{sheet.sheetName}</Text>
                <View style={styles.columnWrapper}>
                    <ColumnFrame
                        viewTemplate={viewTemplate}
                        sheetContent={sheet.sheetContent}
                    />
                </View>
            </View>
        ));
    };

    return <View>{composeSheetFrames()}</View>;
};
