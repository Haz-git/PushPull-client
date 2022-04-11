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
    container: {
        border: '1px solid black',
        flex: 1,
    },
    text: {
        fontSize: 10,
        fontFamily: 'Nunito',
    },
});

/**
 * @description This frame is embedded into the PageHeaderFrame. Indicates what each color represents in each block.
 *
 */

export const ColorLegendFrame = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ColorLegendFrame</Text>
        </View>
    );
};
