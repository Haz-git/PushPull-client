import * as React from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { GridFrame } from './GridFrame';
import { NunitoFamily } from '../../../fonts/masterFonts';

//Styles:
Font.register({
    family: 'Nunito',
    format: 'truetype',
    src: NunitoFamily.bold800,
});

const styles = StyleSheet.create({
    colorItemContainer: {
        flexDirection: 'row',
    },
    container: {
        border: '1px solid black',
        flex: 1,
    },
    text: {
        fontSize: 10,
        fontFamily: 'Nunito',
    },
});

//Interface

interface IComponentProps {
    legend: any;
}

/**
 * @description This frame is embedded into the PageHeaderFrame. Indicates what each color represents in each block.
 *
 */

export const ColorLegendFrame = ({ legend }: IComponentProps): JSX.Element => {
    const composeColorItems = (): JSX.Element[] | null => {
        if (legend?.length === 0) {
            return null;
        }

        return legend?.map((colorItem: any) => (
            <View style={styles.colorItemContainer}>
                <View
                    style={{
                        backgroundColor: `${colorItem.colorHex}`,
                        height: 12,
                        width: 12,
                        borderRadius: 2,
                        marginRight: 5,
                    }}
                />
                <Text style={styles.text}>{colorItem.label}</Text>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Color Legend</Text>
            <View>{composeColorItems()}</View>
        </View>
    );
};
