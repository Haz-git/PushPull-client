import * as React from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { GridHeaderFrame } from './GridHeaderFrame';
import { v4 as uuid } from 'uuid';
import { RowFrame } from './RowFrame';
//Styles:
const styles = StyleSheet.create({
    grid: {
        flexDirection: 'column',
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
    columnHeader: string;
}

/**
 * @description This frame represents the grid enclosure.
 *
 * sheetOrder describes the order by which each row should be rendered.
 * Naive approach suggests mapping through sheetOrder, querying sheetContent for each string in sheetOrder, and returning the blocks as a RowFrame.
 *
 */

export const GridFrame = ({
    viewTemplate,
    sheetContent,
    sheetOrder,
    columnHeader,
}: IComponentProps): JSX.Element => {
    const composeRowFrameContainers = (): JSX.Element[] => {
        //TODO: Not sure why all exercises are being rendered per day. Also, order of the days are NOT maintained during map.
        return sheetContent[columnHeader].map((block: any, index: number) => (
            <>
                <RowFrame blockDetails={block.blockDetails} index={index + 1} />
            </>
        ));
    };

    return <View style={styles.grid}>{composeRowFrameContainers()}</View>;
};
