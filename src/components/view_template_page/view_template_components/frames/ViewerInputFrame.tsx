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
        margin: 10,
        padding: 10,
    },
    text: {
        fontSize: 10,
        fontFamily: 'Nunito',
    },
});

/**
 * @description This frame is embedded into the PageHeaderFrame. Indicates what the user has inputted per view.
 *
 */

export const ViewerInputFrame = () => {
    return <div>ViewerInputFrame</div>;
};
