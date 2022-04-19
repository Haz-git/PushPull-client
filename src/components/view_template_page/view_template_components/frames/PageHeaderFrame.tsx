import * as React from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { ViewerInputFrame } from './ViewerInputFrame';
import { ColorLegendFrame } from './ColorLegendFrame';
import { NunitoFamily } from '../../../fonts/masterFonts';
import logoPNG from '../../../../assets/logoPNG.png';

//Styles:
Font.register({
    family: 'Nunito',
    format: 'truetype',
    src: NunitoFamily.bold800,
});

const styles = StyleSheet.create({
    imageContainer: {
        height: 25,
        width: 75,
        textAlign: 'right',
    },
    templateDescriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#efefef',
        marginRight: 2,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    inputContainer: {
        border: '1px solid black',
        flexDirection: 'row',
        marginTop: 10,
    },
    templateDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginLeft: 20,
        marginRight: 20,
        // backgroundColor: '#e5e5e5',
    },
    text: {
        fontSize: 10,
        fontFamily: 'Nunito',
    },
});

//Interfaces:

interface IComponentProps {
    title: string;
    description: string;
    weightUnit: string;
    updatedAt: string;
    viewTemplate: any;
}

/**
 * @description This frame represents the template introduction header
 *
 * Embedded into this frame should be the viewer inputs and any color legends.
 *
 */

export const PageHeaderFrame = ({
    title,
    description,
    weightUnit,
    updatedAt,
    viewTemplate,
}: IComponentProps): JSX.Element => {
    return (
        <View>
            <View style={styles.imageContainer}>
                <Image src={logoPNG} />
            </View>
            <View style={styles.templateDetailsContainer}>
                <View style={styles.templateDescriptionContainer}>
                    <View>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={styles.text}>{description}</Text>
                        <Text style={styles.text}>{weightUnit}</Text>
                        <Text style={styles.text}>{updatedAt}</Text>
                    </View>
                </View>
                <ViewerInputFrame
                    viewerInputs={viewTemplate?.templateUserInputs}
                />
                <ColorLegendFrame legend={viewTemplate?.templateLegend} />
            </View>
        </View>
    );
};
