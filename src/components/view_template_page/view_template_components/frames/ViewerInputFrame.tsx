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
        flex: 1,
        padding: 10,
        backgroundColor: '#efefef',
        marginRight: 2,
    },
    text: {
        fontSize: 10,
        fontFamily: 'Nunito',
    },
});

//Interfaces:

interface IComponentProps {
    viewerInputs: any;
}

/**
 * @description This frame is embedded into the PageHeaderFrame. Indicates what the user has inputted per view.
 *
 */

export const ViewerInputFrame = ({
    viewerInputs,
}: IComponentProps): JSX.Element => {
    const composeInputItems = (): JSX.Element[] | null => {
        if (viewerInputs?.length === 0) {
            return null;
        }

        return viewerInputs?.map((inputItem: any) => (
            <View>
                <Text style={styles.text}>{inputItem.InputQuestion}</Text>
            </View>
        ));
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ViewerInputFrame</Text>
            <View>{composeInputItems()}</View>
        </View>
    );
};
